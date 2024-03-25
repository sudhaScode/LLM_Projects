import "./Nav.css";
import "../../App.css";
import "react-chatbot-kit/build/main.css";
import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../../store/Context";

function NavBar() {
  const { isHRCheckin, setIsHRCheckin } = useContext(Context);
  const location = useLocation();

  const handleLogOut = () => {
    setIsHRCheckin(false);
  };

  return (
    <>
      <nav className="nav-container">
        <ul className="ul-container">
          <div style={{ display: "flex", flexDirection: "row", width: "70%" }}>
            <li>
              <img
                style={{ height: "30px", width: "100px" }}
                src="/Capgemini-Logo.png"
                alt="capgemini"
              />
            </li>
            <li>
              <Link
                to="/dashboard/bot"
                className={`link ${
                  location.pathname === "/dashboard/bot" ? "active" : ""
                }`}
              >
                BOT
              </Link>
            </li>
            {/* <a
              href="http://localhost:3000/dashboard/uploaddocuments"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google
            </a> */}
            {isHRCheckin && (
              <li>
                <Link
                  to="/dashboard/uploaddocuments"
                  className={`link ${
                    location.pathname === "/dashboard/uploaddocuments"
                      ? "active"
                      : ""
                  }`}
                >
                  Upload documents
                </Link>
              </li>
            )}
          </div>
          <div>
            <li>
              <Link
                to="/"
                onClick={handleLogOut}
                style={{ color: "ButtonFace" }}
              >
                Logout
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
