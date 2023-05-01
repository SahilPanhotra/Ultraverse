import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import updateTimer from "../utilities/Timer";
import { CountDown } from "./CountDown";

const startTime = Date.now();

const NewItemCard = ({
  index,
  nftId,
  nftImage,
  authorImage,
  likes,
  title,
  price,
  authorId,
  expiryDate,
}) => {
  const [img, setImg] = useState();
  const mountedRef = useRef(true);

  useEffect(() => {
    const nftCardImage = new Image();
    nftCardImage.src = nftImage;
    nftCardImage.onload = () => {
      if (mountedRef.current) {
        setImg(nftImage);
      }
    };
    return () => {
      mountedRef.current = false;
    };
  }, [nftImage, expiryDate]);

  return (
    <div className="nft__item " key={index}>
      <div className="author_list_pp">
        <Link
          to={`/author/${authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          {img ? (
            <img className="lazy" src={authorImage} alt="" />
          ) : (
            <Skeleton width={50} height={50} borderRadius={"50%"} />
          )}
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="de_countdown">
        {img ? (
          <CountDown expiryTime={expiryDate} />
        ) : (
          <Skeleton width={20} height={"1.25em"} />
        )}
      </div>

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="/" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="/" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="/">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details/${nftId}`}>
          {img ? (
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          ) : (
            <Skeleton width={"100%"} height={220} />
          )}
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${nftId}`}>
          <h4>{title}</h4>
        </Link>
        <div className="nft__item_price">{price}ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NewItemCard;
