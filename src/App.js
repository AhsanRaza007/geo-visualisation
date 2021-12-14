import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { getData } from './api-client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import Popup from './components/Popup';
import './App.css';

function App() {
  const [geoData, setGeoData] = useState(null);
  const [users, setusers] = useState(null);
  const position = [12.9716, 77.5946] // center position for bangalore

  let fetchAllData = async () =>{
      let geoJsonData = await getData('areas');
      let usersData = await getData('users');
      let aggregatedData = aggregateUserDataByRegion(usersData.users);
      setusers(aggregatedData);
      setGeoData(geoJsonData);
  }

  const aggregateUserDataByRegion = (userData) => {
    let newData = {};
    userData.forEach(user => {
      if(!newData[user.area_id]){
        newData[user.area_id] = {
          age_sum: user.age,
          num_paid_user: user.is_pro_user ? 1 : 0,
          num_matches: user.total_matches,
          male_count: user.gender === 'M' ? 1 : 0,
          female_count: user.gender === 'F' ? 1 : 0,
          users_count: 0
        }
      } 
      else{
        newData[user.area_id].age_sum += user.age;
        newData[user.area_id].num_paid_user += user.is_pro_user ? 1 : 0;
        newData[user.area_id].num_matches += user.total_matches;
        newData[user.area_id].male_count += user.gender === 'M' ? 1 : 0;
        newData[user.area_id].female_count += user.gender === 'F' ? 1 : 0;
        newData[user.area_id].users_count += 1;
      }
    })
    return newData;
  }

  useEffect(()=>{
    fetchAllData()
  }, [])

  let onEachArea = (area, layer) => {
      let popup = ReactDOMServer.renderToString(<Popup users={users[area.properties.area_id]} properties={area.properties}></Popup>)
      layer.bindPopup(popup)
  }

  return (
    <div className="App">
        {geoData ? <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          <GeoJSON data={geoData?.features} onEachFeature={onEachArea}></GeoJSON>
        </MapContainer> : 'Loading...'}
    </div>
  );
}

export default App;
