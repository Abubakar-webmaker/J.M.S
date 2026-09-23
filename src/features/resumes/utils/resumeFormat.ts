export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return 'Unknown size';
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kilobytes = bytes / 1024;

  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  const megabytes = kilobytes / 1024;

  if (megabytes < 1024) {
    return `${megabytes.toFixed(1)} MB`;
  }

  const gigabytes = megabytes / 1024;

  return `${gigabytes.toFixed(1)} GB`;
}

export function getFileExtension(
  fileName: string,
): string {
  const lastDotIndex = fileName.lastIndexOf('.');

  if (lastDotIndex === -1) {
    return '';
  }

  return fileName.slice(lastDotIndex).toLowerCase();
}

export function getResumeDisplayName(
  name: string,
  fallbackFileName: string,
): string {
  const trimmedName = name.trim();

  if (trimmedName) {
    return trimmedName;
  }

  return fallbackFileName.replace(/\.[^/.]+$/, '');
}