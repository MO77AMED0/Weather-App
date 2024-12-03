'use strict';
const search =document.getElementById('search');
const weekday=document.getElementById('weekday');
const dateDay=document.getElementById('dateDay');
const locationCity=document.getElementById('locationCity');
const temperature=document.getElementById('temperature');
const Text=document.getElementById('Text');
const imagIcon=document.getElementById('imagIcon');
const humidityToday=document.getElementById('humidityToday');
const wind_kphTody=document.getElementById('wind_kphTody');
const widDurectain=document.getElementById('widDurectain');
const tommorrowDay=document.getElementById('tommorrowDay');
const iconTommorrow=document.getElementById('iconTommorrow');
const temperatureTommorrow=document.getElementById('temperatureTommorrow');
const temperatureTommorrowTwo=document.getElementById('temperatureTommorrowTwo');
const clearrTommorrow=document.getElementById('clearrTommorrow');
const afterTommorrowDay=document.getElementById('afterTommorrowDay');
const iconAfterTommorrow=document.getElementById('iconAfterTommorrow');
const temperatureAfterTommorrow=document.getElementById('temperatureAfterTommorrow');
const temperatureAfterTommorrowTwo=document.getElementById('temperatureAfterTommorrowTwo');
const clearrAfterTommorrow=document.getElementById('clearrAfterTommorrow');


let o = "o"
let c = "c"




if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){

        const lat =pos.coords.latitude;
        const log =pos.coords.longitude;

        getApi(`${lat}, ${log}`);
   
    });
};


async function getApi(locationPlace) {

    let res =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c603ea518a0b48488c4103159242206&q=${locationPlace}&days=3&aqi=no&alerts=no`);
    let data = await res.json();
    displayTommorrow(data);
    displyWeather(data);
    
displayAfterTommorrow(data)


};

search.addEventListener('input', function(e){
   getApi(e.target.value);
} );

function displyWeather(data){
       const today =data.current.last_updated;
       let displayDate = new Date(today);
       const day =displayDate.toLocaleString('en-us',{weekday:'long'}); // day name
       const dateMonthe =displayDate.getDate();//  month number
       const Month =displayDate.toLocaleString('en-us',{month:'long'} );// month name 
       const cityName =data.location.name;// city name
       const temperatureCity =data.current.temp_c;
       const todyText=data.current.condition.text;
       const humidity=data.current.humidity;
       const wind_kph=data.current.wind_kph;
       const wind_dir=data.current.wind_dir;

       weekday.innerHTML = day;
       dateDay.innerHTML = dateMonthe + Month ;
       locationCity.innerHTML = cityName;
       temperature.innerHTML=`<div class="num ms-4" id="temperature">${temperatureCity}<sup>${o}</sup>${c}</div>`;
       Text.innerHTML=todyText;
       humidityToday.innerHTML=` <span class="ms-4  me-3"><img src="image/icon-umberella.png" alt="umberella" id="umberella" >${humidity}</span>`;
       wind_kphTody.innerHTML=wind_kph;
       widDurectain.innerHTML=wind_dir;
       imagIcon.setAttribute('src',"https://cdn.weatherapi.com/weather/64x64/night/113.png");

};

function displayTommorrow({forecast}){

  const forecastday= new Date(forecast.forecastday[1].date).toLocaleString("en-us",{weekday:'long'});
  const temperature =forecast.forecastday[1].day.maxtemp_c;
  const temperatureTwo=forecast.forecastday[1].day.mintemp_c;
  const clearr =forecast.forecastday[1].day.condition.text;


  tommorrowDay.innerHTML=forecastday;
  iconTommorrow.setAttribute('src',"https://cdn.weatherapi.com/weather/64x64/day/113.png");
  temperatureTommorrow.innerHTML=`<div >${temperature}<sup>${o}</sup>${c}</div>`
  temperatureTommorrowTwo.innerHTML=`<small class="ms-4">${temperatureTwo}<sup>${o}</sup></small>`
  clearrTommorrow.innerHTML=clearr;


};

function displayAfterTommorrow({forecast}){

    const forecastday= new Date(forecast.forecastday[2].date).toLocaleString("en-us",{weekday:'long'});
    const temperature =forecast.forecastday[2].day.maxtemp_c;
    const temperatureTwo=forecast.forecastday[2].day.mintemp_c;
    const clearr =forecast.forecastday[2].day.condition.text;
  
  
    afterTommorrowDay.innerHTML=forecastday;
    iconAfterTommorrow.setAttribute('src',"https://cdn.weatherapi.com/weather/64x64/day/113.png");
    temperatureAfterTommorrow.innerHTML=`<div >${temperature}<sup>${o}</sup>${c}</div>`
    temperatureAfterTommorrowTwo.innerHTML=`<small class="ms-4">${temperatureTwo}<sup>${o}</sup></small>`
    clearrAfterTommorrow.innerHTML=clearr;
  
  
  };
  
































