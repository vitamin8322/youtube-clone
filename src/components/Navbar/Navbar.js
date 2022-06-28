import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { Link } from "react-router-dom";

import { HiMenu } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
// import { MdKeyboardVoice } from "react-icons/md";
import { RiLiveLine, RiMore2Fill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

import Search from "./Search/Search";
import { gapi } from "gapi-script";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState([]);
  const [isContent, setIsContent] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "100265178983-o3ltq5l507i4hjdh4rfg576896gksn37.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const googleSuccess = (response) => {
    setUser(response.profileObj);
    setIsUser(true);
  };

  const logout = () => {
    setIsUser(false);
  };

  const show = () => {
    setIsContent(!isContent);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("begin")} onClick={() => setIsContent(false)}>
        <HiMenu fontSize={24} />
        <Link to="/">
          <div className={cx("logo")}>
            a
            <BsYoutube fontSize={28} color={"red"} />
            YouTube
          </div>
        </Link>
      </div>
      <div onClick={() => setIsContent(false)}>
        <Search />
      </div>
      <div>
        {isUser && (
          <div className={cx("user-login")}>
            <RiLiveLine fontSize={24} className={cx("icon-end", "icon")} />
            <AiOutlineBell fontSize={24} className={cx("icon-end", "icon")} />
            <img
              src={user.imageUrl}
              alt={user.name}
              className={cx("user")}
              onClick={show}
            />
            {isContent && (
              <div id="myDropdown" className={cx("dropdown")}>
                <div className={cx("drop-content")}>
                  <div className={cx("header")}>
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className={cx("user-image")}
                    />
                    <div>
                      {user.name}
                      <div>Quản lý tài khoản</div>
                    </div>
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("item")}>Kênh của bạn</div>
                    <GoogleLogout
                      clientId="100265178983-o3ltq5l507i4hjdh4rfg576896gksn37.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <div
                          className={cx("item")}
                          onClick={renderProps.onClick}
                        >
                          Đăng xuất
                        </div>
                      )}
                      onLogoutSuccess={logout}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isUser && (
          <GoogleLogin
            clientId="100265178983-o3ltq5l507i4hjdh4rfg576896gksn37.apps.googleusercontent.com"
            render={(renderProps) => (
              <button className={cx("end")} onClick={renderProps.onClick}>
                <FaRegUserCircle fontSize={24} /> &emsp; Đăng nhập
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
