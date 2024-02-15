import imageCompression from 'browser-image-compression';
import { format } from 'date-fns';

export function filterKeys(dataArray, keysToExclude) {
  return dataArray.map((obj, index) => {
    const filteredObj = {};
    for (const key in obj) {
      if (!keysToExclude.includes(key)) {
        filteredObj[key] = obj[key];
      }
    }
    filteredObj.no = index + 1;
    return filteredObj;
  });
}

export function finalDataFormatter(data) {
  const result = { ...data };
  const imgUrl = data.imgUrl[0]; // Assuming only one file is selected
  if (imgUrl instanceof File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgUrl);
    reader.onloadend = () => {
      result.imgUrl = reader.result;
      console.log('Form data with imgUrl:', result);
      // Now you can submit the form data to the server
    };
  }
  // If ac_dc is undefined, set it to "ac"
  if (typeof result.ac_dc === 'undefined') {
    result.ac_dc = 'ac';
  }
  return result;
}

export const compressImage = async (file, setUploadedImage) => {
  // Calculate the maxSizeMB for compression to achieve approximately 70 KB
  const maxSizeMB = 0.07; // Convert 70 KB to MB (1 MB = 1024 KB)

  // Compress the image
  const options = {
    maxSizeMB: maxSizeMB, // Max size in megabytes
    maxWidthOrHeight: 800, // Max width or height
    useWebWorker: true // Use WebWorker for faster compression (optional)
  };

  const compressedFile = await imageCompression(file, options);

  // Convert compressedFile to data URL
  const reader = new FileReader();
  reader.onloadend = () => {
    setUploadedImage(reader.result); // Set the uploaded image URL
  };
  reader.readAsDataURL(compressedFile); // Read the file as a data URL
};

export function dateFormatter(date) {
  if (!date) return '-';
  const newDate = new Date(date);
  const formattedDate = format(newDate, 'MMM d,yyyy, HH:mm:ss');
  return formattedDate;
}

export const formatterSortName = async (item) => {
  if (item == 'ID NUMBER') return 'id_number';
  if (item == 'REMARKS') return 'remarks';
  if (item == 'MANUFACTURER') return 'manufacturer';
  if (item == 'VOLTAGE') return 'voltage';
  if (item == 'HP') return 'hp';
  if (item == 'AC/DC') return 'ac_dc';
};
