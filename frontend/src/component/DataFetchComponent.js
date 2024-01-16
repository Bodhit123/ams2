import React, { useEffect, useState, Suspense } from "react";
import { debounce } from "lodash";
import "../pages/Admin/css/spinner.css";
import LoadingSpinner from "./Spinner";

const fetchData = async (fetchFunction, setDataCallback) => {
  try {
    const response = await fetchFunction();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setDataCallback(data.length);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const DataFetchComponent = ({
  url,
  fetchFunctions,
  dataCallbacks,
  debounceTime,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  const debouncedFetchData = debounce(async () => {
    if (shouldFetchData) {
      setIsLoading(true);
      const fetchDataPromises = fetchFunctions.map((fetchFunction, index) =>
        fetchData(fetchFunction, dataCallbacks[index])
      );
      await Promise.all(fetchDataPromises);
      setIsLoading(false);
      // After fetching data, set shouldFetchData to false
      setShouldFetchData(false);
    }
  }, debounceTime);

  useEffect(() => {
    debouncedFetchData();
    // Cleanup debounced function on unmount
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData, shouldFetchData]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        // Render the children when data is loaded
        <div>{/* your jsx component here */}</div>
      )}
    </Suspense>
  );
};

export default DataFetchComponent;
