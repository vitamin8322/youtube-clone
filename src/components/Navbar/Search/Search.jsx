import React, { useState } from "react";

import { BsFillKeyboardFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Search = () => {
  const [search, setSearch] = useState("");
  // console.log(search);

  return (
    <div className={cx("search")}>
      <div className={cx("input-search")}>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={cx("keyboard")}>
          <BsFillKeyboardFill fontSize={24} />
        </button>
      </div>
      <button className={cx("search-btn")}>
        <Link to={`/search/${search}`}>
          <AiOutlineSearch fontSize={24} style={{ justifyContent: "center" }} />
        </Link>
      </button>
    </div>
  );
};

export default Search;
