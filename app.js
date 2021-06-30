// import {apiKey} from 'config.js';
// import(apiKey);
// alert(apiKey);

// add that script inside file you want to use it
	// <script type="module" src="config.js"></script>

const btn = document.querySelector('button');
const placeCity = document.querySelector('.helper-text');
const temp = document.querySelector('h4');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const description = document.querySelector('.description');
const rain = document.querySelector('.rain');

const cityElement = document.querySelector('#city');
const time = document.querySelector('.time');


// set time
let timeObject = new Date();
let getHourz = timeObject.getHours();
let getMinutez = timeObject.getMinutes();

// 2 digits minute and hours
// if(getMinutez < 10) {
//   // getMinutez = '0' + 'getMinutez';
//   getMinutez = `0${getMinutez}`
//   console.log(getMinutez);
// }

(getHourz < 10) ? `0${getHourz}`: getHourz;
(getMinutez < 10) ? `0${getMinutez}`: getMinutez;


time.innerHTML = `${getHourz}:${getMinutez}`;


let api = 'http://api.openweathermap.org/data/2.5';
let units = 'units=metric';

btn.addEventListener('click', () => {
  // grab user input
  let city = cityElement.value;
  // console.log(city); 

  // small letter city

  // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=[YOUR API KEY HERE]`;
  // let myRequest = new Request(url);
  // const fetchResponsePromise = fetch(resource [, init])
  let url =`${api}/weather?q=${city}&${units}&appid=${apiKey}`

  
  // fetch temperature from url
  // fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=b95e3e61a17d2eadd3e525d8145db6e5')
  fetch(url)
  .then(function response(response){
  // grab 
  // console.log('hey');
  // console.log(response);
    return response.json(); 
  })
.then(function(myJson) {
  console.log(myJson);
  // console.log(JSON.stringify(myJson));
  //  console.log(typeof(myJson), typeof(JSON.stringify(myJson))) ; // object, string

// display city below input line/box
// console.log(myJson.city);
// console.log(myJson.city.name); 
// placeCity.innerHTML = myJson.city.name + ', ' + myJson.city.country;

console.log(myJson.name);
placeCity.innerHTML = `${myJson.name}, ${myJson.sys.country}`;


// display temperature on box
// console.log(myJson.list[0].main.temp);
temp.innerHTML = `${Math.round(myJson.main.temp)} &deg;`;
// temp.innerHTML = `${myJson.main.temp} &#8451;`;
high.innerHTML = `High ${myJson.main.temp_max} &deg;`;
low.innerHTML = `Low ${myJson.main.temp_min} &deg;`;

// rain.innerHTML = `Chances of rain in ${myJson.rain} `;
// for (const [key, value] of Object.entries(myJson.rain)) {
//   console.log(`${key}: ${value}`);
//   rain.innerHTML = `Chances of rain in ${key} is ${value*100}&#37;`;
// }

description.innerHTML = `There's ${myJson.weather[0].description}`;

// average temp 

// let pElem = document.createElement('p');
// pElem.textContent = 'This is a newly-added paragraph.';
// document.body.appendChild(pElem);

  // let myDate;
  // for(let i = 0; i < 10000000; i++) {
  //   let date = new Date();
  //   myDate = date;
  // }

  // console.log(myDate);

  })
})
  ;
