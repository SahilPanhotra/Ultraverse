import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [topSeller, setTopSeller] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSeller(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
          <div className="col-md-12">
            <ol className="author_list">
              {topSeller.map((seller, index) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author${seller.authorId}`}>
                      {!loading ? (
                        <>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </>
                      ) : (
                        <Skeleton width={50} height={50} borderRadius={"50%"} />
                      )}
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">
                      {!loading ? (
                        <span>{seller.authorName}</span>
                      ) : (
                        <span>
                          <Skeleton width={60} height={"1.25em"} />
                        </span>
                      )}
                    </Link>
                    {!loading ? (
                      <span>{seller.price}ETH</span>
                    ) : (
                      <span>
                        <Skeleton width={30} height={"1.25em"} />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
