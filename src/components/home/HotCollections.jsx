import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/owl.theme.css";
import { useEffect } from "react";
import axios from "axios";
import NFTCard from "../UI/NFTCard";

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setNftData(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading&&<OwlCarousel
            className="owl-theme"
            loop={false}
            rewind
            margin={10}
            nav
            dots={false}
            responsive={{
              0: { items: 1 },
              368: { items: 2 },
              768: { items: 3 },
              1240: { items: 4 },
            }}
            items={4}
          >
            {nftData.map((nft, index) => (
              <NFTCard nft={nft} key={nft.nftId} />
            ))}
          </OwlCarousel>}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
