import React, { useEffect , useState} from "react";
import { apiGetHotEventTop1 } from "../../apis/event/event";
  
import { fetchDataSpeaker } from "../../reducer/speakerReducer";
import { useDispatch, useSelector } from "react-redux";
const HomeCenter = () => {
  const backgroundImage = {
    backgroundImage:
      'url("https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/3/27/1027990/Han-Hyo-Joo-01.jpg")',
    backgroundSize: "cover", // Optional: to ensure the image covers the entire section
    backgroundPosition: "center", // Optional: to center the image
  };
  const [hotEvent,setHotEvent] = useState(null)
  useEffect( () => {
    const fetData = async() =>{
      const response = await apiGetHotEventTop1()

      setHotEvent(response?.data)
      
    }

    fetData()
  }, []);



  const dispatch = useDispatch();
  const { isLoading, error, dataSpeakerAll } = useSelector(
    (state) => state.speakerList
  );
  useEffect(() => {    
    dispatch(fetchDataSpeaker());
  }, [dispatch]);
  return (
    <div>
      <section className="home-about-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="ha-pic">
                <img
                  src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/3/27/1027990/Han-Hyo-Joo-01.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ha-text">
                <h2>{hotEvent?.event.title}</h2>
                <p>
                  When I first got into the online advertising business, I was
                  looking for the magical combination that would put my website
                  into the top search engine rankings, catapult me to the
                  forefront of the minds or individuals looking to buy my
                  product, and generally make me rich beyond my wildest dreams!
                  After succeeding in the business for this long, I’m able to
                  look back on my old self with this kind of thinking and shake
                  my head.
                </p>
                <ul>
                  <li>
                  <strong>Category: {hotEvent?.event?.category}</strong>
                  </li>
                  <li>
                  <strong>Time: {hotEvent?.event?.status}</strong>
                  </li>    
                  <li>
                  <strong>Start Date: {hotEvent?.event?.date}</strong>
                  </li>  
                  <li>
                  <strong>Sponsors: {hotEvent?.event?.speaker[0]?.name}</strong>
                  </li>        
                </ul>
                <a href={`/detailevent/${hotEvent?.event?.id}`} className="ha-btn">
                  Discover Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-member-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Who’s speaking</h2>
                <p>
                  These are our communicators, you can see each person
                  information
                </p>
              </div>
            </div>
          </div>
        </div>

        {
  dataSpeakerAll?.map((el, index) => (
    <div 
      key={index}
      className="member-item set-bg" 
      style={{ backgroundImage: `url(${el?.photoUrl})` }}
    >
      <div className="mi-social">
        <div className="mi-social-inner bg-gradient">
          <a href="#">
            <i className="fa fa-facebook" />
          </a>
          <a href="#">
            <i className="fa fa-instagram" />
          </a>
          <a href="#">
            <i className="fa fa-twitter" />
          </a>
          <a href="#">
            <i className="fa fa-linkedin" />
          </a>
        </div>
      </div>
      <div className="mi-text">
        <h5>{el?.name || "Emma Sandoval"}</h5>
        <span>Speaker</span>
      </div>
    </div>
  ))
}


        
      </section>
    </div>
  );
};

export default HomeCenter;
