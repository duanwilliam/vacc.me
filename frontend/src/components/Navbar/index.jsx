import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.scss';

const Navbar = (props) => {
  const {toggleSidebar, showDrawer} = props;
  return (
    <nav className="navbar">
      <NavLink to="/">
        <h2>vacc.me</h2>
      </NavLink>
      <div className="nav-menu">
        <div onClick={toggleSidebar}>
          View Locations
        </div>
        <div onClick={showDrawer}>
          Filters
        </div>
      </div>
    </nav>
  );
}

export default Navbar;