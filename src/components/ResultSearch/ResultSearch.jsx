import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";
import moment from "moment";

import Sidebar from "../Sidebar/Sidebar";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const ResultSearch = () => {
  let { value } = useParams();

  const [channelRow, setChannelRow] = useState("");
  const [videoRows, setVideoRows] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    // setChannelRow("");
    // setVideoRows([]);
    axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        part: "snippet",
        maxResults: 1,
        q: value,
        key: "AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510",
      },
    }).then((response) => {
      // console.log("a");
      // console.log(response);
      createChannelRow(response.data["items"][0]);
      // console.log("channelRow", channelRow);
    });

    // console.log("channelRow", channelRow);

    axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        part: "snippet",
        maxResults: 10,
        q: value,
        key: "AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510",
        type: "video",
      },
    })
      .then((response) => {
        // console.log("video", response.data.items);
        createVideoRows(response.data["items"]);
        // setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsError(true);
        // setIsLoading(false);
      });
  }, [value]);

  async function createChannelRow(channel) {
    const channelId = channel.id.channelId;
    // const response = await axios.get(
    //   `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510`
    // );

    const response = await axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/channels",
      params: {
        part: "statistics",
        id: channelId,
        key: "AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510",
        // type: "video",
      },
    });

    const noOfVideos = response.data.items[0].statistics.videoCount;
    const subs = response.data.items[0].statistics.subscriberCount;
    const snippet = channel.snippet;
    const title = snippet.title;
    const description = snippet.description;
    const image = snippet.thumbnails.medium.url;
    setChannelRow({
      channelId,
      image,
      title,
      subs,
      noOfVideos,
      description,
    });
  }

  async function createVideoRows(videos) {
    let newVideoRows = [];
    for (const video of videos) {
      const videoId = video.id.videoId;
      // const response = await axios.get(
      //   `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510`
      // );
      const response = await axios({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/videos",
        params: {
          part: "snippet, statistics",
          id: videoId,
          key: "AIzaSyA_V6e16LlaK7sijU9M18UV3BOq26QJ510",

          // type: "video",
        },
      });

      const views = response.data.items[0].statistics.viewCount;

      const snippet = video.snippet;
      const title = snippet.title;
      const timestamp = moment(snippet.publishedAt).fromNow();

      const channel = snippet.channelTitle;

      const description = snippet.description;
      const image = snippet.thumbnails.medium.url;

      newVideoRows.push({
        videoId,
        title,
        image,
        views,
        timestamp,
        channel,
        description,
      });
    }
    setVideoRows(newVideoRows);
    // setIsLoading(false);
  }
  console.log("videoRow", videoRows);

  return (
    <div className={cx("container")}>
      <Sidebar />
      <div className={cx("result-search")}>
        <div className={cx("list")}>
          <div className={cx("row")}>
            <div className={cx("image")}>
              <img src={channelRow.image} alt="a" className={cx("avatar")} />
            </div>
            <div className={cx("info")}>
              <div className={cx("title")}>{channelRow.title}</div>
              <div className={cx("sub-video")}>
                <div>
                  {channelRow.subs} người đăng ký • {channelRow.noOfVideos}
                  video
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            {videoRows.map((item) => (
              <Link to={`/video/${item.videoId}`} key={item.videoId}>
                <div className={cx("row")}>
                  <div className={cx("image")}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={cx("info")}>
                    <div className={cx("title")}>{item.title}</div>
                    <div className={cx("view_time")}>
                      {item.views} người xem • {item.timestamp}
                    </div>
                    <div className={cx("image_channel")}>
                      {/* <img src={item.} /> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;
