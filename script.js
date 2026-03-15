const apiKey = "YOUR_API_KEY";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");
const historyList = document.getElementById("history");

console.log("Script started");

searchBtn.addEventListener("click", () => {

let city = cityInput.value;

if(city === ""){
result.innerHTML = "Please enter a city name";
return;
}

getWeather(city);

});

async function getWeather(city){

console.log("Before fetch");

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try{

let response = await fetch(url);

console.log("After fetch");

if(!response.ok){
throw new Error("City not found");
}

let data = await response.json();

result.innerHTML =
`City: ${data.name}<br>
Temperature: ${data.main.temp} °C<br>
Weather: ${data.weather[0].main}`;

saveCity(city);

}
catch(error){

result.innerHTML = "Error: " + error.message;

}

}

function saveCity(city){

let cities = JSON.parse(localStorage.getItem("cities")) || [];

if(!cities.includes(city)){
cities.push(city);
}

localStorage.setItem("cities", JSON.stringify(cities));

loadHistory();

}

function loadHistory(){

historyList.innerHTML = "";

let cities = JSON.parse(localStorage.getItem("cities")) || [];

cities.forEach(city => {

let li = document.createElement("li");

li.textContent = city;

li.onclick = () => getWeather(city);

historyList.appendChild(li);

});

}

window.onload = loadHistory;