"use strict";

//*==========> Weather-API'S <==========
//! Today Variables
const dayName = document.getElementById("dayName");
const dayNumber = document.getElementById("dayNumber");
const todayMonthCity = document.getElementById("todayMonthCity");
const thisYear = document.getElementById("year");
const todayLocation = document.getElementById("todayLocation");
const todayTemperature = document.getElementById("todayTemperature");
const todayConditionImg = document.getElementById("todayConditionImg");
const todayText = document.getElementById("todayText");
const todayHumidity = document.getElementById("todayHumidity");
const todayWind = document.getElementById("todayWind");
const todayCompass = document.getElementById("todayCompass");
//! Tomorrow Variables
const tomorrowdayName = document.getElementById("tomorrowdayName");
const tomorrowConditionImg = document.getElementById("tomorrowConditionImg");
const tomorrowMaxTemp = document.getElementById("tomorrowMaxTemp");
const minTemp = document.querySelector(".minTemp");
const tomorrowText = document.getElementById("tomorrowText");
//! overmorrow Variables
const overmorrowName = document.getElementById("overmorrowName");
const overmorrowConditionImg = document.getElementById("overmorrowConditionImg");
const overmorrowMaxTemp = document.getElementById("overmorrowMaxTemp");
const overmorrowMinTemp = document.querySelector('.overmorrowMinTemp ');
const overmorrowText = document.getElementById("overmorrowText");

//! Search Input
const searchInput = document.getElementById("search");
const findBtn = document.querySelector(".find-btn");

const home = document.getElementById('home');
const contact = document.getElementById('contact');

//* navigator
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords);

  let mylatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  getWeatherData(`${mylatitude},${myLongitude}`);
});

//* getWeatherData
async function getWeatherData(query) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=8536f016c5d24ce3b92140656241112`
    );
    let data = await response.json();
    console.log(data);
    displayWeatherData(data);
    displayTomorrowData(data);
    displayOvermorrow(data);
  } catch (error) {
    console.log("There is an error");
  }
}

//* displayWeatherData
function displayWeatherData(data) {
  let todayDate = data.current.last_updated; // 2024-12-15 2.15
  console.log(todayDate);

  let myDateName = new Date(todayDate);
  console.log(myDateName);

  let todayName = myDateName.toLocaleString("en-us", { weekday: "long" });
  dayName.innerHTML = todayName;

  let month = myDateName.toLocaleString("en-us", { month: "long" });
  console.log(month);

  let dayOfMonth = myDateName.getDate();
  console.log(dayOfMonth);

  let year = myDateName.getFullYear();
  console.log(year);

  dayNumber.innerHTML = dayOfMonth;
  todayMonthCity.innerHTML = month;
  thisYear.innerHTML = year;

  todayLocation.innerHTML = `${data.location.country}, ${data.location.name}`;
  todayTemperature.innerHTML = data.current.temp_c + " <sup>o</sup>C";
  todayText.innerHTML = data.current.condition.text;

  let currentImg = data.current.condition.icon;
  let currentSrc = `https:${currentImg}`;
  todayConditionImg.setAttribute("src", currentSrc);

  todayHumidity.innerHTML = `${data.current.humidity} %`;
  todayWind.innerHTML = `${data.current.wind_kph} km/h`;
  todayCompass.innerHTML = data.current.wind_dir;
}

function displayTomorrowData(data) {
  // let tomorrowDate = data.forecast.forecastday[1].date;
  // console.log(tomorrowDate);

  // let myDateName = new Date(tomorrowDate);
  // console.log(myDateName);

  // let tomorrowDayName = myDateName.toLocaleString('en-us', {weekday:'long'});
  // tomorrowdayName.innerHTML = tomorrowDayName;

  //*1st way to get the value from API
  // let tomorrowImg = data.forecast.forecastday[1].day.condition.icon; //& Get icon of tomorrow condition
  // let tomorrowImgSrc = `https:${tomorrowImg}`;
  // tomorrowConditionImg.setAttribute('src', tomorrowImgSrc);

  // tomorrowMaxTemp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C`;
  // minTemp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C`;
  // tomorrowText.innerHTML = data.forecast.forecastday[1].day.condition.text;

  //*2nd way to get the value from API through Destructuring
  let object = data.forecast.forecastday[1];
  let {
    date,
    day: { maxtemp_c },
    day: { mintemp_c },
    day: {
      condition: { text },
    },
    day: {
      condition: { icon },
    },
  } = object;

  //* The Date and the name of day in week in string
  let tomorrowDate = date;
  let myDateName = new Date(tomorrowDate);
  let tomorrowDayNames = myDateName.toLocaleString("en-us", { weekday: "long" });
  tomorrowdayName.innerHTML = tomorrowDayNames;

  //* Icon Of Condition Of Tomorrow Day
  let tomorrowImgSrc = `https:${icon}`;
  tomorrowConditionImg.setAttribute("src", tomorrowImgSrc);

  //* Max & Min Temperature And Condition Text
  tomorrowMaxTemp.innerHTML = `${maxtemp_c} <sup>o</sup>C`;
  minTemp.innerHTML = `${mintemp_c} <sup>o</sup>C`;
  tomorrowText.innerHTML = text;
}

function displayOvermorrow(data) {
  let object = data.forecast.forecastday[2];
  let {
    date,
    day: { maxtemp_c },
    day: { mintemp_c },
    day: {
      condition: { text },
    },
    day: {
      condition: { icon },
    },
  } = object;

  //* The Date and the name of day in week in string
  let overmorrowDate = date;
  let myDateName = new Date(overmorrowDate);
  let overmorrowDayName = myDateName.toLocaleString("en-us", {
    weekday: "long",
  });
  overmorrowName.innerHTML = overmorrowDayName;

  //* Icon Of Condition Of Tomorrow Day
  let overmorrowImgSrc = `https:${icon}`;
  overmorrowConditionImg.setAttribute("src", overmorrowImgSrc);

  //* Max & Min Temperature And Condition Text
  overmorrowMaxTemp.innerHTML = `${maxtemp_c} <sup>o</sup>C`;
  overmorrowMinTemp.innerHTML = `${mintemp_c} <sup>o</sup>C`;
  overmorrowText.innerHTML = text;
}

//* add event keyup search with keyboard
searchInput.addEventListener('keyup', function (e) {

    e.preventDefault();
    getWeatherData(searchInput.value);

})

home.addEventListener('click', function () {
  

  window.location.assign('index.html');

})

contact.addEventListener('click', function () {
  

  window.location.assign('contact.html');

})


















// //* add event search with Click
// findBtn.addEventListener('click', function (e) {

//     e.preventDefault();

//     //* check empty Value;
//     if (searchInput.value == '') {

//         alert('Please Enter City or Country Name')

//     } else {

//         getWeatherData(searchInput.value);

//     }
// })

//todo====================>Data-and-Time<====================
//*UTC==> coordinate universal time

// let dateNow = new Date(); //* current Date and Time

// console.log(dateNow);

// console.log(Date.now()); // the output will be time in miliseconds
// ==> thats the miliseconds form 1 jan 1970 till Now
// ==> 1000 miliseconds = 1 second

// let seconds = Date.now() / 1000; // Number Of Seconds
// console.log(`seconds ${seconds}`);

// let minutes = Math.trunc(seconds / 60);  // Number of Minutes
// console.log(`Minutes ${minutes}`);

// let hours = Math.trunc(minutes / 60);  // Number of Hours
// console.log(`Hours ${hours}`);

// let days = Math.trunc(hours / 24);  // Number of Days
// console.log(`Days ${days}`);

// let years = Math.trunc(days / 365);  // Number of Years
// console.log(`Years ${years}`);

//&===> Methods-Of-Date-And-Time
/*
--getTime() ==> Number Of Milliseconds
--getDate() ==> Day Of The Month
--getFullYear()
--getMonth() ==> zero based [jan = 0 index, february = 1 index]
--getDay() ==> Day Of The Week [it begans with sunday] which refer to 0 index
--getHours()
--getMinutes()
--getSeconds()

*/

// let dateNow = new Date();
// let birthday = new Date('march 17, 1998');
// let dateDiff = dateNow - birthday;
// console.log(dateDiff);
// console.log(dateDiff / 1000 / 60 / 60 / 24 / 365);

// console.log(dateNow);
// console.log(dateNow.getTime()); //* return the the stored time value in milliseconds since midnight, January 1, 1970 UTC
// console.log(dateNow.getDate());
// console.log(dateNow.getFullYear());
// console.log(dateNow.getMonth());
// console.log(dateNow.getDay());

// index             0          1          2          3           4          5         6
// let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Firday', 'Saturday'];

// let monthsArray = [
//     'January',  //==> 0 index
//     'February', //==> 1 index
//     'March',    //==> 2 index
//     'April',    //==> 3 index
//     'May',      //==> 4 index
//     'june',     //==> 5 index
//     'july',     //==> 6 index
//     'August',   //==> 7 index
//     'September',//==> 8 index
//     'October',  //==> 9 index
//     'Novmber',  //==> 10 index
//     'December'  //==> 11 index
// ];

// //* display the day;
// const day = new Date();
// const dayName = daysOfWeek[day.getDay()];

// //* display the date
// let month = day.toLocaleString('default', { month: 'long' });
// let date = day.getDate();
// let year = day.getFullYear();
