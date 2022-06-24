import React from "react";
import moment from "moment";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const cx = classNames.bind(styles);

const Video = ({
  title,
  image,
  channel,
  views,
  timestamp,
  channelImage,
  channelId,
}) => {
  return (
    // <div className={cx("a")}>
    <div className={cx("container")}>
      <div>
        <img src={image} alt="img" className={cx("image")} />
      </div>
      <div className={cx("desr")}>
        <img src={channelImage} alt="avatar" className={cx("avatar")} />
        <div className={cx("content")}>
          <div className={cx("title")}>{title}</div>
          <Link to={`/channel/${channelId}`}>
            <div className={cx("author")}>{channel}</div>
          </Link>
          <div className={cx("bottom")}>
            <div className={cx("view")}>{views} lượt xem • </div>
            <div className={cx("time")}> {moment(timestamp).fromNow()}</div>
          </div>
        </div>
        <div>...</div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Video;
