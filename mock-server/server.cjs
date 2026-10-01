/**
 * Mock API server — job-management-system
 *
 * Endpoints implemented:
 *   Auth:         POST /auth/login  /auth/register  /auth/logout  GET /auth/me
 *                 POST /auth/verify-otp  /auth/resend-otp
 *                 POST /auth/forgot-password  /auth/reset-password
 *   Dashboard:    GET  /dashboard
 *   Applications: GET  /applications   GET /applications/:id
 *                 POST /applications   PATCH /applications/:id
 *                 DELETE /applications/:id
 *                 PATCH /applications/:id/status
 *                 POST  /applications/:id/notes
 *   Resumes:      GET  /resumes   GET /resumes/:id
 *                 POST /resumes   PATCH /resumes/:id
 *                 DELETE /resumes/:id
 *   Profile:      GET  /users/me   PATCH /users/me
 *                 POST /users/me/password
 */

const jsonServer = require('json-server');
const path = require('path');
const crypto = require('crypto');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// In-memory session store: token -> userId
const sessions = new Map();

// In-memory OTP store: email -> { otp, expiresAt, userId }
const otpStore = new Map();

// In-memory password-reset token store: token -> { userId, expiresAt }
const resetTokenStore = new Map();

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

// ── Helpers ──────────────────────────────────────────────────────────────────

function db() {
  return router.db;
}

function getCookieToken(req) {
  const raw = req.headers.cookie || '';
  const match = raw.match(/(?:^|;\s*)session_token=([^;]+)/);
  return match ? match[1] : null;
}

function setSessionCookie(res, token) {
  res.setHeader(
    'Set-Cookie',
    `session_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
  );
}

function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    'session_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax',
  );
}

function safeUser(user) {
  const { password: _pw, ...rest } = user;
  return rest;
}

function json(res, status, body) {
  res.status(status).json(body);
}

/** Resolve logged-in user from session cookie. Returns user or null. */
function getSessionUser(req) {
  const token = getCookieToken(req);
  if (!token || !sessions.has(token)) return null;
  const userId = sessions.get(token);
  return db().get('users').find({ id: userId }).value() || null;
}

/** Middleware: require a valid session. Sends 401 if not. */
function requireAuth(req, res, next) {
  const user = getSessionUser(req);
  if (!user) return json(res, 401, { message: 'Unauthorized.' });
  req.currentUser = user;
  next();
}

function newId(prefix) {
  return `${prefix}-${crypto.randomBytes(5).toString('hex')}`;
}

function now() {
  return new Date().toISOString();
}

/** Generate a 6-digit numeric OTP. */
function generateOtp() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
}

/** Create/replace an OTP for an email and return its metadata. */
function issueOtp(email, userId) {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();
  otpStore.set(email.toLowerCase(), { otp, expiresAt, userId });
  // In a real app this would be emailed; log it so it is testable locally.
  console.log(`  ✉️  OTP for ${email}: ${otp} (expires ${expiresAt})`);
  return { otp, expiresAt };
}

// ── CORS ──────────────────────────────────────────────────────────────────────

server.use((req, res, next) => {
  const origin = req.headers.origin || 'http://localhost:5173';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

server.use(jsonServer.bodyParser);

// ── AUTH ──────────────────────────────────────────────────────────────────────

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return json(res, 400, { message: 'Email and password are required.' });

  const user = db()
    .get('users')
    .find((u) => u.email.toLowerCase() === email.toLowerCase())
    .value();

  if (!user || user.password !== password)
    return json(res, 401, { message: 'Invalid email or password.' });

  if (user.isVerified === false) {
    return json(res, 403, {
      message: 'Please verify your email before signing in.',
      requiresVerification: true,
      email: user.email,
    });
  }

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, user.id);
  setSessionCookie(res, token);
  return json(res, 200, { user: safeUser(user) });
});

server.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password)
    return json(res, 400, { message: 'Name, email and password are required.' });

  const existing = db()
    .get('users')
    .find((u) => u.email.toLowerCase() === email.toLowerCase())
    .value();

  if (existing)
    return json(res, 409, { message: 'An account with this email already exists.' });

  const newUser = {
    id: newId('user'),
    name,
    email,
    password,
    avatarUrl: null,
    isVerified: false,
    createdAt: now(),
    updatedAt: now(),
  };

  db().get('users').push(newUser).write();

  // Create the account but do NOT issue a session until the OTP is verified.
  const { expiresAt } = issueOtp(newUser.email, newUser.id);

  return json(res, 201, {
    email: newUser.email,
    otpExpiresAt: expiresAt,
    requiresVerification: true,
  });
});

// POST /auth/verify-otp
server.post('/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body || {};
  if (!email || !otp)
    return json(res, 400, { message: 'Email and code are required.' });

  const user = db()
    .get('users')
    .find((u) => u.email.toLowerCase() === email.toLowerCase())
    .value();

  if (!user) return json(res, 404, { message: 'Account not found.' });

  const entry = otpStore.get(email.toLowerCase());
  if (!entry)
    return json(res, 400, { message: 'No verification code found. Please request a new one.' });

  if (new Date(entry.expiresAt) < new Date()) {
    otpStore.delete(email.toLowerCase());
    return json(res, 400, { message: 'This code has expired. Please request a new one.' });
  }

  if (entry.otp !== String(otp).trim())
    return json(res, 400, { message: 'Incorrect code. Please try again.' });

  // Mark verified + clear OTP
  db()
    .get('users')
    .find({ id: user.id })
    .assign({ isVerified: true, updatedAt: now() })
    .write();
  otpStore.delete(email.toLowerCase());

  // Issue session now that the account is active
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, user.id);
  setSessionCookie(res, token);

  const updated = db().get('users').find({ id: user.id }).value();
  return json(res, 200, { user: safeUser(updated) });
});

// POST /auth/resend-otp
server.post('/auth/resend-otp', (req, res) => {
  const { email } = req.body || {};
  if (!email) return json(res, 400, { message: 'Email is required.' });

  const user = db()
    .get('users')
    .find((u) => u.email.toLowerCase() === email.toLowerCase())
    .value();

  if (!user) return json(res, 404, { message: 'Account not found.' });
  if (user.isVerified) return json(res, 400, { message: 'This account is already verified.' });

  const { expiresAt } = issueOtp(user.email, user.id);
  return json(res, 200, { email: user.email, otpExpiresAt: expiresAt });
});

server.post('/auth/logout', (req, res) => {
  const token = getCookieToken(req);
  if (token) sessions.delete(token);
  clearSessionCookie(res);
  return res.status(200).end();
});

server.get('/auth/me', (req, res) => {
  const token = getCookieToken(req);
  if (!token || !sessions.has(token)) return json(res, 200, { user: null });

  const userId = sessions.get(token);
  const user = db().get('users').find({ id: userId }).value();
  if (!user) {
    sessions.delete(token);
    clearSessionCookie(res);
    return json(res, 200, { user: null });
  }
  return json(res, 200, { user: safeUser(user) });
});

// POST /auth/forgot-password — email a reset OTP (no link)
server.post('/auth/forgot-password', (req, res) => {
  const { email } = req.body || {};
  if (!email) return json(res, 400, { message: 'Email is required.' });

  const user = db()
    .get('users')
    .find((u) => u.email.toLowerCase() === email.toLowerCase())
    .value();

  // Always respond the same way to avoid leaking which emails exist.
  if (!user) {
    return json(res, 200, {
      email,
      otpExpiresAt: new Date(Date.now() + OTP_TTL_MS).toISOString(),
    });
  }

  const { expiresAt } = issueOtp(user.email, user.id);
  return json(res, 200, { email: user.email, otpExpiresAt: expiresAt });
});

// POST /auth/verify-reset-otp — confirm the OTP, return a one-time reset token
server.post('/auth/verify-reset-otp', (req, res) => {
  const { email, otp } = req.body || {};
  if (!email || !otp)
    return json(res, 400, { message: 'Email and code are required.' });

  const user = db()
    .get('users')
    .find((u) => u.email.toLowerCase() === email.toLowerCase())
    .value();

  if (!user) return json(res, 404, { message: 'Account not found.' });

  const entry = otpStore.get(email.toLowerCase());
  if (!entry)
    return json(res, 400, { message: 'No reset code found. Please request a new one.' });

  if (new Date(entry.expiresAt) < new Date()) {
    otpStore.delete(email.toLowerCase());
    return json(res, 400, { message: 'This code has expired. Please request a new one.' });
  }

  if (entry.otp !== String(otp).trim())
    return json(res, 400, { message: 'Incorrect code. Please try again.' });

  // Consume the OTP and issue a short-lived reset token.
  otpStore.delete(email.toLowerCase());
  const resetToken = crypto.randomBytes(32).toString('hex');
  resetTokenStore.set(resetToken, {
    userId: user.id,
    expiresAt: Date.now() + OTP_TTL_MS,
  });

  return json(res, 200, { resetToken });
});

// POST /auth/reset-password — set a new password using the reset token
server.post('/auth/reset-password', (req, res) => {
  const { resetToken, password } = req.body || {};
  if (!resetToken || !password)
    return json(res, 400, { message: 'Reset token and password are required.' });

  const entry = resetTokenStore.get(resetToken);
  if (!entry || entry.expiresAt < Date.now()) {
    resetTokenStore.delete(resetToken);
    return json(res, 400, { message: 'Your reset session has expired. Please start again.' });
  }

  const user = db().get('users').find({ id: entry.userId }).value();
  if (!user) return json(res, 404, { message: 'Account not found.' });

  db()
    .get('users')
    .find({ id: user.id })
    .assign({ password, updatedAt: now() })
    .write();

  resetTokenStore.delete(resetToken);
  return json(res, 200, { message: 'Password reset successfully.' });
});

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

server.get('/dashboard', requireAuth, (req, res) => {
  const userId = req.currentUser.id;
  const period = req.query.period || 'month';

  const allApps = db()
    .get('applications')
    .filter({ userId })
    .value();

  // Date range bounds
  const to = new Date();
  const from = new Date();
  if (period === 'week')    from.setDate(to.getDate() - 7);
  else if (period === 'month')   from.setMonth(to.getMonth() - 1);
  else if (period === 'quarter') from.setMonth(to.getMonth() - 3);
  else if (period === 'year')    from.setFullYear(to.getFullYear() - 1);

  // Summary counts
  const total       = allApps.length;
  const interviews  = allApps.filter((a) => a.status === 'Interview').length;
  const offers      = allApps.filter((a) => a.status === 'Offer').length;
  const rejections  = allApps.filter((a) => a.status === 'Rejected').length;
  const ghosted     = allApps.filter((a) => a.status === 'Ghosted').length;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const thisWeek  = allApps.filter((a) => new Date(a.applicationDate) >= weekAgo).length;
  const thisMonth = allApps.filter((a) => new Date(a.applicationDate) >= monthAgo).length;

  const responded = allApps.filter((a) =>
    ['Screening', 'Interview', 'Offer', 'Rejected'].includes(a.status),
  ).length;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  // Application trend — one data point per day in the range
  const trendMap = {};
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split('T')[0];
    trendMap[key] = 0;
  }
  allApps.forEach((a) => {
    const key = a.applicationDate;
    if (key in trendMap) trendMap[key] = (trendMap[key] || 0) + 1;
  });
  const applicationTrend = Object.entries(trendMap).map(([date, count]) => ({
    date,
    count,
  }));

  // Status distribution
  const statusCounts = {};
  allApps.forEach((a) => {
    statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
  });
  const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  // Recent applications — last 5 by applicationDate
  const recentApplications = [...allApps]
    .sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate))
    .slice(0, 5)
    .map((a) => ({
      id: a.id,
      jobTitle: a.jobTitle,
      companyName: a.companyName,
      status: a.status,
      applicationDate: a.applicationDate,
    }));

  return json(res, 200, {
    summary: {
      totalApplications: total,
      applicationsThisWeek: thisWeek,
      applicationsThisMonth: thisMonth,
      interviews,
      offers,
      rejections,
      ghosted,
      responseRate,
    },
    applicationTrend,
    statusDistribution,
    recentApplications,
    range: {
      from: from.toISOString(),
      to: to.toISOString(),
    },
  });
});

// ── APPLICATIONS ──────────────────────────────────────────────────────────────

// GET /applications
server.get('/applications', requireAuth, (req, res) => {
  const userId = req.currentUser.id;
  let apps = db().get('applications').filter({ userId }).value();

  // Filters
  const { search, status, location, jobType, applicationDateFrom, applicationDateTo } = req.query;

  if (search) {
    const q = search.toLowerCase();
    apps = apps.filter(
      (a) =>
        a.companyName.toLowerCase().includes(q) ||
        a.jobTitle.toLowerCase().includes(q),
    );
  }
  if (status)              apps = apps.filter((a) => a.status === status);
  if (location)            apps = apps.filter((a) => a.location && a.location.toLowerCase().includes(location.toLowerCase()));
  if (jobType)             apps = apps.filter((a) => a.jobType === jobType);
  if (applicationDateFrom) apps = apps.filter((a) => a.applicationDate >= applicationDateFrom);
  if (applicationDateTo)   apps = apps.filter((a) => a.applicationDate <= applicationDateTo);

  // Sort newest first
  apps.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));

  // Pagination
  const page  = Math.max(1, parseInt(req.query.page  || '1',  10));
  const limit = Math.max(1, parseInt(req.query.limit || '10', 10));
  const total = apps.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const data = apps.slice((page - 1) * limit, page * limit);

  return json(res, 200, {
    data,
    pagination: { page, limit, total, totalPages },
  });
});

// GET /applications/:id
server.get('/applications/:id', requireAuth, (req, res) => {
  const app = db()
    .get('applications')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!app) return json(res, 404, { message: 'Application not found.' });
  return json(res, 200, app);
});

// POST /applications
server.post('/applications', requireAuth, (req, res) => {
  const body = req.body || {};
  const newApp = {
    id: newId('app'),
    userId: req.currentUser.id,
    companyName: body.companyName || '',
    jobTitle: body.jobTitle || '',
    jobUrl: body.jobUrl || null,
    location: body.location || null,
    jobType: body.jobType || 'Full-time',
    applicationDate: body.applicationDate || now().split('T')[0],
    status: body.status || 'Applied',
    salaryMin: body.salaryMin || null,
    salaryMax: body.salaryMax || null,
    salaryCurrency: body.salaryCurrency || null,
    jobDescription: body.jobDescription || null,
    notes: body.notes || null,
    submittedResume: null,
    createdAt: now(),
    updatedAt: now(),
    statusHistory: [
      {
        id: newId('hist'),
        action: 'created',
        status: body.status || 'Applied',
        previousStatus: null,
        note: null,
        createdAt: now(),
      },
    ],
  };

  // Attach resume if resumeId provided
  if (body.resumeId) {
    const resume = db().get('resumes').find({ id: body.resumeId }).value();
    if (resume) {
      newApp.submittedResume = {
        id: resume.id,
        name: resume.name,
        fileName: resume.fileName,
        url: resume.fileUrl,
      };
    }
  }

  db().get('applications').push(newApp).write();
  return json(res, 201, newApp);
});

// PATCH /applications/:id
server.patch('/applications/:id', requireAuth, (req, res) => {
  const app = db()
    .get('applications')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!app) return json(res, 404, { message: 'Application not found.' });

  const updates = { ...req.body, updatedAt: now() };
  delete updates.id;
  delete updates.userId;
  delete updates.statusHistory;

  db()
    .get('applications')
    .find({ id: req.params.id })
    .assign(updates)
    .write();

  const updated = db().get('applications').find({ id: req.params.id }).value();
  return json(res, 200, updated);
});

// DELETE /applications/:id
server.delete('/applications/:id', requireAuth, (req, res) => {
  const app = db()
    .get('applications')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!app) return json(res, 404, { message: 'Application not found.' });

  db().get('applications').remove({ id: req.params.id }).write();
  return res.status(204).end();
});

// PATCH /applications/:id/status
server.patch('/applications/:id/status', requireAuth, (req, res) => {
  const app = db()
    .get('applications')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!app) return json(res, 404, { message: 'Application not found.' });

  const { status, note } = req.body || {};
  if (!status) return json(res, 400, { message: 'Status is required.' });

  const histEntry = {
    id: newId('hist'),
    action: 'status_changed',
    status,
    previousStatus: app.status,
    note: note || null,
    createdAt: now(),
  };

  db()
    .get('applications')
    .find({ id: req.params.id })
    .assign({
      status,
      updatedAt: now(),
      statusHistory: [...(app.statusHistory || []), histEntry],
    })
    .write();

  const updated = db().get('applications').find({ id: req.params.id }).value();
  return json(res, 200, updated);
});

// POST /applications/:id/notes
server.post('/applications/:id/notes', requireAuth, (req, res) => {
  const app = db()
    .get('applications')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!app) return json(res, 404, { message: 'Application not found.' });

  const { note } = req.body || {};
  if (!note) return json(res, 400, { message: 'Note is required.' });

  const histEntry = {
    id: newId('hist'),
    action: 'note_added',
    status: app.status,
    previousStatus: null,
    note,
    createdAt: now(),
  };

  db()
    .get('applications')
    .find({ id: req.params.id })
    .assign({
      notes: note,
      updatedAt: now(),
      statusHistory: [...(app.statusHistory || []), histEntry],
    })
    .write();

  const updated = db().get('applications').find({ id: req.params.id }).value();
  return json(res, 200, updated);
});

// ── RESUMES ───────────────────────────────────────────────────────────────────

// GET /resumes
server.get('/resumes', requireAuth, (req, res) => {
  const userId = req.currentUser.id;
  let resumes = db().get('resumes').filter({ userId }).value();

  if (req.query.search) {
    const q = req.query.search.toLowerCase();
    resumes = resumes.filter((r) => r.name.toLowerCase().includes(q));
  }

  resumes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const page  = Math.max(1, parseInt(req.query.page  || '1',  10));
  const limit = Math.max(1, parseInt(req.query.limit || '10', 10));
  const total = resumes.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const data = resumes.slice((page - 1) * limit, page * limit);

  return json(res, 200, {
    data,
    pagination: { page, limit, total, totalPages },
  });
});

// GET /resumes/:id
server.get('/resumes/:id', requireAuth, (req, res) => {
  const resume = db()
    .get('resumes')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!resume) return json(res, 404, { message: 'Resume not found.' });
  return json(res, 200, resume);
});

// POST /resumes  (file upload — multipart, but we just mock it)
server.post('/resumes', requireAuth, (req, res) => {
  // In a real setup the file would be saved; here we create a fake record
  const name = (req.body && req.body.name) || 'Uploaded Resume';
  const newResume = {
    id: newId('res'),
    userId: req.currentUser.id,
    name,
    fileName: `${name.toLowerCase().replace(/\s+/g, '_')}.pdf`,
    fileUrl: `/resumes/${newId('res')}/download`,
    mimeType: 'application/pdf',
    fileSize: 204800,
    applicationCount: 0,
    createdAt: now(),
    updatedAt: now(),
    applicationReferences: [],
  };

  db().get('resumes').push(newResume).write();
  return json(res, 201, newResume);
});

// PATCH /resumes/:id
server.patch('/resumes/:id', requireAuth, (req, res) => {
  const resume = db()
    .get('resumes')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!resume) return json(res, 404, { message: 'Resume not found.' });

  const { name } = req.body || {};
  if (!name) return json(res, 400, { message: 'Name is required.' });

  db()
    .get('resumes')
    .find({ id: req.params.id })
    .assign({ name, updatedAt: now() })
    .write();

  const updated = db().get('resumes').find({ id: req.params.id }).value();
  return json(res, 200, updated);
});

// DELETE /resumes/:id
server.delete('/resumes/:id', requireAuth, (req, res) => {
  const resume = db()
    .get('resumes')
    .find({ id: req.params.id, userId: req.currentUser.id })
    .value();

  if (!resume) return json(res, 404, { message: 'Resume not found.' });

  db().get('resumes').remove({ id: req.params.id }).write();
  return res.status(204).end();
});

// ── PROFILE ───────────────────────────────────────────────────────────────────

// GET /users/me
server.get('/users/me', requireAuth, (req, res) => {
  return json(res, 200, safeUser(req.currentUser));
});

// PATCH /users/me
server.patch('/users/me', requireAuth, (req, res) => {
  const { name } = req.body || {};
  if (!name) return json(res, 400, { message: 'Name is required.' });

  db()
    .get('users')
    .find({ id: req.currentUser.id })
    .assign({ name, updatedAt: now() })
    .write();

  const updated = db().get('users').find({ id: req.currentUser.id }).value();
  return json(res, 200, safeUser(updated));
});

// POST /users/me/password
server.post('/users/me/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword)
    return json(res, 400, { message: 'Current and new password are required.' });

  if (req.currentUser.password !== currentPassword)
    return json(res, 400, { message: 'Current password is incorrect.' });

  db()
    .get('users')
    .find({ id: req.currentUser.id })
    .assign({ password: newPassword, updatedAt: now() })
    .write();

  return json(res, 200, { message: 'Password changed successfully.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = 3002;
server.listen(PORT, () => {
  console.log('');
  console.log('  ✅  Mock API server running at http://localhost:' + PORT);
  console.log('');
  console.log('  Demo credentials:');
  console.log('  ┌──────────────────────────┬────────────┐');
  console.log('  │ Email                     │ Password   │');
  console.log('  ├──────────────────────────┼────────────┤');
  console.log('  │ admin@demo.com           │ Admin@123  │');
  console.log('  │ demo@demo.com            │ Demo@123   │');
  console.log('  └──────────────────────────┴────────────┘');
  console.log('');
  console.log('  Endpoints ready:');
  console.log('  Auth        POST /auth/login  /auth/register  /auth/logout  GET /auth/me');
  console.log('  Verify      POST /auth/verify-otp  /auth/resend-otp');
  console.log('  Dashboard   GET  /dashboard');
  console.log('  Applications GET /applications  POST /applications  PATCH/DELETE /applications/:id');
  console.log('  Resumes     GET  /resumes  POST /resumes  PATCH/DELETE /resumes/:id');
  console.log('  Profile     GET  /users/me  PATCH /users/me  POST /users/me/password');
  console.log('');
});
