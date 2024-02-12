import { compressImage } from '../../formatter/formatter';

export const handleImageUploadFunction = async ({
  event,
  setUploadedImage = () => {}
}) => {
  const file = event.target.files[0]; // Get the first file from the input
  const fileSizeKB = file.size / 1024; // Calculate file size in KB

  try {
    // Check if file size exceeds 70 KB
    if (fileSizeKB > 70) {
      compressImage(file, setUploadedImage);
    } else {
      // If the file size is within the limit, proceed with setting the image URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Set the uploaded image URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  } catch (error) {
    console.error('Error compressing image:', error);
  }
};
