let loc = document.getElementById("state");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let hum =document.getElementById("humi");
let win = document.getElementById("wind");
let con = document.getElementById("coun");
let rise = document.getElementById("sunrise");
let set = document.getElementById("sunset");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const now = new Date();
var hour = now.getHours();
var min = now.getMinutes();
var ampm = hour>=12 ? "PM" : "AM";
min = min<10 ? '0'+min : min;

             

searchButton.addEventListener('click',(e)=>
{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';

});

const getWeather = async(city)=>
{
    
    
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`);

        const weatherData = await response.json();
        console.log(weatherData);

        const{name}=weatherData;
        const{country}=weatherData.sys;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        const{humidity}=weatherData.main;
        const{speed}=weatherData.wind;

        loc.textContent = name;
        con.textContent = country;
        climate.textContent=main;
        tempvalue.textContent = feels_like;
        hum.textContent = "Humidity : "+humidity+"%";
        win.textContent = "Wind Speed : "+speed +" km/h";
        

        if(id<300 && id>200)
        {
            if(hour >= 4 && hour <= 20)
            {
                tempicon.src="./icons/thunderstrom-icon.svg"
            }
            else
            {
                tempicon.src="./icons/night-rain-lightning-icon.svg"
            }
        }
        else if(id<400 && id>300)
        {
            if(hour >= 4 && hour <= 20)
            {
                tempicon.src="./icons/cloud-icon.svg"
            }
            else
            {
                tempicon.src="./icons/night-cloud-icon.svg"
            }
        }
        else if(id<600 && id>500)
        {
            if(hour >= 4 && hour <= 20)
            {
                tempicon.src="./icons/rain-icon.svg"
            }
            else
            {
                tempicon.src="./icons/night-rain-icon.svg"
            }
        }
        else if(id<700 && id>600)
        {
            if(hour >= 4 && hour <= 20)
            {
                tempicon.src="./icons/snow-icon.svg"
            }
            else
            {
                tempicon.src="./icons/snowman-icon.svg"
            }
        }
        else if(id<800 && id>700)
        {
            if(hour >= 4 && hour <= 20)
            {
                tempicon.src="./icons/day-cloud-fog-icon.svg"
            }
            else
            {
                tempicon.src="./icons/night-cloud-fog-icon.svg"
            }
        }
        else if(id==741 && id == 701)
        {
            
            {
                tempicon.src="./icons/clous-fog-icon.svg"
            }
        }
        else if(id==800)
        {
            if(hour >= 4 && hour < 20)
            {
                tempicon.src="./icons/sun-icon.svg"
            }
            else
            {
                tempicon.src="./icons/night-icon.svg" 
            }
        }
        else if(id<900 && id>800)
        {
            if(hour >= 4 && hour <= 20)
            {
                tempicon.src="./icons/cloud-sun-icon.svg"
            }
            else
            {
                tempicon.src="./icons/night-cloud-icon.svg"
            }
        }           

    }
    catch(error)
    {
        alert('City not found');
    }
};


window.addEventListener("load" ,()=>
{
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`

            fetch(api).then((response)=>
            {
                return response.json();
            })
            .then(data=>
                {
                    const{name}=data;
                    const{country}=data.sys;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];
                    const{humidity}=data.main;
                    const{speed}=data.wind;
                    const{sunrise}=data.sys;
                    const{sunset}=data.sys;

                    loc.textContent = name;
                    con.textContent = country;
                    climate.textContent=main;
                    tempvalue.textContent =feels_like;
                    hum.textContent = "Humidity : "+humidity+"%";
                    win.textContent = "Wind Speed : "+speed +" km/h";
                    rise.textContent = "Sun-rise : "+window.moment(data.sys.sunrise*1000).format('hh:mm a');
                    set.textContent = "Sun-set : "+ window.moment(data.sys.sunset*1000).format('hh:mm a');
                    

                    if(id<300 && id>200)
                    {
                        if(hour >= 4 && hour <= 20)
                        {
                            tempicon.src="./icons/thunderstrom-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-rain-lightning-icon.svg"
                        }
                    }
                    else if(id<400 && id>300)
                    {
                        if(hour >= 4 && hour <= 20)
                        {
                            tempicon.src="./icons/cloud-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-cloud-icon.svg"
                        }
                    }
                    else if(id<600 && id>500)
                    {
                        if(hour >= 4 && hour <= 20)
                        {
                            tempicon.src="./icons/rain-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-rain-icon.svg"
                        }
                    }
                    else if(id<700 && id>600)
                    {
                        if(hour >= 4 && hour <= 20)
                        {
                            tempicon.src="./icons/snow-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/snowman-icon.svg"
                        }
                    }
                    else if(id<800 && id>700)
                    {
                        if(hour >= 4 && hour <= 20)
                        {
                            tempicon.src="./icons/day-cloud-fog-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-cloud-fog-icon.svg"
                        }
                    }
                    else if(id==741 && id == 701)
                    {
                        
                        {
                            tempicon.src="./icons/clous-fog-icon.svg"
                        }
                    }
                    else if(id==800)
                    {
                        if(hour >= 4 && hour < 20)
                        {
                            tempicon.src="./icons/sun-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-icon.svg" 
                        }
                    }
                    else if(id<900 && id>800)
                    {
                        if(hour >= 4 && hour <= 20)
                        {
                            tempicon.src="./icons/cloud-sun-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-cloud-icon.svg"
                        }
                    }

                    console.log(data);
                })
        })
    }
})