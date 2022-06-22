import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

import Video from "./Video/Video";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

const Content = () => {
  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [maxResult, setMaxResult] = useState(9);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/videos",
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 60,
        regionCode: "VN",
        key: "AIzaSyD6ZWokTjJyKt77Ximc2dqD9FbBJb2PwU8",
        page: pageNumber,
      },
    })
      .then((response) => {
        console.log(response.data.items);
        setVideos(response.data["items"]);

        setHasMore(response.data.items.length > 0);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [maxResult]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch() {
    setPageNumber(1);
  }

  return (
    <div onChange={handleSearch}>
      {videos.map((item) => (
        <Link
          to={`/video/${item.id}`}
          className={cx("container")}
          ref={lastBookElementRef}
        >
          <Video
            key={item.id}
            image={item.snippet.thumbnails.medium.url}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            views={item.statistics.viewCount}
            timestamp={item.timestamp}
            channelImage={item.snippet.thumbnails.medium.url}
          />
        </Link>
      ))}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default Content;
