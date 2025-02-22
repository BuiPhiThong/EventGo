import React from 'react'

const HomeCenter = () => {

    const backgroundImage = {
        backgroundImage: 'url("https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/236087925_374824574011004_5807695242833825983_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEjH4aMnQw3VF_5m_eo5zH_AuHZwHee7foC4dnAd57t-jD7r3yKelDVKpnleRI5ZPEglt7K9vrhTBOvugdz7FHR&_nc_ohc=pfCtyJsCgPUQ7kNvgFRaoVE&_nc_oc=Adjrd1VfDIxVi_WIukaYPKX00__fg-MrlxhqR4nddrpOtfJMOU1PFoAlx-JtJhtJG731Mw08603KIUWjEYF4VJUs&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=AyhZgT-hg4JMyUbcUx5rf2T&oh=00_AYB3WvZKQFAfBKBDDnvuGWcb6-xPGUkWTNgBPSZGUKfMeg&oe=67BF8A5F")',
        backgroundSize: 'cover',  // Optional: to ensure the image covers the entire section
        backgroundPosition: 'center',  // Optional: to center the image
      };

  return (
    <div>
      <section className="home-about-section spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="ha-pic">
            <img src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/236087925_374824574011004_5807695242833825983_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEjH4aMnQw3VF_5m_eo5zH_AuHZwHee7foC4dnAd57t-jD7r3yKelDVKpnleRI5ZPEglt7K9vrhTBOvugdz7FHR&_nc_ohc=pfCtyJsCgPUQ7kNvgFRaoVE&_nc_oc=Adjrd1VfDIxVi_WIukaYPKX00__fg-MrlxhqR4nddrpOtfJMOU1PFoAlx-JtJhtJG731Mw08603KIUWjEYF4VJUs&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=AyhZgT-hg4JMyUbcUx5rf2T&oh=00_AYB3WvZKQFAfBKBDDnvuGWcb6-xPGUkWTNgBPSZGUKfMeg&oe=67BF8A5F" alt="" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="ha-text">
            <h2>About Conference</h2>
            <p>
              When I first got into the online advertising business, I was
              looking for the magical combination that would put my website into
              the top search engine rankings, catapult me to the forefront of
              the minds or individuals looking to buy my product, and generally
              make me rich beyond my wildest dreams! After succeeding in the
              business for this long, I’m able to look back on my old self with
              this kind of thinking and shake my head.
            </p>
            <ul>
              <li>
                <span className="icon_check" /> Write On Your Business Card
              </li>
              <li>
                <span className="icon_check" /> Advertising Outdoors
              </li>
              <li>
                <span className="icon_check" /> Effective Advertising Pointers
              </li>
              <li>
                <span className="icon_check" /> Kook 2 Directory Add Url Free
              </li>
            </ul>
            <a href="#" className="ha-btn">
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
              These are our communicators, you can see each person information
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="member-item set-bg" style={backgroundImage}>

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
        <h5>Emma Sandoval</h5>
        <span>Speaker</span>
      </div>
    </div>

    <div className="member-item set-bg" style={backgroundImage}>
    
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
        <h5>Emma Sandoval</h5>
        <span>Speaker</span>
      </div>
    </div>

    <div className="member-item set-bg" style={backgroundImage}>
    
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
        <h5>Emma Sandoval</h5>
        <span>Speaker</span>
      </div>
    </div>

    
    </section>
    </div>
  )
}

export default HomeCenter
