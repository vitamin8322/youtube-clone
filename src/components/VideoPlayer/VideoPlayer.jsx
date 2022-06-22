import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine, RiScissorsLine } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import { BsThreeDots, BsBell } from "react-icons/bs";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import Content from "../Content/Content";
const cx = classNames.bind(styles);

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);

  let { idVideo } = useParams();

  useEffect(() => {
    // axios
    //   .get(
    //     `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${idVideo}&key=AIzaSyDtmJY38XxFTXpLYiEcR297PH8sASGQ5qY`
    //   )
    axios({
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/videos",
      params: {
        part: "snippet, statistics",
        // maxResults: 1,
        id: idVideo,
        key: "AIzaSyDtmJY38XxFTXpLYiEcR297PH8sASGQ5qY",
      },
    })
      .then(function (response) {
        console.log(response.data.items);
        VideoCard(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, [idVideo]);

  const VideoCard = async (videoItems) => {
    // async function VideoCard(videoItems) {
    let videocard = [];
    for (const video of videoItems) {
      const videoId = video.id;
      const snippet = video.snippet;
      const statistics = video.statistics;
      const channelId = snippet.channelId;

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=AIzaSyDtmJY38XxFTXpLYiEcR297PH8sASGQ5qY`
      );

      const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
      const subs = response.data.items[0].statistics.subscriberCount;

      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      const views = statistics.viewCount;
      const timestamp = moment(snippet.publishedAt).fromNow();
      const channel = snippet.channelTitle;
      const likeCount = statistics.likeCount;

      videocard.push({
        videoId,
        image,
        title,
        channel,
        views,
        timestamp,
        channelImage,
        likeCount,
        subs,
      });

      setVideos(videocard);
    }
  };
  // console.log(videos);

  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <iframe
          width="980"
          height="530"
          src={`https://www.youtube.com/embed/${idVideo}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className={cx("info")}>
          {videos.map((item) => (
            <div key={item.videoId}>
              <div className={cx("title")}>{item.title}</div>
              <div className={cx("end")}>
                <div className={cx("view-time")}>
                  <div>{item.views} • </div>
                  <div> {item.timestamp}</div>
                </div>
                <div className={cx("info-like")}>
                  <div className={cx("like", "btn")}>
                    <AiOutlineLike fontSize={24} />
                    {item.likeCount}
                  </div>
                  <div className={cx("dislike", "btn")}>
                    <AiOutlineDislike fontSize={24} />
                    Không thích
                  </div>
                  <div className={cx("share", "btn")}>
                    <RiShareForwardLine fontSize={24} />
                    Chia sẻ
                  </div>
                  <div className={cx("createVideo", "btn")}>
                    <RiScissorsLine fontSize={24} />
                    Tạo đoạn video
                  </div>
                  <div className={cx("add", "btn")}>
                    <MdPlaylistAdd fontSize={24} />
                    Lưu
                  </div>
                  <div className={cx("more", "btn")}>
                    <BsThreeDots fontSize={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={cx()}>
          {videos.map((item) => (
            <div className={cx("info_channel")}>
              <img
                className={cx("channel_image")}
                src={item.channelImage}
                alt={item.channelTitle}
              />
              <div className={cx("desc")}>
                <div className={cx("name_channel")}>{item.channel}</div>
                <div>{item.subs} người đăng ký</div>
                <div className={cx("description")}>
                  With all advanced Social Media features, such as Google
                  Authentication, create, edit, delete and save posts, like and
                  comment on other people's posts, search and filter images and
                  much more, ShareMe is the best Image Sharing Social Media App
                  that you can currently find on YouTub
                </div>
              </div>
              <div className={cx("sub")}>
                <div className={cx("btn-sub")}>Đăng ký</div>
                <BsBell fontSize={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("right")}>
        <Content />
      </div>
    </div>
  );
};

export default VideoPlayer;
