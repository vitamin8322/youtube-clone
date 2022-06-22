import React from "react";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

const Video = ({ title, image, channel, views, timestamp, channelImage }) => {
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
          <div className={cx("author")}>{channel}</div>
          <div className={cx("bottom")}>
            <div className={cx("view")}>{views} • </div>
            <div className={cx("time")}> {timestamp}</div>
          </div>
        </div>
        <div>...</div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Video;
