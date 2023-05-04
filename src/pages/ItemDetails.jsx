import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);
  const [itemDetail, setItemDetail] = useState([]);
  let location = useLocation();
  const nftId = location.pathname.slice(14);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItemDetail(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nftId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {!loading ? (
                  <img
                    src={itemDetail.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton width={"100%"} height={"100%"} />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {!loading ? (
                      <>{itemDetail.title}</>
                    ) : (
                      <Skeleton width={200} height={"1.5em"} />
                    )}
                  </h2>
                  <div className="item_info_counts">
                    {!loading ? (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetail.views}
                      </div>
                    ) : (
                      <Skeleton width={50} height={"2em"} />
                    )}
                    {!loading ? (
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetail.likes}
                      </div>
                    ) : (
                      <Skeleton width={50} height={"2em"} />
                    )}
                  </div>
                  <p>
                    {!loading ? (
                      <>{itemDetail.description}</>
                    ) : (
                      <>
                        <Skeleton height={100} width={500} />
                      </>
                    )}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetail.ownerId}`}>
                            {!loading ? (
                              <>
                                <img
                                  className="lazy"
                                  src={itemDetail.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            ) : (
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={"50%"}
                              />
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {!loading ? (
                            <Link to={`/author/${itemDetail.ownerId}`}>
                              {itemDetail.ownerName}
                            </Link>
                          ) : (
                            <Skeleton width={100} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetail.creatorId}`}>
                            {!loading ? (
                              <>
                                <img
                                  className="lazy"
                                  src={itemDetail.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            ) : (
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={"50%"}
                              />
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {!loading ? (
                            <Link to={`/author/${itemDetail.creatorId}`}>
                              {itemDetail.creatorName}
                            </Link>
                          ) : (
                            <Skeleton width={100} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {!loading ? (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{itemDetail.price}</span>
                        </>
                      ) : (
                        <>
                          <Skeleton width={20} height={40} />
                          <Skeleton width={80} height={40} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
