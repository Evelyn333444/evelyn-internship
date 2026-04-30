import React, { useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "./author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  console.log(id);
  const [authorData, setAuthorData] = React.useState(null);
  const [followers, setFollowers] = React.useState(0);
  const fetchAuthorData = async () => {
    try {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
      console.log("AUTHOR DATA", data);
      setAuthorData(data);
      setFollowers(Number(data));
      console.log(data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  }

  useEffect(() => {
    fetchAuthorData();
  }, [id])
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                        {authorData?.authorName}
                        <span className="profile_username">@{authorData?.tag}</span>
                        <span id="wallet" className="profile_wallet">
                        {authorData?.address}
                        </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      <button
                      className="btn-main"
                        onClick={() => {
                          setFollowers(Number(authorData) === followers ? followers + 1 : followers - 1);
                        }}
                        >
                          {Number(authorData) === followers ? "Follow" : "Unfollow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
