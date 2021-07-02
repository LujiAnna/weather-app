// trigger drop down
$(".dropdown-trigger").dropdown();

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
let getDay = timeObject.getUTCDay();
// console.log(getDay); //0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.

// Determine days
switch(getDay) {
  case 0:
    getDay = 'Sunday';
    break;
  case 1:
    getDay = 'Monday';
    break;
  case 2:
    getDay = 'Tuesday';
    break;
  case 3:
    getDay = 'Wednesday';
    break;
  case 4:
    getDay = 'Thursday';
    break;
  case 5:
    getDay = 'Friday';
    break;  
  case 5:
    getDay = 'Saturday';
      break; 
  default:
    getDay = 'Coffee Time';
}

// console.log(getDay);

let greet = '';

getHourz < 10 ? getHourz = '0' + getHourz: getHourz;
getMinutez < 10 ? getMinutez = '0' + getMinutez : getMinutez;
getHourz < 12 ? greet = 'Good morning': 
getHourz < 18 ? greet = 'Good afternoon': greet = 'Good evening';                           ;

// console.log(getMinutez);
// console.log(typeof(getMinutez));
greetings.innerHTML = greet;

time.innerHTML = `<span class='show-day'>${getDay}</span> ${getHourz}:${getMinutez}`;

// FORECAST 
const days = document.querySelectorAll('.day');
// console.log(days);
// console.log('days ,', typeof(days)); //object but looks like array // array-like object

// API
let api = 'https://api.openweathermap.org/data/2.5';
let units = 'units=metric';
let apiKey = 'b95e3e61a17d2eadd3e525d8145db6e5';

var city = '';

var getCity = () => {
  // city = cityElement.value;
  // console.log(city);
  return city=cityElement.value;
  //  ore dont use `return` but also remove `{}`
  // read more: https://stackoverflow.com/questions/45754957/why-doesnt-my-arrow-function-return-a-value
}
// getCity(); // worked on console
// console.log(getCity());

let callApi  = () => {
  // grab user input
  // let city = cityElement.value;
  //  city = cityElement.value;
// debugger;
// console.log(getCity()); 

  city = getCity();

  // console.log(city); 


  // let myRequest = new Request(url);
  // const fetchResponsePromise = fetch(resource [, init])
  let url_weather =`${api}/weather?q=${city}&${units}&appid=${apiKey}`
  let url_forecast = `${api}/forecast?q=${city}&${units}&appid=${apiKey}`

  // fetch temperature from url
  fetch(url_weather)
  .then(function response(response){
  // console.log('hey');
  // console.log(response);
    return response.json(); 
  })
.then(function(myJson) {
  // console.log(myJson);
  //  console.log(typeof(myJson), typeof(JSON.stringify(myJson))) ; // object, string

// display city below input line/box
// console.log(myJson.city);
// console.log(myJson.city.name); 
// placeCity.innerHTML = myJson.city.name + ', ' + myJson.city.country;

// console.log(myJson.name);
placeCity.innerHTML = `${myJson.name}, ${myJson.sys.country}`;

// display temperature on box
// console.log(myJson.list[0].main.temp);
temp.innerHTML = `${Math.round(myJson.main.temp)}&deg;`;
// temp.innerHTML = `${myJson.main.temp} &#8451;`;
high.innerHTML = `Today's high ${Math.round(myJson.main.temp_max)}&deg;`;
low.innerHTML = `Today's low ${Math.round(myJson.main.temp_min)}&deg;`;

// rain.innerHTML = `Chances of rain in ${myJson.rain} `;
// for (const [key, value] of Object.entries(myJson.rain)) {
//   console.log(`${key}: ${value}`);
//   rain.innerHTML = `Chances of rain in ${key} is ${value*100}&#37;`;
// }

description.innerHTML = `There's ${myJson.weather[0].description}`;

// remove typed city from input
  cityElement.value = '';

  //5 Days Weather Forecast
 // use: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// Fetch another API
return fetch(url_forecast);

  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (data) {
    // console.log(data);
    // console.log(data.list);
    // Loop through array of objects for 5 days- index 0 to 4
let weatherForecast = [];
    for (let i = 0; i < 5; i++) {
      // Access data object
  // console.log(data.list[i]);

  // TODO: Access date 
  // TODO: Convert date to days dt: 1625205600, dt_txt: "2021-07-02 06:00:00"
  // console.log(data.list[i].clouds);
  // TODO: FIX BUG!!! Each day, forecast is done in 3h interval from midnight00 to 9p2100  (8times)
  // TODO: Iterate depending on time of day AND iterate to get correct day (use filter!)
  // TODO: First iterate through DATE AND TIME, to get correct temperature

  // Temperature
  // console.log(data.list[i].main);
  // console.log(data.list[i].main.temp);
  weatherForecast.push(data.list[i].main.temp);
  // console.log(weatherForecast);
}

// console.log(weatherForecast);

days.forEach(function(singleDay,i) {
  // console.log(i);
  // console.log(singleDay);
// console.log(forecast)
 // grab indexwise from data.list[i].main.temp
 // write in dom
 // day.innerHTML = `${forecast}&deg;`;
  singleDay.innerHTML = `${Math.round(weatherForecast[i])}&deg;`;

  // TODO: display day using getDay with first 3 letters eg Mon for monday and so on
});


  }).catch(function (error) {
    console.warn(error);
  })
}; // close addEventListener


// Keyboard INTERACTION
let x = document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  // console.log(event);
  // console.log(event.key);
  // key - 'Enter', code - 'Enter', keyCode - 13
  if (keyName === 'Enter') {
    // do sth
    // return; // do nothing, if so is your wish
    // console.log('Hey key');
    // console.log(event.key);
    // console.log(event);
    // TODO: Access input value 
    // city = cityElement.value;
    // console.log(city);
    city = getCity();
    // console.log(city);

    // now call your api
    callApi();

    // Get this key out to fetch
    // this function must be called in order to access the `city` variable
  }
}, false);

// console.log(city);


// Button INTERACTION
btn.addEventListener('click', callApi);



// ACCORDION
const mainElements = document.querySelectorAll('.main');
const contentElements = document.querySelectorAll('.content');
// test in console to get 2 objects, can make use of it mainElements, contentElements

// Interaction
for(let i = 0; i < mainElements.length; i++) {
// console.log(mainElements[i]);
  mainElements[i].addEventListener('click', function(){
    // console.log(mainElements[i]);
    // console.log(mainElements[i].nextElementSibling);
    // console.log(mainElements[i].nextElementSibling.classList.toggle('active'));
    mainElements[i].nextElementSibling.classList.toggle('active')
  })
}