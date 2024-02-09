export const countingDataStatus = async (data) => {
  // Create an object to store status counts
  const statusCounts = {};
  // Iterate through each object in the data array
  data.forEach((item) => {
    const statusDescription = item.status?.description;
    // Check if status description exists
    if (statusDescription) {
      // Increment count for the status description
      statusCounts[statusDescription] =
        (statusCounts[statusDescription] || 0) + 1;
    }
  });

  return statusCounts;
};
