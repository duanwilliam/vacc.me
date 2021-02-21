import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'antd';

import './index.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <h2>vacc&#46;me</h2>
      </nav>
      <main className="content">
        <h1>Vaccination<br/>a click away</h1>
        <h4>Find an open vaccination location near you</h4>
        <NavLink to="map">
          <Button className="get-started" size="big" shape="round">
            Get Started
          </Button>
        </NavLink>
      </main>
      <div className="credits">Made at SDHacks 2021</div> 
    </div>
  );
}

export default HomePage;