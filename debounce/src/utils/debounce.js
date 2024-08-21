const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const debounce = (func, delay) => {
  if (typeof func !== "function") {
    throw new Error(`Not a valid func ${func}`);
  }
  if (typeof delay !== "number" || delay < 0) {
    throw new Error(`Not a valid number ${delay}`);
  }

  let timeOut;
  return (...args) => {
    return new Promise((resolve) => {
      window.clearTimeout(timeOut);
      timeOut = window.setTimeout(async () => {
        const data = await func(...args);
        resolve(data);
      }, delay);
    });
  };
};

const debounceQuery = debounce(fetchData, 1000);
export default debounceQuery;
