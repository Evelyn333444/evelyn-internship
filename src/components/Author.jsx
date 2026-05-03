import React, { useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "./author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "./UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = React.useState(null);
  const [followers, setFollowers] = React.useState(0);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const fetchAuthorData = React.useCallback(async () => {
    try {
      setLoading(true);
      setAuthorData(null);
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
      setAuthorData(data);
      setFollowers(Number(data?.followers ?? data?.followerCount ?? 0));
      setIsFollowing(false);
    } catch (error) {
      console.error("Error fetching author data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
  }, [fetchAuthorData]);

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
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={authorData?.authorImage || AuthorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? "Loading..." : authorData?.authorName}
                          <span className="profile_username">@{authorData?.tag}</span>
                          <span id="wallet" className="profile_wallet">{authorData?.address}</span>
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
                          setFollowers((currentFollowers) =>
                            isFollowing ? Math.max(currentFollowers - 1, 0) : currentFollowers + 1
                          );
                          setIsFollowing((currentValue) => !currentValue);
                        }}
                        disabled={loading || !authorData}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={loading ? null : authorData} />
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