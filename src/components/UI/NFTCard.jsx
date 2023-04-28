import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const NFTCard = ({ nft }) => {
  const [img, setImg] = useState();
  const mountedRef = useRef(true);
  useEffect(() => {
    const nftImage = new Image();
    nftImage.src = nft.nftImage;
    nftImage.onload = () => {
      if (mountedRef.current) {
        setImg(nftImage);
      }
    };
    return () => {
      mountedRef.current = false;
    };
  }, [nft]);

  return (
    <div key={nft.nftId} className="nft_coll">
      {img ? (
        <>
          <div className="nft_wrap">
            <Link to="/item-details">
              <img
                src={img.src}
                className="lazy img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img
                className="lazy pp-coll"
                src={nft.authorImage}
                alt="author"
              />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{nft.title}</h4>
            </Link>
            <span>{nft.code}</span>
          </div>
        </>
      ) : (
        <>
          <div className="nft_wrap">
            <Link to="/item-details">
              <Skeleton width={"100%"} height={200} />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <Skeleton width={50} height={50} borderRadius={"50%"} />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>
                <Skeleton height={"1.25em"} width={100} />
              </h4>
            </Link>
            <span>
              <Skeleton height={"1.25em"} width={60} />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default NFTCard;
