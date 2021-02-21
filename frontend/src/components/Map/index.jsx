import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import './index.scss';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Mapbox = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidnNjb2RldiIsImEiOiJja2xkYWpmZXgxc25hMnBtdnI3ZzE2ampzIn0.Y4ZL-wJ-AQ29QjrJE4t_sA'
});

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Mapbox 
      antialias={true}
      containerStyle={{
        height: '110vh', // hack. it wasnt fitting to the whole screen otherwise??
        width: '100%',
        transition: '.5s'
      }}
      center={[-117.23754811641379, 32.881287611627904]}
      flyToOptions={{
        speed: 2
      }}
      onClick={this.props.onClick}
      onStyleLoad={this.props.onLoad}
      pitch = {[60]}
      style="mapbox://styles/mapbox/light-v10"
      zoom = {[16]}
    />
    )
  }
}

/*
const Map = (props) => {
  const {onClick, onLoad} = props;
  console.log("Map loading");
  return (
    <Mapbox 
      antialias={true}
      containerStyle={{
        height: '110vh', // hack. it wasnt fitting to the whole screen otherwise??
        width: '100%',
        transition: '.5s'
      }}
      center={[-117.23754811641379, 32.881287611627904]}
      flyToOptions={{
        speed: 2
      }}
      onClick={onClick}
      onStyleLoad={onLoad}
      pitch = {[60]}
      style="mapbox://styles/mapbox/light-v10"
      zoom = {[16]}
    />
  );
}
*/

export default Map;