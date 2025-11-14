let input = document.querySelector("input")
let btn = document.querySelector(".input-icon i")
let cityName = document.querySelector(".location")
let temperature = document.querySelector(".weather-temp")
let condition = document.querySelector("#condition")
let wind = document.querySelector(".wind")
let humidity = document.querySelector(".humidity")
let realfeel = document.querySelector(".realfeel")
let uvindex = document.querySelector(".uv-index")
let uvindexlevel = document.querySelector(".uv-valuelevel")
let pressure = document.querySelector(".pressure")
let cor = document.querySelector(".c-o-r")
let up = document.querySelector(".up")
let down = document.querySelector(".down")
let sunrise = document.querySelector(".sun-rise")
let sunset = document.querySelector(".sun-set")
let moonrise = document.querySelector(".moon-rise")
let moonset = document.querySelector(".moon-set")
let weatherIcon = document.querySelector(".weather-icon");
let weathermood = document.querySelector(".weather-mood");
let date = document.querySelector(".date");
let day = document.querySelector(".time");

let apikey1 = `ebd5e6bbdb060fd56b1a9c4034b3556e`
let apikey2 = `14234ba86cd34c3a876d590f11c55f79`
// let apikey3 = `ea570d9110cf3e3e9b53d8ed41131061`
let show;
btn.addEventListener("click", () => {
  let city = input.value.toLowerCase().trim()
  let apicall1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey1}`
  fetch(apicall1)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found 😢");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      let latitude = data.coord.lat;
      let longitude = data.coord.lon;
      cityName.innerText = `${data.name}`;
      let managetemp=data.main.temp - 273.15;
      temperature.innerText = `${managetemp.toFixed(0)}°C`;
      wind.innerText = `${data.wind.speed} km/h`;
      humidity.innerText = `${data.main.humidity}%`;
      realfeel.innerText = `${data.main.feels_like}°C`;
      up.innerText = `Max: ${data.main.temp_max}°C`;
      down.innerText = `Min: ${data.main.temp_min}°C`;
      let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      sunrise.innerText = sunriseTime;
      sunset.innerText = sunsetTime;
      pressure.innerText = `${data.main.pressure} mb`;
      let iconCode = data.weather[0].icon;
      let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.innerHTML = `<img src="${iconURL}" alt="${data.weather[0].description}">`
      weathermood.innerText = data.weather[0].main
      let apicall2 = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${apikey1}`
      let apicall3 = `https://api.ipgeolocation.io/astronomy?apiKey=${apikey2}&lat=${latitude}&long=${longitude}`
      let apicall4 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey1}&units=metric`
      return Promise.all([fetch(apicall2), fetch(apicall3), fetch(apicall4)])
    })
    .then(async ([res1, res2,res3]) => {
      if (!res1.ok) {
        throw new Error("Error1");
      }
      if (!res2.ok) {
        throw new Error("Error2");
      }
      if (!res3.ok) {
        throw new Error("Error3");
      }
      let [data2, datta2,datta3] = await Promise.all([res1.json(), res2.json(),res3.json()]);
      console.log(datta3);
      let chancerain=datta3.list[0].pop
      cor.innerText=`${chancerain}%`
      
      date.innerText = datta2.date
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let dateaccess = new Date(`${datta2.date}`)
      let dayaccess = dateaccess.getDay()
      let timesplit=datta2.current_time.split(":")
      let timesplit0=timesplit[0]
      let timesplit1=timesplit[1]
      let timesplits=[timesplit0,timesplit1]
      let timesplitjoin=timesplits.join(":")
      let period1;
       if(timesplit0 >= 12) {
        period1= "PM" ;
       }else{
        period1= "AM";
       }
      day.innerText = `${days[dayaccess]},${timesplitjoin} ${period1}`;
      let moonvalue1=`${datta2.moonrise[0]}${datta2.moonrise[1]}`
      let moonvalue2=`${datta2.moonset[0]}${datta2.moonset[1]}`
      let period2;
       if(moonvalue1 >= 12||moonvalue2>=12) {
        period2= "PM" ;
       }else{
        period2= "AM";
       }
      let period3;
       if(moonvalue2>=12) {
        period3= "PM" ;
       }else{
        period3= "AM";
       }
      moonrise.innerText = `${datta2.moonrise} ${period2}`;
      moonset.innerText =`${datta2.moonset} ${period3}`
      
      
      uvindex.innerText = data2.value;
      let valuelevel;
      if (data2.value < 3) {
        valuelevel = "Low";
      }
      else if (data2.value < 6) {
        valuelevel = "Moderate";
      }
      else if (data2.value < 8) {
        valuelevel = "High";
      }
      else if (data2.value < 11) {
        valuelevel = "Very High";
      }
      else {
        valuelevel = "Extreme";
      }
      uvindexlevel.innerText = valuelevel
    })
    .catch((err) => {
      show = err
      cityName.innerText = err;
      temperature.innerText = "-°C";
      wind.innerText = "--";
      humidity.innerText = "--";
      realfeel.innerText = "--";
      console.log(err);
    });

})





