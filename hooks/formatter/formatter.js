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
