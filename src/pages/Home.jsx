import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import Wow from "wowjs";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import AuthorItems from "../components/author/AuthorItems";
// ..
AOS.init();

  const Home = () => {
  useEffect(() => {        // ← useEffect up here FIRST
    window.scrollTo(0, 0);
    new Wow.WOW().init();
  }, [])

  return (
  <>
    <h1>Home</h1>
    <AuthorItems />
  </>
);

  return (                 // ← return comes AFTER
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );

}

export default Home;
