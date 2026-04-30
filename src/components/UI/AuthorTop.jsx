import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthorTop = ({ authorImage, authorName, tag, address, followers }) => {
  const initialFollowers = followers;
  const [clickedFollow, setClickedFollow] = useState(false);
  const [currFollowers, setCurrFollowers] = useState(initialFollowers);

  function followButtonClick() {
    setClickedFollow(!clickedFollow);
    setCurrFollowers(clickedFollow ? initialFollowers : currFollowers + 1);
  }

  return (
    <>
      <div className="de-flex-col">
        <div className="profile_avatar">
          <img src={authorImage} alt="" />
          <i className="fa fa-check"></i>
          <div className="profile_name">
            <h4>
              {authorName}
              <span className="profile_username">@{tag}</span>
              <span id="wallet" className="profile_wallet">
                {address}
              </span>
              <button id="btn_copy" title="Copy Text">
                Copy
              </button>
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower">{currFollowers} followers</div>
          <Link to="#" className="btn-main" onClick={() => followButtonClick()}>
            {clickedFollow ? <>Unfollow</> : <>Follow</>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthorTop;
