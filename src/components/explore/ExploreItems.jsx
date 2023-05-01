import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewItemCard from "../UI/NewItemCard";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [explore, setExplore] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [selectedOption, setSelectedOption] = useState("");
  const loadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setExplore(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleSelectChange = async (event) => {
    setLoading(true);
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    try {
      const { data: response } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedValue}`
      );
      setExplore(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <select
          id="filter-items"
          onChange={(event) => handleSelectChange(event)}
          defaultValue={selectedOption}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!loading ? (
        explore?.slice(0, visibleItems).map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
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
          </div>
        ))
      ) : (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </span>
      )}
      <div className="col-md-12 text-center">
        {visibleItems < explore?.length && (
          <Link
            to=""
            onClick={loadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
