import React from "react";

import { publics } from "../../utils/data";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <div>
      {publics.map((item, index) => (
        <div className={cx("container")}>
          <>
            <div>
              {item.c ? (
                <div className={cx("bottom")}></div>
              ) : (
                <div key={index} className={cx("item")}>
                  <div className={cx("icon")}>{item.icons}</div>
                  <div>{item.name}</div>
                </div>
              )}
            </div>
          </>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
