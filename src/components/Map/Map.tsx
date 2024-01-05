import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import farmersMarkets from '../../marketData';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//currently our react-typescript version is not showing the default marker.  Chat-gpt suggested creating a custom one
const customMarkerIcon: L.Icon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

//types needed for our state object
type Market = {
  listing_name: string;
  location_x: string;
  location_y: string;
  listing_id: string;
  brief_desc: string;
};

//The newest version of leaflet uses a new hook called useMap
//This means the center=[lat, long] is no longer valid, nor is the zoom or scrollWheelZoom

//Typescript - define the props that we need for useMap
type MapConfigProps = {
  center: [number, number];
  zoom: number;
};

//Define another component (ConfigureMap) for the useMap hook
//If we don't want to go with the newish useMap hook, we'll need to revert back to the leaflet version that we used for Park Planner
function ConfigureMap({ center, zoom }: MapConfigProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom); // Sets the center and zoom level of the map
    map.scrollWheelZoom.enable(); // Enables scroll wheel zoom
  }, [center, zoom, map]);
  return null;
}

function Map() {
  console.log('farmersMarkets', farmersMarkets);

  //use the Market type here as we set our state
  const [activeMarket, setActiveMarket] = useState<Market | null>(null);
  const navigate = useNavigate();

  //variables setting our starting map center and zoom
  //set to Denver Colorado, with zoom that shows all 5 markets from our data file
  const center: [number, number] = [39.7414378, -104.961905];
  const zoom = 7;

  return (
    <MapContainer style={{ height: '400px', width: '100%' }}>
      <ConfigureMap center={center} zoom={zoom} />
      {activeMarket && (
        <Popup
          position={[
            Number(activeMarket.location_y), //location_y is the positive number (approx 38)
            Number(activeMarket.location_x), //location_x is the negative number in our data (approx -107)
          ]}
        >
          <div>
            <h2>{activeMarket.listing_name}</h2>
            <p>{activeMarket.brief_desc}</p>
          </div>
        </Popup>
      )}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Had to delete the attribution line of code from the TileLayer, typescript didn't like it at all */}
      {farmersMarkets.data.map(market => {
        console.log(
          `Market: ${market.listing_name}, X: ${market.location_x}, Y: ${market.location_y}`
        );
        console.log(
          `Type of X: ${typeof Number(
            market.location_x
          )}, Type of Y: ${typeof Number(market.location_y)}`
        );

        return (
          <Marker
            key={market.listing_id}
            position={[Number(market.location_y), Number(market.location_x)]}
            icon={customMarkerIcon}
            eventHandlers={{
              click: () => {
                navigate(`/map/${market.listing_name}`);
                setActiveMarket(market);
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}

export default Map;
