const btn = document.querySelector('button');
const placeCity = document.querySelector('.helper-text');
const temp = document.querySelector('h4');

const cityElement = document.querySelector('#city');

let api = 'http://api.openweathermap.org/data/2.5';
let units = 'units=metric';
let apiKey = 'b95e3e61a17d2eadd3e525d8145db6e5'

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
// temp.innerHTML = `${myJson.main.temp} &deg; C`;
temp.innerHTML = `${myJson.main.temp} &#8451;`;


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