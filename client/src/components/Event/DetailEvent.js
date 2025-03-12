import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  apiEventRegistation,
  apiGetEventByCategoryName,
  apiGetEventById,
} from "../../apis/event/event";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./DetailEvent.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Audio } from "react-loader-spinner";
// hoặc bạn có thể sử dụng các loại spinner khác

import swal from "sweetalert";

const DetailEvent = () => {
  const { eid } = useParams();
  const [detailEvent, setDetailEvent] = useState(null);
  const [relateEvent, setRelateEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy thông tin chi tiết sự kiện
        const detail = await apiGetEventById(eid);
        setDetailEvent(detail?.mess);

        if (detail?.mess?.category) {
          const relateDetailEvent = await apiGetEventByCategoryName(
            detail.mess.category
          );
          setRelateEvent(relateDetailEvent?.mess);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [eid]);
  const authDataLocalStorage = JSON.parse(localStorage.getItem("authData"));
  const isLogged = authDataLocalStorage?.isLogin;
  const accessToken = authDataLocalStorage?.accessToken;

  // const handleRegisEvent =  async(eid) => {
  //   if(isLogged && accessToken){
  //     try {
  //        const response = await apiEventRegistation(eid)
  //        if(response?.success){
  //           swal('SUCCESS',"Bạn đã đăng kí sự kiện thành công","success")
  //        }
  //     } catch (error) {
  //       swal("Error", `${error?.response?.data?.mess}`, "error");
  //     }
  //   }else{
  //     swal('ERROR','Bạn cần đăng nhập để có thể đăng kí sự kiện này','error')
  //   }

  // };
  const handleRegisEvent = async (eid) => {
    if (isLogged && accessToken) {
      try {
        setLoading(true); // Bắt đầu loading
        const response = await apiEventRegistation(eid);
        if (response?.success) {
          swal("SUCCESS", "Bạn đã đăng kí sự kiện thành công", "success");
        }
      } catch (error) {
        swal("Error", `${error?.response?.data?.mess}`, "error");
      } finally {
        setLoading(false); // Kết thúc loading dù thành công hay thất bại
      }
    } else {
      swal("ERROR", "Bạn cần đăng nhập để có thể đăng kí sự kiện này", "error");
    }
  };

  return (
    <>
      <section
        className="blog-hero-section"
        style={{
          backgroundImage:
            "url('https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg')",
          backgroundSize: "cover", // Optional: to ensure the image covers the entire section
          backgroundPosition: "center", // Optional: to center the image
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bh-text">
                <a href="" className="play-btn video-popup">
                  <i className="fa fa-play" />
                </a>
                <h2>{detailEvent?.title}</h2>
                <ul>
                  <li>
                    <span>
                      By{" "}
                      {detailEvent?.speaker?.length > 0
                        ? detailEvent.speaker.map((el, index) => (
                            <span key={el._id}>
                              <strong>{el.name}</strong>
                              {index !== detailEvent.speaker.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))
                        : "Updating..."}
                    </span>
                  </li>
                  <li>{detailEvent?.date}</li>
                  <li>{detailEvent?.category}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Details Hero Section End */}
      {/* Blog Details Section Begin */}
      <section className="blog-details-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="bd-text">
                <div className="bd-title">
                  <p>
                    Postcards are also viable ways to generate increased contact
                    for your business but because business cards are handier and
                    easier to fit into a wallet or a business file organizer,
                    they are more certain to be carried anywhere and anytime.
                  </p>
                  <p>
                    Postcards are also viable ways to generate increased contact
                    for your business but because business cards are handier and
                    easier to fit into a wallet or a business file organizer,
                    they are more certain to be carried anywhere and anytime.
                    Moreover, what is printed on the card is as important as to
                    how the information is printed. A business card should have
                    the name and the logo of the company.
                  </p>
                </div>
                <div className="bd-more-pic">
                  <div className="row">
                    <div className="col-md-6">
                      <img src="img/blog/blog-details/blog-more-1.jpg" alt="" />
                    </div>
                    <div className="col-md-6">
                      <img src="img/blog/blog-details/blog-more-2.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="bd-tag-share">
                  <div className="tag">
                    <button
                      href="#"
                      className="btn btn-danger text-decoration-none"
                      onClick={() => handleRegisEvent(detailEvent?._id)}
                      disabled={loading} // Vô hiệu hóa nút khi đang loading
                    >
                      {loading ? (
                        <Audio
                          height="20"
                          width="20"
                          radius="4"
                          color="white"
                          ariaLabel="loading"
                          wrapperStyle={{
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        />
                      ) : null}
                      {loading ? "ĐANG XỬ LÝ..." : "EVENT REGISTATION"}
                    </button>
                  </div>
                  <div className="s-share">
                    <span>Share:</span>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa fa-google-plus" />
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="related-post-section spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title">
                <h2>Relatest Post</h2>
              </div>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="blog-slider"
          >
            {relateEvent?.map((post) => (
              <SwiperSlide key={post?.id}>
                <div
                  className="blog-item set-bg"
                  style={{
                    backgroundImage: `url('https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg')`,
                  }}
                >
                  <div className="bi-tag bg-gradient">{post?.category}</div>
                  <div className="bi-text">
                    <h5>
                      <a href={`/detailevent/${post?._id}`}>{post?.title}</a>
                    </h5>
                    <span>
                      <i className="fa fa-clock-o"></i> {post?.date}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default DetailEvent;
