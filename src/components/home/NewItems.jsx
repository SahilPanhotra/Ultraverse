import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItemCard from "../UI/NewItemCard";
import Slider from "react-slick";
import settings from "../utilities/CarouselSettings";

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading && (
            <Slider {...settings}>
              {nftData.map((nft, index) => (
                <NewItemCard
                  key={nft.id}
                  nftId={nft.nftId}
                  nftImage={nft.nftImage}
                  authorImage={nft.authorImage}
                  likes={nft.likes}
                  price={nft.price}
                  title={nft.title}
                  authorId={nft.authorId}
                  expiryDate={nft.expiryDate}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
