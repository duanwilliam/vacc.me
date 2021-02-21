import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Map from 'components/Map';

import './index.scss';

import { loadLocations } from 'actions/mapActions';
import { getSites, filterSites } from 'actions/siteActions';
import Navbar from 'components/Navbar';
import FilterDrawer from 'components/FilterDrawer';
import Sidebar from 'components/Sidebar';

let sites = {};

const MapPage = (props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    props.getSites();
  }, []);

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const showSidebar = () => setSidebarVisible(true);
  const hideSidebar = () => setSidebarVisible(false);
  const showDrawer = () => setDrawerVisible(true);
  const hideDrawer = () => setDrawerVisible(false);

  const onMapLoad = (map) => {
    window.map = map;
    loadLocations(map, sites);
  }

  const sendForm = (filters) => {
    props.filterSites(filters);
    showSidebar();
  }

  return (
    <div className="map-page">
      <Navbar toggleSidebar={toggleSidebar} showDrawer={showDrawer} />
      <Sidebar closeSidebar={hideSidebar} visible={sidebarVisible}/>
      <FilterDrawer onClose={hideDrawer} visible={drawerVisible} onFinish={sendForm} />
      <Map onLoad={onMapLoad} />
    </div>
  );
}

const mapStateToProps = (state) => {
  sites = state.sites.sites;

  return {
    sites: state.sites.sites
  }
}

export default connect(mapStateToProps, { getSites, filterSites })(MapPage);