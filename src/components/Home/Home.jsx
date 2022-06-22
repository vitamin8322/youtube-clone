import React from "react";
import Content from "../Content/Content";
import Sidebar from "../Sidebar/Sidebar";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <Sidebar />
      <Content />
    </div>
  );
};

export default Home;
