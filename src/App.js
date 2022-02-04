import React, {useState} from 'react';
import './App.css';

function App() {


  const distAPI = {
    key:"AIzaSyB-jZ-fJsZG_GPiVCAMPv12s7lcfZUFtQE",
    baseURL: "https://maps.googleapis.com/maps/api/distancematrix/json?origins="
  }


  const [query,setQuery] = useState('');
  const [distance,setDistance] = useState({});


  const search = (e) => {
    console.log(`${e.key} pressed`);
    if(e.key=="Enter"){
      console.log("Request init.");
      if (navigator.geolocation) {
          const pos = navigator.geolocation.getCurrentPosition(receivedPosition);
        }
    }
  }

  const receivedPosition = (pos) => {
    const finalURL = `${distAPI.baseURL}+${pos.coords.latitude}%2C${pos.coords.longitude}&destinations=${query}&key=${distAPI.key}`;
    fetch(finalURL).then(res => res.json()).then(
      results => {
        console.log(results["rows"][0]["elements"][0])
        setDistance(results["rows"][0]["elements"][0])
        setQuery('')
      }
    )
  }

  const sanitiseInput = (input) =>
  {
    return input.replace(" ", "+");
  }


  return (
    <div className="App">
      <h1 className="title"> Quick Distance Calculator </h1>
      <input type="text" className="place-form" placeholder="Search for an address..."  onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
      {(Object.keys(distance).length !== 0 && distance.status==="OK") ? (
        <div>
          <h3 className="dist"> {distance.distance.text} </h3>
          <h5 className="time"> Driving time is approximately {distance.duration.text}. </h5>
        </div>
      ):(
      <>
        {(Object.keys(distance).length === 0) ? (
          <h3 className="dist">  Search for an address</h3>
        ) : (
          <h3 className="dist">  No direct route exists.</h3>
        )
        }
        </>
      )
  }

    </div>
  );
}

export default App;


//
// onChange={e => setQuery(e.target.value)} value={query}
