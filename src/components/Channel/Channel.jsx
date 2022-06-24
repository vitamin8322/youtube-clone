import React, { useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Sidebar from "../Sidebar/Sidebar";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Channel = () => {
  const [videos, setVideos] = useState([]);
  let { channelId } = useParams();
  //   console.log("channelId", channelId);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        part: "snippet,id",
        key: "AIzaSyDtmJY38XxFTXpLYiEcR297PH8sASGQ5qY",
        channelId: channelId,
        maxResults: 50,
        order: "date",
      },
    }).then((res) => setVideos(res.data["items"]));
  }, [channelId]);
  console.log("videos", videos);

  return (
    <div className={cx("container")}>
      <Sidebar />
      <div>
        <div>channel header</div>
        <div className={cx("list-videos")}>
          {videos.map((item, index) => (
            <Link to={`/video/${item.id.videoId}`}>
              <div key={index} className={cx("list")}>
                <div className={cx("video")}>
                  <div className={cx("image")}>
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      alt={item.snippet.title}
                    />
                  </div>
                  <div className={cx("detail")}>
                    <div className={cx("title")}>{item.snippet.title}</div>
                    <div className={cx("timeline")}>
                      {moment(item.snippet.publishTime).fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channel;
