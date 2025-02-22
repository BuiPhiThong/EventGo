import React from "react";

const Event = () => {
  return (
    <>
      <section className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>News Latest</h2>
                <div className="bt-option">
                  <a href="#">Home</a>
                  <span>Our Blogs</span>
                </div>
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
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="blog-item set-bg"
                    data-setbg="img/blog/blog-1.jpg"
                  >
                    <div className="bi-tag bg-gradient">Foody</div>
                    <div className="bi-text">
                      <h5>
                        <a href="./blog-details.html">
                          Google's AI Assistant Aims to Transcend the Smart
                          Speaker
                        </a>
                      </h5>
                      <span>
                        <i className="fa fa-clock-o" /> 19th May, 2019
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="blog-item set-bg"
                    data-setbg="img/blog/blog-2.jpg"
                  >
                    <div className="bi-tag bg-gradient">Foody</div>
                    <div className="bi-text">
                      <h5>
                        <a href="./blog-details.html">
                          Free Classifiends Using Them To Promote
                        </a>
                      </h5>
                      <span>
                        <i className="fa fa-clock-o" /> 19th May, 2019
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="blog-item set-bg large-item"
                data-setbg="img/blog/blog-4.jpg"
              >
                <div className="bi-tag bg-gradient">Business</div>
                <div className="bi-text">
                  <h3>
                    <a href="./blog-details.html">
                      "Inspired By Modiji, Will Make Biopic": BJP's Ravi Kishan
                    </a>
                  </h3>
                  <span>
                    <i className="fa fa-clock-o" /> 19th May, 2019
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="blog-item set-bg"
                    data-setbg="img/blog/blog-7.jpg"
                  >
                    <div className="bi-tag bg-gradient">Foody</div>
                    <div className="bi-text">
                      <h5>
                        <a href="./blog-details.html">
                          The ZenBook With a Touchpad That Lights Up
                        </a>
                      </h5>
                      <span>
                        <i className="fa fa-clock-o" /> 19th May, 2019
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="blog-item set-bg"
                    data-setbg="img/blog/blog-8.jpg"
                  >
                    <div className="bi-tag bg-gradient">Foody</div>
                    <div className="bi-text">
                      <h5>
                        <a href="./blog-details.html">
                          Is the Detel Posh a Posh Speaker?
                        </a>
                      </h5>
                      <span>
                        <i className="fa fa-clock-o" /> 19th May, 2019
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="blog-item set-bg large-item"
                data-setbg="img/blog/blog-3.jpg"
              >
                <div className="bi-tag bg-gradient">Marketing</div>
                <div className="bi-text">
                  <h3>
                    <a href="./blog-details.html">
                      Lok Sabha Elections 2019 - In BJP, Only ''Tai'' Can
                      Admonish Me: PM Modi On Sumitra Mahajan
                    </a>
                  </h3>
                  <span>
                    <i className="fa fa-clock-o" /> 19th May, 2019
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="blog-item set-bg"
                    data-setbg="img/blog/blog-5.jpg"
                  >
                    <div className="bi-tag bg-gradient">Design</div>
                    <div className="bi-text">
                      <h5>
                        <a href="./blog-details.html">
                          The Biggest Stories Of January 06, 2019
                        </a>
                      </h5>
                      <span>
                        <i className="fa fa-clock-o" /> 19th May, 2019
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="blog-item set-bg"
                    data-setbg="img/blog/blog-6.jpg"
                  >
                    <div className="bi-tag bg-gradient">UX/UI</div>
                    <div className="bi-text">
                      <h5>
                        <a href="./blog-details.html">
                          Alexa Can Now Show You Things!
                        </a>
                      </h5>
                      <span>
                        <i className="fa fa-clock-o" /> 19th May, 2019
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="blog-item set-bg"
                data-setbg="img/blog/blog-9.jpg"
              >
                <div className="bi-tag bg-gradient">Marketing</div>
                <div className="bi-text">
                  <h3>
                    <a href="./blog-details.html">
                      "Still Waiting For BJP To Make Me Chief Minister": Goa
                      Assembly Speaker
                    </a>
                  </h3>
                  <span>
                    <i className="fa fa-clock-o" /> 19th May, 2019
                  </span>
                </div>
              </div>
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
