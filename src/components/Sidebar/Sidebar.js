/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import styled from "styled-components";
import { FiRefreshCcw } from "react-icons/fi";

import logo from "xuan_logo.png";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div className="sidebar" data-color={"black"} data-active-color={"blue"}>
      <div className="logo">
        <div className="logo-img">
          <img src={logo} alt="react-logo" />
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li className={activeRoute(prop.path)} key={key}>
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
          <li>
            <ClientTitleContainter>
              <p>CLIENTS</p>
              <RefreshContainer>
                  <FiRefreshCcw
                    onClick={() => {
                      console.log("hello");
                      props.refreshClients();
                    }}
                  />
              </RefreshContainer>
            </ClientTitleContainter>
          </li>
          {props.clients.map((c) => {
            return (
              <li className={activeRoute(`/admin/client/${c.key}`)} key={c.key}>
                <NavLink
                  to={`/admin/client/${c.key}`}
                  className="nav-link"
                  activeClassName="active"
                >
                  {c.firstName} {c.lastName}
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;

const ClientTitleContainter = styled.div`
  margin: 10px 15px 0px;
  padding: 10px 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: pink;
`;

const RefreshContainer = styled.button`
  padding: 0px 10px;
  border: none;
  background: none;
  color: pink;
`;
