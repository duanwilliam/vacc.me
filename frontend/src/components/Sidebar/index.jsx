import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { CloseOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

import './index.scss';

import driveThru from 'assets/drivethru.png';
import walkThru from 'assets/walkthru.png';

const Sidebar = (props) => {
  const {closeSidebar, visible} = props;

  // hacks
  useEffect(() => {if(props.filtered) carouselChange(-1, carouselIndex)}, [props.filtered]);
  useEffect(() => {if(visible) carouselChange(-1, carouselIndex)}, [visible])

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [siteTimes, setSiteTimes] = useState({});

  const carouselChange = (from, to) => {
    if(!props.filtered[to]) return; // hack sanity check
    const name = props.filtered[to][0];
    setSiteName(name);
    setSiteAddress(props.sites[name].address);
    setSiteTimes(props.sites[name].times);
    setCarouselIndex(to);
    window.map.flyTo({
      center: [
        props.sites[name].long,
        props.sites[name].lat,
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    })
  }

  return visible && (
    <div className="sidebar">
      <div className="sidebar-close-button">
        <CloseOutlined onClick={closeSidebar}/>
      </div>
      <div className="carousel-title">
        {props.filtered.length ? 
          (<>
            <h2>Suggested Locations</h2>
            <p>{carouselIndex+1} / {props.filtered.length}</p>
          </>)
          :
          (
            <h2>Enter Filters</h2>
          )
        }
        </div>
      <Carousel
        dots={false}
        infinite={false}
        centerMode={true}
        centerPadding="0"
        beforeChange={carouselChange}
        arrows
      >
        {props.filtered.map((site, i) => {
            const src = site[1] ? driveThru : walkThru;
            return (
            <div className="carousel-item" key={i}>
              <img src={src} alt="vaccination site" className="carousel-image" />
            </div>)
          })}
      </Carousel>
      <div className="site-details">
        <h3>{siteName}</h3>
        <p>{siteAddress}</p>
      </div>
      <div className="site-times">
          {('m' in siteTimes) && (
            <div className="time-entry">
              <h4>Mon</h4>
              <p>{`${timeToDisplay(siteTimes['m'][0])}-${timeToDisplay(siteTimes['m'][1])}`}</p>
            </div>
          )}
          {('tu' in siteTimes) && (
            <div className="time-entry">
              <h4>Tue</h4>
              <p>{`${timeToDisplay(siteTimes['tu'][0])}-${timeToDisplay(siteTimes['tu'][1])}`}</p>
            </div>
          )}
          {('w' in siteTimes) && (
            <div className="time-entry">
              <h4>Wed</h4>
              <p>{`${timeToDisplay(siteTimes['w'][0])}-${timeToDisplay(siteTimes['w'][1])}`}</p>
            </div>
          )}
          {('th' in siteTimes) && (
            <div className="time-entry">
              <h4>Thu</h4>
              <p>{`${timeToDisplay(siteTimes['th'][0])}-${timeToDisplay(siteTimes['th'][1])}`}</p>
            </div>
          )}
          {('f' in siteTimes) && (
            <div className="time-entry">
              <h4>Fri</h4>
              <p>{`${timeToDisplay(siteTimes['f'][0])}-${timeToDisplay(siteTimes['f'][1])}`}</p>
            </div>
          )}
          {('sa' in siteTimes) && (
            <div className="time-entry">
              <h4>Sat</h4>
              <p>{`${timeToDisplay(siteTimes['sa'][0])}-${timeToDisplay(siteTimes['sa'][1])}`}</p>
            </div>
          )}
          {('su' in siteTimes) && (
            <div className="time-entry">
              <h4>Sun</h4>
              <p>{`${timeToDisplay(siteTimes['su'][0])}-${timeToDisplay(siteTimes['su'][1])}`}</p>
            </div>
          )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filtered: state.sites.filtered,
  sites: state.sites.sites,
});

export default connect(mapStateToProps)(Sidebar);

const dowToDisplay = {
  m: 'Mon',
  tu: 'Tue',
  w: 'Wed',
  th: 'Thu',
  f: 'Fri',
  sa: 'Sat',
  su: 'Sun',
}

const timeToDisplay = (n) => {
  const half = n < 12 ? 'AM' : 'PM';
  const hour = (Math.floor(n) % 12) || 12;
  const split = n.toString().split('.');
  let minute = '00';
  if(split.length > 1) {
    const decimal = split[split.length-1];
    minute = (() => {
      switch(decimal) {
        case '25': return '15';
        case '5': return '30';
        case '75': return '45';
      }
    })();
  }
  return `${hour}:${minute} ${half}`;
}