// .......................java srcipt part..........................//


// DETAILS OF TIME ,DATE AND MONTH

const timeEl=document.getElementById('time');
const dateEl=document.getElementById('date');

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

setInterval(()=>{
    const time=new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hoursIn12Format=hour >=13 ? hour %12:hour
    const minutes=time.getMinutes();
    const ampm=hour >=12 ? 'PM' :'AM'
    timeEl.innerHTML=hoursIn12Format + ':' + minutes+ ' '+`<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML=days[day]+', '+ date+ ' '+ months[month]


},1000);

// FETCHING WEATHER API
let weather={
    "apiKey":"1f7f6efcef9f8fd73e39f2e04338d19e",
    fetchWeather:function (city){
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "&units=metric&APPID="
         + this.apiKey
         ) 
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather:function(data){
        const{ name} =data;
        const { icon,description}=data.weather[0];
        const { temp,humidity}=data.main;
        const { speed}=data.wind;

     
        document.querySelector(".city").innerText= " Weather in " + name;
        document.querySelector(".icon").src="http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        document.querySelector(".description").innerText=description;
        document.querySelector(".temp").innerText=(Math.round(temp)) + "°C" ;
        document.querySelector(".humidity").innerText="Humidity: " + humidity +"%";
        document.querySelector(".wind").innerText="Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
       document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?city/ " +name + "')"



    },
    search:function(){
       this.fetchWeather( document.querySelector(".search-bar").value)
    }
};
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();

});
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        weather.search();

    }

});
// DEFAULT WEATHER
weather.fetchWeather("delhi");