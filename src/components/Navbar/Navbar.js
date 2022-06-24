import React, { useState } from "react";
import { Link } from "react-router-dom";

import { HiMenu } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
// import { MdKeyboardVoice } from "react-icons/md";
import { RiLiveLine, RiMore2Fill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import Search from "./Search/Search";
const cx = classNames.bind(styles);

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <div className={cx("container")}>
      <Link to="/">
        <div className={cx("logo")}>
          <HiMenu fontSize={24} />
          <h3>YouTube</h3>
        </div>
      </Link>
      <Search />
      <div>
        {user && (
          <div className={cx("end")}>
            <RiLiveLine fontSize={24} className={cx("icon-end", "icon")} />
            <AiOutlineBell fontSize={24} className={cx("icon-end", "icon")} />
            <img
              src="https://yt3.ggpht.com/LfGvUxA3pN-p_cVUPvPawSZ4f9HkxUshpzjRbONHVRJcyvK2eyLHIx8xPPfeFiUVRLov6QEz738=s88-c-k-c0x00ffffff-no-rj"
              alt="user"
              className={cx("user")}
            />
          </div>
        )}

        {!user && (
          <div className={cx("end")}>
            <div className={cx("more")}>
              <RiMore2Fill fontSize={20} />
            </div>
            <div className={cx("signin")}>
              <FaRegUserCircle /> &emsp; Đăng nhập
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
