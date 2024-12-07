import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Blog</Link>
          </li>
          <li>
            <Link to={`/post/${posts.id}`}>お問い合わせ</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
