import React,{useState,useEffect, useRef} from 'react'
import "./App.css"
import Cities from './City.json';

const App = () => {
  const [citydata, setcitydata] = useState(Cities)
  const [text, settext] = useState();
  const [weather, setWeather] = useState();
 const [city, setcity] = useState()
 const ref1 = useRef()



  const fetchcity=(d="bhopal")=>{
    const API_key="eaac5e5a0da1f61ee6d0fe880606860f"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${d}&units=metric&APPID=${API_key}`)
    .then((res) => res.json())
    .then((data)=>{
       
          setWeather('')
          setcity(data)
      
    })
   
  }

  useEffect(() => {
    
    fetchcity()

  },[])
  

 
  const oninputhandler=(e)=>{
    const word=e.target.value
   settext(e.target.value)
   const filterdata=citydata.filter((e)=>{
     return e.name.toLowerCase().includes(word.toLowerCase())
   })
   setWeather(filterdata)  
  }
 const showweather=(d)=>{
    fetchcity(d)
    ref1.current.value=''
 }
   const createdate=(d)=>{
     return `${d}`
   }
return (
  <div className={city ? ((city.main.temp>19)? "app warm":'app'):'app'}>
        <main>
         <div className="search-box">
          <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={oninputhandler}
              name='search'
              ref={ref1}
              autoComplete='off'
              
            />
            {weather && <div >
                     {weather.map((e,i)=>{
                       return <div onClick={()=>showweather(e.name)} className='dropdown' key={i}><li>{e.name}</li></div>
                     })}
          </div> }
             
         
  
          </div>
        
          <div>

            <div className="location-box">
              {city &&  <div className="location">{city.name}</div> }
             < div className="date">{createdate(new Date().toDateString())}</div>
             
            </div>
            <div className="weather-box">
            {city &&   <div className="temp">
            {city.main.temp}
               </div>}
             {city &&   <div className="weather">{city.weather[0].main}</div> }
            
            </div>
          </div>
         
        </main>
      </div>
    );
  }
  
  

export default App














// import React, { useState } from 'react';
// import "./App.css";
// import Cities from './City.json';


// function App() {
//   const [query, setQuery] = useState(Cities);
//   const [weather, setWeather] = useState({});

//   const search = evt => {
//     if (evt.key === "Enter") {
//       fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//         .then(res => res.json())
//         .then(result => {
//           setWeather(result);
//           setQuery('');
//           console.log(result);
//         });
//     }
//   }

//   const dateBuilder = (d) => {
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`
//   }

//   return (
//     <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
//       <main>
//         <div className="search-box">
//           <input 
//             type="text"
//             className="search-bar"
//             placeholder="Search..."
//             onChange={e => setQuery(e.target.value)}
//             onKeyPress={search}
//           />
//            <div className='dropdown'>
//             <li>hekko</li>
//         </div>
       

//         </div>
//         {(typeof weather.main != "undefined") ? (
//         <div>
//           <div className="location-box">
//             <div className="location">{weather.name}, {weather.sys.country}</div>
//             <div className="date">{dateBuilder(new Date())}</div>
//           </div>
//           <div className="weather-box">
//             <div className="temp">
//               {Math.round(weather.main.temp)}°c
//             </div>
//             <div className="weather">{weather.weather[0].main}</div>
//           </div>
//         </div>
//         ) : ('')}
//       </main>
//     </div>
//   );
// }

// export default App;