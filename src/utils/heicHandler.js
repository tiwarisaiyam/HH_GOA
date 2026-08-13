import heic2any from 'heic2any';

/**
 * Converts HEIC/HEIF files to standard JPEG Blob
 */
export async function convertHeicToJpeg(file) {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith('.heic') || fileName.endsWith('.heif') || file.type === 'image/heic' || file.type === 'image/heif') {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9
      });
      
      const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      return new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' });
    } catch (err) {
      console.warn('HEIC conversion failed, using original file:', err);
      return file;
    }
  }
  return file;
}