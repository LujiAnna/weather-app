// WEATHER
const btn = document.querySelector('button');
const placeCity = document.querySelector('.helper-text');
const temp = document.querySelector('h4');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const description = document.querySelector('.description');
const rain = document.querySelector('.rain');

const cityElement = document.querySelector('#city');
const time = document.querySelector('.time');
const greetings = document.querySelector('#greetings');

// TIME
let timeObject = new Date();
let getHourz = timeObject.getHours();
let getMinutez = timeObject.getMinutes();
let greet = '';

getHourz < 10 ? getHourz = '0' + getHourz: getHourz;
getMinutez < 10 ? getMinutez = '0' + getMinutez : getMinutez;
getHourz < 12 ? greet = 'Good morning': 
getHourz < 18 ? greet = 'Good afternoon': greet = 'Good evening';                           ;

// console.log(getMinutez);
// console.log(typeof(getMinutez));
greetings.innerHTML = greet;

time.innerHTML = `${getHourz}:${getMinutez}`;

// FORECAST


// API
let api = 'https://api.openweathermap.org/data/2.5';
let units = 'units=metric';
let apiKey = 'b95e3e61a17d2eadd3e525d8145db6e5';

// INTERACTION
btn.addEventListener('click', () => {
  // grab user input
  let city = cityElement.value;
  // console.log(city); 

  // let myRequest = new Request(url);
  // const fetchResponsePromise = fetch(resource [, init])
  let url_weather =`${api}/weather?q=${city}&${units}&appid=${apiKey}`
  let url_forecast = `${api}/forecast?q=${city}&appid=${apiKey}`

  // fetch temperature from url
  fetch(url_weather)
  .then(function response(response){
  // console.log('hey');
  // console.log(response);
    return response.json(); 
  })
.then(function(myJson) {
  console.log(myJson);
  //  console.log(typeof(myJson), typeof(JSON.stringify(myJson))) ; // object, string

// display city below input line/box
// console.log(myJson.city);
// console.log(myJson.city.name); 
// placeCity.innerHTML = myJson.city.name + ', ' + myJson.city.country;

// console.log(myJson.name);
placeCity.innerHTML = `${myJson.name}, ${myJson.sys.country}`;

// display temperature on box
// console.log(myJson.list[0].main.temp);
temp.innerHTML = `${Math.round(myJson.main.temp)} &deg;`;
// temp.innerHTML = `${myJson.main.temp} &#8451;`;
high.innerHTML = `Today's high ${myJson.main.temp_max} &deg;`;
low.innerHTML = `Today's low ${myJson.main.temp_min} &deg;`;

// rain.innerHTML = `Chances of rain in ${myJson.rain} `;
// for (const [key, value] of Object.entries(myJson.rain)) {
//   console.log(`${key}: ${value}`);
//   rain.innerHTML = `Chances of rain in ${key} is ${value*100}&#37;`;
// }

description.innerHTML = `There's ${myJson.weather[0].description}`;

// remove typed city from input
  cityElement.value = '';

  // TODO: 5 Days Weather Forecast
 // use: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//  TODO: Prepare display area

// Fetch another API
return fetch(url_forecast);

  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (data) {
    console.log(data);


  }).catch(function (error) {
    console.warn(error);
  })
}); // close addEventListener
