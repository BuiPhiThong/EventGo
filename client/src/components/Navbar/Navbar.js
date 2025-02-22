import React from "react";
import "../../styletemplate/css/slicknav.min.css";
import "../../styletemplate/css/elegant-icons.css";
import "../../styletemplate/css/magnific-popup.css";
import "../../styletemplate/css/style.css";
import "../../styletemplate/css/bootstrap.min.css";
import "../../styletemplate/css/font-awesome.min.css";

const Navbar = () => {
  return (
    <div>
      <header className="header-section">
        <div className="container">
          <div className="logo">
            <a href="./index.html">
              <img src="http://127.0.0.1:5500/img/logo.png" alt="" />
            </a>
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li className="active">
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="./about-us.html">About</a>
                </li>
                <li>
                  <a href="/speaker">Speakers</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Jayden</a>
                    </li>
                    <li>
                      <a href="#">Sara</a>
                    </li>
                    <li>
                      <a href="#">Emma</a>
                    </li>
                    <li>
                      <a href="#">Harriet</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="./schedule.html">Schedule</a>
                </li>
                <li>
                  <a href="/event">Event</a>
                </li>
                <li>
                  <a href="./contact.html">Contacts</a>
                </li>
              </ul>
            </nav>
            <a href="#" className="primary-btn top-btn">
              <i className="fa fa-ticket" /> Ticket
            </a>
          </div>
          <div id="mobile-menu-wrap" />
        </div>
      </header>

     
    </div>
  );
};

export default Navbar;
