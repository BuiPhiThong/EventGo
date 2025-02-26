import axios from "axios";
import React, { useState, useEffect } from "react";

const Event = () => {
  const [eventleft, setEventLeft] = useState([]);
  const [eventRight, setEventRight] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataLeft = await axios.get(
        "http://localhost:9999/api/event/categorydefaultleft"
      );
      setEventLeft(dataLeft?.data);
      const dataRight = await axios.get(
        "http://localhost:9999/api/event/categorydefaultright"
      );
      setEventRight(dataRight?.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>News Latest</h2>              
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Blog Section Begin */}
      <section className="blog-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {eventleft?.mess?.length > 0 && (
                <div
                  className="blog-item"
                  style={{
                    backgroundImage: `url('https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2022/07/25140510/g80161184d3b5603df3b14fd4edc89cd9ea015f9193d4abc036d623d98a86c4ed5e274fb54654def5977300d4338820b46c714ef7b34247c7ac6a7167c22c0f2d_1280.jpg')`,
                    backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                    backgroundPosition: "center", // Căn giữa hình ảnh
                  }}
                >
                  <div className="bi-tag bg-gradient">
                    {eventleft.mess[0]?.category}
                  </div>
                  <div className="bi-text">
                    <h3>
                      <a href={`/detailevent/${eventleft?.mess[0]?._id}`}>
                        {eventleft.mess[0]?.title}
                      </a>
                    </h3>
                    <span>
                      <i className="fa fa-clock-o" />{" "}
                      {new Date(eventleft.mess[0]?.date).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="row">
                {eventleft?.mess?.length > 0 && (
                  <div className="col-md-6">
                    <div
                      className="blog-item"
                      style={{
                        backgroundImage: `url('https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg')`,
                        backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                        backgroundPosition: "center", // Căn giữa hình ảnh
                      }}
                    >
                      <div className="bi-tag bg-gradient">
                        {eventleft?.mess[2]?.category}
                      </div>
                      <div className="bi-text">
                        <h5>
                        <a href={`/detailevent/${eventleft?.mess[2]?._id}`}>
                            {eventleft?.mess[2]?.title}
                          </a>
                        </h5>
                        <span>
                          <i className="fa fa-clock-o" />{" "}
                          {new Date(eventleft.mess[2]?.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {eventleft?.mess?.length > 0 && (
                  <div className="col-md-6">
                    <div
                      className="blog-item"
                      style={{
                        backgroundImage: `url('https://media-cdn-v2.laodong.vn/storage/newsportal/2025/1/16/1450925/Than-Sau-Hon-Buom012.jpeg')`,
                        backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                        backgroundPosition: "center", // Căn giữa hình ảnh
                      }}
                    >
                      <div className="bi-tag bg-gradient">
                        {eventleft?.mess[3]?.category}
                      </div>
                      <div className="bi-text">
                        <h5>
                        <a href={`/detailevent/${eventleft?.mess[3]?._id}`}>
                            {eventleft?.mess[3]?.title}
                          </a>
                        </h5>
                        <span>
                          <i className="fa fa-clock-o" />{" "}
                          {new Date(eventleft.mess[3]?.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {eventleft?.mess?.length > 0 && (
                <div
                  className="blog-item large-item set-bg"
                  style={{
                    backgroundImage: `url('https://store.edwardandsons.com/cdn/shop/articles/Matcha_Tart_2-e1584563943110.jpg?v=1718209706&width=480')`,
                    backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                    backgroundPosition: "center", // Căn giữa hình ảnh
                  }}
                >
                  <div className="bi-tag bg-gradient">
                    {eventleft?.mess[1]?.category}
                  </div>
                  <div className="bi-text">
                    <h3>
                    <a href={`/detailevent/${eventleft?.mess[1]?._id}`}>
                        {eventleft?.mess[1]?.title}
                      </a>
                    </h3>
                    <span>
                      <i className="fa fa-clock-o" />{" "}
                      {new Date(eventleft.mess[1]?.date).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-6">
              {eventRight?.mess?.length > 0 && (
                <div
                  className="blog-item large-item set-bg"
                  style={{
                    backgroundImage: `url('https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg')`,
                    backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                    backgroundPosition: "center", // Căn giữa hình ảnh
                  }}
                >
                  <div className="bi-tag bg-gradient">
                    {eventRight?.mess[0]?.category}
                  </div>
                  <div className="bi-text">
                    <h3>
                    <a href={`/detailevent/${eventRight?.mess[0]?._id}`}>
                        {eventRight?.mess[0]?.title}
                      </a>
                    </h3>
                    <span>
                      <i className="fa fa-clock-o" />{" "}
                      {new Date(eventRight.mess[0]?.date).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="row">
                {eventRight?.mess?.length > 0 && (
                  <div className="col-md-6">
                    <div
                      className="blog-item"
                      style={{
                        backgroundImage: `url('https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/3/30/ngay-hoi-dinh-duong3-17117683093321006496898.jpg')`,
                        backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                        backgroundPosition: "center", // Căn giữa hình ảnh
                      }}
                    >
                      <div className="bi-tag bg-gradient">
                        {eventRight?.mess[1]?.category}
                      </div>
                      <div className="bi-text">
                        <h5>
                        <a href={`/detailevent/${eventRight?.mess[1]?._id}`}>
                            {eventRight?.mess[1]?.title}
                          </a>
                        </h5>
                        <span>
                          <i className="fa fa-clock-o" />{" "}
                          {new Date(eventRight.mess[1]?.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {eventRight?.mess?.length > 0 && (
                  <div className="col-md-6">
                    <div
                      className="blog-item"
                      style={{
                        backgroundImage: `url('https://static.vinwonders.com/production/mon-an-duong-pho-viet-nam-1.webp')`,
                        backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                        backgroundPosition: "center", // Căn giữa hình ảnh
                      }}
                    >
                      <div className="bi-tag bg-gradient">
                        {eventRight?.mess[3]?.category}
                      </div>
                      <div className="bi-text">
                        <h5>
                        <a href={`/detailevent/${eventRight?.mess[3]?._id}`}>
                            {eventRight?.mess[3]?.title}
                          </a>
                        </h5>
                        <span>
                          <i className="fa fa-clock-o" />{" "}
                          {new Date(eventRight.mess[3]?.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {eventRight?.mess?.length > 0 && (
                <div
                  className="blog-item"
                  style={{
                    backgroundImage: `url('https://cdn.haiphong.gov.vn/gov-hpg/upload/haiphong/product/2022/5/IMG_3507-d71d93266ec749d7bce4cc1d6649aad8.JPG?maxwidth=1000')`,
                    backgroundSize: "cover", // Đảm bảo hình ảnh bao phủ toàn bộ thẻ
                    backgroundPosition: "center", // Căn giữa hình ảnh
                  }}
                >
                  <div className="bi-tag bg-gradient">
                    {eventRight.mess[2]?.category}
                  </div>
                  <div className="bi-text">
                    <h3>
                    <a href={`/detailevent/${eventRight?.mess[2]?._id}`}>
                        {eventRight.mess[2]?.title}
                      </a>
                    </h3>
                    <span>
                      <i className="fa fa-clock-o" />{" "}
                      {new Date(eventRight.mess[2]?.date).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="load-more blog-more">
            <a href="#" className="primary-btn">
              Load More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Event;
