import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Collection = ({
  authorImage,
  nftImage,
  title,
  price,
  likes,
  expiryDate,
  nftId,
  authorId,
  width,
  maxWidth,
  padding,
}) => {
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [expirationExists, setExpirationExists] = useState(false);

  function getExpirationDate() {
    const millisLeft = expiryDate - Date.now();
    const secondsLeft = millisLeft / 1000;
    const minsLeft = secondsLeft / 60;
    const hoursLeft = minsLeft / 60;

    setSeconds(Math.floor(secondsLeft) % 60);
    setMinutes(Math.floor(minsLeft) % 60);
    setHours(Math.floor(hoursLeft));

    return true;
  }

  useEffect(() => {
    if (expiryDate) {
      let intervalId = setInterval(getExpirationDate, 1000);
      if (getExpirationDate()) {
        setExpirationExists(true);
      }
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div
      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ width, maxWidth, padding }}
      data-aos="fade-in"
      data-aos-duration="500"
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <img className="lazy" src={authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {expirationExists && (
          <div className="de_countdown">
            {hours}h {minutes}m {seconds}s
          </div>
        )}
        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${nftId}`}>
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${nftId}`}>
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{price}</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
