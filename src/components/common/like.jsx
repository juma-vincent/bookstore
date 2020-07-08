import React from "react";
import { FaHeart } from "react-icons/fa";

import { FaRegHeart } from "react-icons/fa";
// import { IconContext } from 'react-icons';

const Like = (props) => {
  return props.liked ? (
    <FaHeart
      color="red"
      size="22"
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    />
  ) : (
    <FaRegHeart
      color="black"
      size="22"
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    />
  );

  // Below is another way of rendering icons

  // <IconContext.Provider value={{ color: 'red', size:'1.3rem'}}>
  //    <FaHeart  />
  //  </IconContext .Provider>
};

export default Like;
