import React, { useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./App.css";
import { Container, Row } from "reactstrap";
import Logo from "./images/Logo.jpg";
import userIcon from "./images/userIcon.jpg";
import { useUser } from "./UserContext";
import { toast } from 'react-toastify';

const Header = () => {
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);
  const [profileActionsVisible, setProfileActionsVisible] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const menuToggle = () => menuRef.current.classList.toggle("active-menu");
  const toggleProfileActions = () =>
    setProfileActionsVisible(!profileActionsVisible);
  const closeProfileActions = () => setProfileActionsVisible(false);

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem('popupShown'); // Clear popupShown flag on logout
    navigate("/login");
    toast.success('Logged out')
  };

  let nav_links = [
    { path: "home", display: "Home" },
    { path: "about", display: "About" },
    // { path: "contact", display: "Help" },
  ];

  if (!user || !(user.role === "Doctor" || user.role === "receptionist")) {
    nav_links.splice(2, 0, { path: "doctors", display: "Doctors" });
  }
  if (user && user.role === "Doctor") {
    nav_links.splice(2, 0, { path: "doctorsdashboard", display: "Doctors Dashboard" });
  }

  return (
    <header className="header sticky-header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={Logo} alt="Logo" width={230} />
            </div>
            <div className="navigation" ref={menuRef}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item nav_link" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                      style={{
                        textDecoration: "none",
                        color: "var(--primary-color)",
                      }}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icons">
              {user && (
                <div className="user_info">
                  <span>{user.name}</span>
                  <span> | {user.role}</span>
                </div>
              )}
              <div className="user_icon" onBlur={closeProfileActions}>
                <img
                  src={userIcon}
                  alt="User Icon"
                  onClick={toggleProfileActions}
                />
                <div
                  className={`profile-actions ${profileActionsVisible ? "show_profileActions" : ""
                    }`}
                  ref={profileActionRef}
                >
                  <div className="profile_link">
                    {user && (
                      <div>
                        <Link
                          to="/myprofile"
                          style={{
                            textDecoration: "none",
                            color: "var(--primary-color)",
                          }}
                        >
                          My Profile
                        </Link>
                      </div>
                    )}
                    {!user ? (
                      <>
                        <Link
                          to="/signup"
                          style={{
                            textDecoration: "none",
                            color: "var(--primary-color)",
                          }}
                        >
                          SignUp
                        </Link>
                        <Link
                          to="/login"
                          style={{
                            textDecoration: "none",
                            color: "var(--primary-color)",
                          }}
                        >
                          Login
                        </Link>
                      </>
                    ) : (
                      <>
                        {user.name === "Admin" && (
                          <Link
                            to="/dashboard"
                            style={{
                              textDecoration: "none",
                              color: "var(--primary-color)",
                            }}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          to="#"
                          onClick={handleLogout}
                          style={{
                            textDecoration: "none",
                            color: "var(--primary-color)",
                          }}
                        >
                          Logout
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mobile_menu">
                <span className="menu_icon" onClick={menuToggle}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 7.375H20.25"
                      stroke="#515151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.75 13H15.75"
                      stroke="#515151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.75061 18H20.25"
                      stroke="#515151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
