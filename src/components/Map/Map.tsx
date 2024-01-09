import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getMarkets } from '../../apiCalls';
import NavigationBar from '../NavigationBar/NavigationBar';
import './Map.css';
import Header from '../Header/Header';

//custom marker icon
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
type MarketProps = {
  market_name: string;
  address: string;
  website: string;
  phone: string;
  lat: string;
  lon: string;
};

type selectedMarketProps = [
  {
    market_name: string;
    address: string;
    lat: string;
    lon: string;
    website: string;
    zipcode: string;
    phone: string;
  }
];

export type MapProps = {
  isVendor: boolean;
  currentUserId: string;
  addZipAndRadius: Function;
  selectedZipcode: string;
  selectedRadius: string;
};

type MapConfigProps = {
  center: [number, number];
  zoom: number;
};

type User = {
  first_name?: string;
};

// useMap hook
function ConfigureMap({ center, zoom }: MapConfigProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom); // Sets the center and zoom level of the map
    map.scrollWheelZoom.enable(); // Enables scroll wheel zoom
  }, [center, zoom, map]);
  return null;
}

function Map({
  selectedZipcode,
  selectedRadius,
  addZipAndRadius,
  isVendor,
  currentUserId,
}: MapProps) {
  console.log('selectedZipcode: ', selectedZipcode);

  const urlZipRadius = useParams();
  const urlZip = urlZipRadius.zip;
  const urlRadius = urlZipRadius.radius;

  const [selectedMarketByZip, setSelectedMarketByZip] =
    useState<selectedMarketProps | null>(null);
  const [zipcode, setZipcode] = useState('');
  const [radius, setRadius] = useState('');
  const [map, setMap] = useState<L.Map | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [headerText, setHeaderText] = useState(
    'Please Select A Zip Code and Radius'
  );

  useEffect(() => {
    if (urlZip !== undefined && urlRadius !== undefined) {
      getMarkets(urlZip, urlRadius)
        .then(data => {
          setSelectedMarketByZip(data);
          console.log('data from API', data);

          if (data && data.length > 0 && map) {
            const firstMarket = data[0];
            map.flyTo([Number(firstMarket.lon), Number(firstMarket.lat)], 11, {
              duration: 2,
            });
          }
        })
        .catch(error => console.log(error));
    }
  }, [urlZip, urlRadius, searchClicked, map]);

  const [activeMarket, setActiveMarket] = useState<MarketProps | null>(null);
  const navigate = useNavigate();

  const center: [number, number] =
    selectedMarketByZip && selectedMarketByZip.length > 0
      ? [Number(selectedMarketByZip[0].lon), Number(selectedMarketByZip[0].lat)]
      : [39.7414378, -104.961905]; // Default to Denver if no market is selected
  const zoom = 11;

  const [errorMessage, setErrorMessage] = useState('')

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (isNaN(Number(zipcode)) || isNaN(Number(radius)) || zipcode.length !== 5 || Number(radius) <= 0) {
      setErrorMessage('Invalid input. Please check your entries and make sure both fields are filled.');

      setTimeout(() => {
      setErrorMessage('');
    }, 3000);

      return;
    }
    
    addZipAndRadius(zipcode, radius);
    setSearchClicked(true);
    navigate(`/map/${zipcode}/${radius}`);
    setHeaderText('Search Results');
    clearInputs()
    setErrorMessage('')
  };

  const clearInputs = () => {
    setZipcode('')
    setRadius('')
  }

  function MyComponent() {
    const map = useMap();

    useEffect(() => {
      if (
        searchClicked &&
        selectedMarketByZip &&
        selectedMarketByZip.length > 0 &&
        map
      ) {
        const firstMarket = selectedMarketByZip[0];
        map.flyTo([Number(firstMarket.lon), Number(firstMarket.lat)], 11, {
          duration: 2,
        });
      }
    }, [searchClicked, selectedMarketByZip, map]);

    return null;
  }

  return (
    <div className='map-page'>
      <Header name={headerText} />
      <NavigationBar
        selectedZipcode={selectedZipcode}
        selectedRadius={selectedRadius}
        isVendor={isVendor}
        currentUserId={currentUserId}
      />
      <form>
        <input
          className='map-form-input'
          type="text"
          name="zip"
          placeholder="Enter zip code..."
          value={zipcode}
          onChange={e => setZipcode(e.target.value)}
          onKeyDown={(e) => {
            // Allow only numbers, the delete key, and the tab key
            const isNumericKey = !isNaN(Number(e.key));
            const isDeleteKey = e.key === 'Delete' || e.key === 'Backspace';
            const isTabKey = e.key === 'Tab';

            if (!isNumericKey && !isDeleteKey && !isTabKey) {
              e.preventDefault();
            }
          }}
        ></input>
        <input
          type="text"
          className='map-form-input'
          name="radius"
          placeholder="Enter radius..."
          value={radius}
          onChange={e => setRadius(e.target.value)}
          min="1"
          onKeyDown={(e) => {
            // Allow only numbers, the delete key, and the tab key
            const isNumericKey = !isNaN(Number(e.key));
            const isDeleteKey = e.key === 'Delete' || e.key === 'Backspace';
            const isTabKey = e.key === 'Tab';

            if (!isNumericKey && !isDeleteKey && !isTabKey) {
              e.preventDefault();
            }
          }}
        ></input>
        <button className='map-form-button' onClick={handleSearch}>Search</button>
      </form>
      <p className='error-message'>{errorMessage}</p>

      <MapContainer className="map-container">
        <ConfigureMap center={center} zoom={zoom} />
        <MyComponent />
        {activeMarket && (
          <Popup
            position={[
              Number(activeMarket.lon), //location_y is the positive number (approx 38)
              Number(activeMarket.lat), //location_x is the negative number in our data (approx -107)
            ]}
          >
            <div className='popup-container' style={{ overflow: 'hidden' }}>
              <div className='popup-details-container'>
                <h2>{activeMarket.market_name}</h2>
                <p>{activeMarket.address}</p>
                <p>{activeMarket.phone}</p>
                <a
                  href={activeMarket.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {activeMarket.website}
                </a>
              </div>
              
              <div className='popup-button-container'>
                <button className='popup-button'>Select My Market</button>
              </div>
              
            </div>
          </Popup>
        )}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedMarketByZip &&
          selectedMarketByZip.map(market => {
            console.log(
              `Market: ${market.market_name}, X: ${market.lat}, Y: ${market.lon}`
            );
            console.log(
              `Type of X: ${typeof Number(
                market.lat
              )}, Type of Y: ${typeof Number(market.lon)}`
            );

            return (
              <Marker
                key={market.market_name}
                position={[Number(market.lon), Number(market.lat)]}
                icon={customMarkerIcon}
                eventHandlers={{
                  click: () => {
                    setActiveMarket(market);
                  },
                }}
              />
            );
          })}
      </MapContainer>
    </div>
  );
}

export default Map;