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
  const [channels, setChannels] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        key: "AIzaSyDtmJY38XxFTXpLYiEcR297PH8sASGQ5qY",
        maxResult: 50,
      },
    })
      .then((response) => {
        setVideos(response.data["items"]);

        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const channel = async (channels) => {
    let newVideoCards = [];
    for (const video of channels) {
      const videoId = video.id;
      const snippet = video.snippet;
      const channelId = snippet.channelId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const channelImage = response.data.items[0].snippet.thumbnails.medium.url;

      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      const views = video.statistics.viewCount;
      // const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;

      newVideoCards.push({
        videoId,
        image,
        title,
        channel,
        views,
        // timestamp,
        channelImage,
      });
    }
    setVideos(newVideoCards);
  };
  console.log("videos", videos);

  return (
    <div>
      {videos.map((item) => (
        <Link to={`/video/${item.id}`} className={cx("container")}>
          <Video
            key={item.id}
            image={item.snippet.thumbnails.medium.url}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            views={item.statistics.viewCount}
            timestamp={item.snippet.publishedAt}
            channelImage={item.snippet.thumbnails.medium.url}
            channelId={item.snippet.channelId}
          />
        </Link>
      ))}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default Content;
