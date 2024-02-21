export default function fileTypeDetection(string) {
  const checked = string.split('/')[0];
  if (checked === 'image') return 'image';
  if (checked === 'video') return 'video';
  if (checked === 'audio') return 'audio';

  return 'other';
}
