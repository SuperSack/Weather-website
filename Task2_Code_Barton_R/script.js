let weather ={
    "apiKey": "0ec023cda580faf1f85b38ec7416d270",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const{ name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
         "https://openweathermap.org/img/wn/" + icon + ".png"
         document.querySelector(".description").innerText = description;
         document.querySelector(".temp").innerText = temp + "°C";
         document.querySelector(".humidity").innerText = "humidity: " + humidity + "%";
         document.querySelector(".wind").innerText =
          "Wind speed: " + speed + "mph";
          document.querySelector(".weather").classList.remove("loading");
          document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();

})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("London")

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let humidity = document.getElementById("humidity")
  let wind = document.getElementById("wind")

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "0ec023cda580faf1f85b38ec7416d270";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "°C";
        location.innerHTML =
          "Weather in " + data.name;
        description.innerHTML = data.weather[0].main;
        humidity.innerHTML = "humidity: " + data.main.humidity + "%";
        wind.innerHTML = "Wind speed: " + data.wind.speed + "mph";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.name +"')"
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();