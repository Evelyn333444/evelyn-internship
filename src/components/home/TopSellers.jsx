import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSeller = ({ authorId, authorImage, authorName, price }) => {

  return (
    <>
      <li data-aos="fade-in" data-aos-duration="400">
        <div className="author_list_pp">
          <Link to={`/author/${authorId}}`}>
            <img className="lazy pp-author" src={authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="author_list_info">
          <Link to={`/author/${authorId}}`}>{authorName}</Link>
          <span>{price} ETH</span>
        </div>
      </li>
    </>

  );

};
const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );

    setTopSellers(data);
    setLoading(false);
  }



  useEffect(() => {
    fetchTopSellers();
  }, []);

  // useEffect(() => {
  //   getExploreData();
  // }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12 wow fadeIn">
            {topSellers.length ? (
              <ol className="author_list">
                {
                  topSellers.map((seller) => (
                    <TopSeller
                      key={seller.id}
                      authorImage={seller.authorImage}
                      authorName={seller.authorName}
                      authorId={seller.authorId}
                      price={seller.price}
                    />
                  ))
                }
              </ol>
            ) : (
              <ol className="author_list">
                {new Array(12).fill(0).map((item, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={``}>
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <span>
                        <Skeleton width="40px" height="20px" />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
