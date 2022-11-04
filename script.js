let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const now = new Date();
const hour = now.getHours();

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
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id,main} = weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like+0);

                    if(id<300 && id>200)
                    {
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
                        {
                            tempicon.src="./icons/cloud-sun-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-cloud-icon.svg"
                        }
                    }
                    else if(id==800)
                    {
                        if(hour > 8 && hour < 4)
                        {
                            tempicon.src="./icons/sun-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-icon.svg" 
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
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    loc.textContent = name;
                    climate.textContent=main;
                    tempvalue.textContent = Math.round(feels_like+0);

                    if(id<300 && id>200)
                    {
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
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
                        if(hour > 8 && hour < 4)
                        {
                            tempicon.src="./icons/cloud-sun-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-cloud-icon.svg"
                        }
                    }
                    else if(id==800)
                    {
                        if(hour > 8 && hour < 4)
                        {
                            tempicon.src="./icons/sun-icon.svg"
                        }
                        else
                        {
                            tempicon.src="./icons/night-icon.svg" 
                        }
                    }

                    console.log(data);
                })
        })
    }
})