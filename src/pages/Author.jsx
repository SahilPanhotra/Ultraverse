import React, { useEffect, useRef, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState([]);
  const [isFollowing, setisFollowing] = useState(false);
  let location = useLocation();
  const authorId = location.pathname.slice(8);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: response } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthor(response);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authorId]);
  const handleClick = () => {
    if (isFollowing) {
      const followers = author.followers - 1;
      setAuthor({ ...author, followers });
      setisFollowing(false);
    } else {
      const followers = author.followers + 1;
      setAuthor({ ...author, followers });
      setisFollowing(true);
    }
  };
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {!loading ? (
                        <img src={author.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width={150}
                          height={150}
                          borderRadius={"50%"}
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {!loading ? (
                            <>{author.authorName}</>
                          ) : (
                            <Skeleton width={100} />
                          )}
                          <span className="profile_username">
                            {!loading ? (
                              <>@{author.tag}</>
                            ) : (
                              <Skeleton width={80} />
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {!loading ? (
                              <>{author.address}</>
                            ) : (
                              <Skeleton width={160} />
                            )}
                          </span>
                          {!loading && (
                            <button
                              id="btn_copy"
                              onClick={() => {
                                navigator.clipboard.writeText(author.address);
                                alert("Text Copied To Clipboard");
                              }}
                              title="Copy Text"
                            >
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {!loading ? (
                          <>{author.followers} followers</>
                        ) : (
                          <Skeleton width={80} height={"1.25em"} />
                        )}
                      </div>
                      {!loading ? (
                        <Link to="" onClick={handleClick} className="btn-main">
                          {isFollowing ? <>Unfollow</> : <>Follow</>}
                        </Link>
                      ) : (
                        <Skeleton height={"2.5em"} width={110} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {!loading ? (
                    <AuthorItems
                      authorImage={author.authorImage}
                      loading={loading}
                      item={author.nftCollection}
                    />
                  ) : (
                    <>
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill("0").map((ele, index) => (
                              <div
                                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                key={index}
                              >
                                <Skeleton height={400} width={"100%"} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
