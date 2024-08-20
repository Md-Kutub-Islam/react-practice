import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [postId, setPostId] = useState([]);
  const [postMetaData, setPostMetaData] = useState([]);

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getJobTitle = (title) => {
    const arr = title.split(/\((YC [^)]+)\)/);
    if (arr.length > 1) {
      const part1 = arr[0];
      const part2 = arr[1];
      return `${part1} ${part2}`;
    }
  };

  const getJobInfo = (title) => {
    const arr = title.split(/\((YC [^)]+)\)/);
    if (arr.length > 2) {
      return arr[2];
    }
    return "N/A";
  };

  const getFormattedDate = (time) => {
    const date = new Date(time * 1000);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getMonth().toString().padStart(2, 0);
    const year = date.getFullYear();
    const formattedData = `${month}/${day}/${year}`;
    return formattedData;
  };

  const fetchMetaDataPost = async (ids) => {
    const apiCall = ids?.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
      return getData(url);
    });

    const postData = await Promise.all(apiCall);
    // console.log(postData);

    if (postData.length > 0) {
      const nweArr = postData?.map((item) => {
        const obj = {
          jobTitle: getJobTitle(item.title),
          jobInfo: getJobInfo(item.title),
          date: getFormattedDate(item.time),
          url: item.url
            ? item.url
            : `https://news.ycombinator.com/item?id=${item.id}`,
        };

        return obj;
      });
      let copyPostMetaData = [...postMetaData];
      copyPostMetaData = [...copyPostMetaData, ...nweArr];
      setPostMetaData(copyPostMetaData);
    }
  };

  const fetchPostData = async () => {
    const url = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    const idList = await getData(url);
    const id = idList.splice(0, 9);
    setPostId(idList);
    fetchMetaDataPost(id);
  };

  const handleOnClick = () => {
    const copyPostId = [...postId];
    if (copyPostId.length > 0) {
      const ids = copyPostId.splice(0, 6);
      fetchMetaDataPost(ids);
      setPostId(copyPostId);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  console.log(postMetaData);

  return (
    <div className="app">
      <h1>Job Bord</h1>
      <div className="container">
        {!postMetaData ? (
          <h1>Loadding...</h1>
        ) : (
          postMetaData.map((data) => (
            <div className="card">
              <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                {data.jobTitle}
              </span>
              <span>{data.jobInfo}</span>
              <span>{data.date}</span>
              {/* <span>{data.url}</span> */}
            </div>
          ))
        )}
      </div>

      <button onClick={handleOnClick}>More</button>
    </div>
  );
}

export default App;
