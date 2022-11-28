let loc = document.getElementById("state");
let con = document.getElementById("coun");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let date = document.getElementById("date");

let hum = document.getElementById("humi");
let win = document.getElementById("wind");
let air = document.getElementById("air");
let rise = document.getElementById("sunrise");
let set = document.getElementById("sunset");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let tem1 = document.getElementById("tem1");
let tem2 = document.getElementById("tem2");
let tem3 = document.getElementById("tem3");
let tem4 = document.getElementById("tem4");
let tem5 = document.getElementById("tem5");
let tem6 = document.getElementById("tem6");

let i1 = document.getElementById("i1");
let i2 = document.getElementById("i2");
let i3 = document.getElementById("i3");
let i4 = document.getElementById("i4");
let i5 = document.getElementById("i5");
let i6 = document.getElementById("i6");

let a1 = document.getElementById("a1");
let a2 = document.getElementById("a2");
let a3 = document.getElementById("a3");
let a4 = document.getElementById("a4");
let a5 = document.getElementById("a5");
let a6 = document.getElementById("a6");

let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");
let d3 = document.getElementById("d3");
let d4 = document.getElementById("d4");
let d5 = document.getElementById("d5");
let d6 = document.getElementById("d6");

const now = new Date();
var hour = now.getHours();
var min = now.getMinutes();
var ampm = hour >= 12 ? "PM" : "AM";
min = min < 10 ? '0' + min : min;

//search button
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

window.onload = function () {
    document.onkeydown = function (e) {
        return (e.which || e.keyCode) != 116;
    };
}

//Fetch weather of the given location
const getWeather = async (city) => {


    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`);

        const weatherData = await response.json();
        console.log(weatherData);

        const qu = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=ba98deab6ce9cd74af9735fb0625c520`);
        const da = await qu.json();
        console.log(da);

        if (da.list[0].main.aqi == 1) {
            air.textContent = "Air Quality: GOOD [" + da.list[0].main.aqi + "]";
        }
        if (da.list[0].main.aqi == 2) {
            air.textContent = "Air Quality: FAIR [" + da.list[0].main.aqi + "]";
        }
        if (da.list[0].main.aqi == 3) {
            air.textContent = "Air Quality: MODERATE [" + da.list[0].main.aqi + "]";
        }
        if (da.list[0].main.aqi == 4) {
            air.textContent = "Air Quality: POOR [" + da.list[0].main.aqi + "]";
        }
        if (da.list[0].main.aqi == 5) {
            air.textContent = "Air Quality: VERY POOR [" + da.list[0].main.aqi + "]";
        }


        const { name } = weatherData;
        const { country } = weatherData.sys;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        const { humidity } = weatherData.main;
        const { speed } = weatherData.wind;

        loc.textContent = name;
        con.textContent = country;
        climate.textContent = main;
        tempvalue.textContent = feels_like + "°C";
        date.textContent = window.moment(weatherData.dt * 1000).utc().format('ddd | MMM D | hh:mm A [(UTC)] ');
        hum.textContent = "Humidity : " + humidity + "%";
        win.textContent = "Wind Speed : " + speed + " km/h";
        rise.textContent = "Sun-rise : " + window.moment(weatherData.sys.sunrise * 1000).utc().format('hh:mm a [(UTC)]');
        set.textContent = "Sun-set : " + window.moment(weatherData.sys.sunset * 1000).utc().format('hh:mm a [(UTC)]');



        if (id < 300 && id > 200) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/strom.png"
            }
            else {
                tempicon.src = "./icons/strom.png"
            }
        }
        else if (id < 400 && id > 300) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/rain.png"
            }
            else {
                tempicon.src = "./icons/rain.png"
            }
        }
        else if (id < 600 && id > 500) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/rainy-day.png"
            }
            else {
                tempicon.src = "./icons/night-rain.png"
            }
        }
        else if (id < 700 && id > 600) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/snow.png"
            }
            else {
                tempicon.src = "./icons/snow.png"
            }
        }
        else if (id < 800 && id > 700) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/haze.png"
            }
            else {
                tempicon.src = "./icons/night-fog.png"
            }
        }
        else if (id == 741 && id == 701) {

            {
                tempicon.src = "./icons/fog.png"
            }
        }
        else if (id == 800) {
            if (hour >= 4 && hour < 20) {
                tempicon.src = "./icons/sun.png"
            }
            else {
                tempicon.src = "./icons/moon.png"
            }
        }
        else if (id == 801) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/cloudy-day.png"
            }
            else {
                tempicon.src = "./icons/night-cloud.png"
            }
        } else if (id < 900 && id > 801) {
            if (hour >= 4 && hour <= 20) {
                tempicon.src = "./icons/clouds.png"
            }
            else {
                tempicon.src = "./icons/clouds.png"
            }
        }


        //weather forecasting
        const key = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=,hourly,minutely&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`);

        const d = await key.json();
        console.log(d);

        //Day
        d1.textContent = window.moment(d.daily[1].dt * 1000).format('ddd');
        d2.textContent = window.moment(d.daily[2].dt * 1000).format('ddd');
        d3.textContent = window.moment(d.daily[3].dt * 1000).format('ddd');
        d4.textContent = window.moment(d.daily[4].dt * 1000).format('ddd');
        d5.textContent = window.moment(d.daily[5].dt * 1000).format('ddd');
        d6.textContent = window.moment(d.daily[6].dt * 1000).format('ddd');

        //day 1

        if (d.daily[1].weather[0].id < 300 && d.daily[1].weather[0].id > 200) {
            i1.src = "./icons/strom.png"
        } else if (d.daily[1].weather[0].id < 400 && d.daily[1].weather[0].id > 300) {
            i1.src = "./icons/rain.png"
        } else if (d.daily[1].weather[0].id < 600 && d.daily[1].weather[0].id > 500) {
            i1.src = "./icons/rainy-day.png"
        } else if (d.daily[1].weather[0].id < 700 && d.daily[1].weather[0].id > 600) {
            i1.src = "./icons/snow.png"
        } else if (d.daily[1].weather[0].id < 800 && d.daily[1].weather[0].id > 700) {
            i1.src = "./icons/haze.png"
        } else if (d.daily[1].weather[0].id < 900 && d.daily[1].weather[0].id > 800) {
            i1.src = "./icons/clouds.png"
        } else if (d.daily[1].weather[0].id == 800) {
            i1.src = "./icons/sun.png"
        }

        //day 2
        if (d.daily[2].weather[0].id < 300 && d.daily[2].weather[0].id > 200) {
            i2.src = "./icons/strom.png"
        } else if (d.daily[2].weather[0].id < 400 && d.daily[2].weather[0].id > 300) {
            i2.src = "./icons/rain.png"
        } else if (d.daily[2].weather[0].id < 600 && d.daily[2].weather[0].id > 500) {
            i2.src = "./icons/rainy-day.png"
        } else if (d.daily[2].weather[0].id < 700 && d.daily[2].weather[0].id > 600) {
            i2.src = "./icons/snow.png"
        } else if (d.daily[2].weather[0].id < 800 && d.daily[2].weather[0].id > 700) {
            i2.src = "./icons/haze.png"
        } else if (d.daily[2].weather[0].id < 900 && d.daily[2].weather[0].id > 800) {
            i2.src = "./icons/clouds.png"
        } else if (d.daily[2].weather[0].id == 800) {
            i2.src = "./icons/sun.png"
        }

        //day 3
        if (d.daily[3].weather[0].id < 300 && d.daily[3].weather[0].id > 200) {
            i3.src = "./icons/strom.png"
        } else if (d.daily[3].weather[0].id < 400 && d.daily[3].weather[0].id > 300) {
            i3.src = "./icons/rain.png"
        } else if (d.daily[3].weather[0].id < 600 && d.daily[3].weather[0].id > 500) {
            i3.src = "./icons/rainy-day.png"
        } else if (d.daily[3].weather[0].id < 700 && d.daily[3].weather[0].id > 600) {
            i3.src = "./icons/snow.png"
        } else if (d.daily[3].weather[0].id < 800 && d.daily[3].weather[0].id > 700) {
            i3.src = "./icons/haze.png"
        } else if (d.daily[3].weather[0].id < 900 && d.daily[3].weather[0].id > 800) {
            i3.src = "./icons/clouds.png"
        } else if (d.daily[3].weather[0].id == 800) {
            i3.src = "./icons/sun.png"
        }

        //day 4
        if (d.daily[4].weather[0].id < 300 && d.daily[4].weather[0].id > 200) {
            i4.src = "./icons/strom.png"
        } else if (d.daily[4].weather[0].id < 400 && d.daily[4].weather[0].id > 300) {
            i4.src = "./icons/rain.png"
        } else if (d.daily[4].weather[0].id < 600 && d.daily[4].weather[0].id > 500) {
            i4.src = "./icons/rainy-day.png"
        } else if (d.daily[4].weather[0].id < 700 && d.daily[4].weather[0].id > 600) {
            i4.src = "./icons/snow.png"
        } else if (d.daily[4].weather[0].id < 800 && d.daily[4].weather[0].id > 700) {
            i4.src = "./icons/haze.png"
        } else if (d.daily[4].weather[0].id < 900 && d.daily[4].weather[0].id > 800) {
            i4.src = "./icons/clouds.png"
        } else if (d.daily[4].weather[0].id == 800) {
            i4.src = "./icons/sun.png"
        }

        //day 5

        if (d.daily[5].weather[0].id < 300 && d.daily[5].weather[0].id > 200) {
            i5.src = "./icons/strom.png"
        } else if (d.daily[5].weather[0].id < 400 && d.daily[5].weather[0].id > 300) {
            i5.src = "./icons/rain.png"
        } else if (d.daily[5].weather[0].id < 600 && d.daily[5].weather[0].id > 500) {
            i5.src = "./icons/rainy-day.png"
        } else if (d.daily[5].weather[0].id < 700 && d.daily[5].weather[0].id > 600) {
            i5.src = "./icons/snow.png"
        } else if (d.daily[5].weather[0].id < 800 && d.daily[5].weather[0].id > 700) {
            i5.src = "./icons/haze.png"
        } else if (d.daily[5].weather[0].id < 900 && d.daily[5].weather[0].id > 800) {
            i5.src = "./icons/clouds.png"
        } else if (d.daily[5].weather[0].id == 800) {
            i5.src = "./icons/sun.png"
        }
        //day 6
        if (d.daily[6].weather[0].id < 300 && d.daily[6].weather[0].id > 200) {
            i6.src = "./icons/strom.png"
        } else if (d.daily[6].weather[0].id < 400 && d.daily[6].weather[0].id > 300) {
            i6.src = "./icons/rain.png"
        } else if (d.daily[6].weather[0].id < 600 && d.daily[6].weather[0].id > 500) {
            i6.src = "./icons/rainy-day.png"
        } else if (d.daily[6].weather[0].id < 700 && d.daily[6].weather[0].id > 600) {
            i6.src = "./icons/snow.png"
        } else if (d.daily[6].weather[0].id < 800 && d.daily[6].weather[0].id > 700) {
            i6.src = "./icons/haze.png"
        } else if (d.daily[6].weather[0].id < 900 && d.daily[6].weather[0].id > 800) {
            i6.src = "./icons/clouds.png"
        } else if (d.daily[6].weather[0].id == 800) {
            i6.src = "./icons/sun.png"
        }

        //Daily Temperature

        tem1.textContent = d.daily[1].temp.day + "\n°C";
        tem2.textContent = d.daily[2].temp.day + "\n°C";
        tem3.textContent = d.daily[3].temp.day + "\n°C";
        tem4.textContent = d.daily[4].temp.day + "\n°C";
        tem5.textContent = d.daily[5].temp.day + "\n°C";
        tem6.textContent = d.daily[6].temp.day + "\n°C";


        //Air Quality forecasting
        const qua = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=ba98deab6ce9cd74af9735fb0625c520`);
        const daa = await qua.json();
        console.log(daa);

        //day 1
        if (daa.list[3].main.aqi == 1) {
            a1.textContent = "AQ  \nG [" + daa.list[3].main.aqi + "]";
        }
        if (daa.list[3].main.aqi == 2) {
            a1.textContent = "AQ  \nF [" + daa.list[3].main.aqi + "]";
        }
        if (daa.list[3].main.aqi == 3) {
            a1.textContent = "AQ  \nM [" + daa.list[3].main.aqi + "]";
        }
        if (daa.list[3].main.aqi == 4) {
            a1.textContent = "AQ  \nP [" + daa.list[3].main.aqi + "]";
        }
        if (daa.list[3].main.aqi == 5) {
            a1.textContent = "AQ  \nVP [" + daa.list[3].main.aqi + "]";
        }

        //day 2
        if (daa.list[4].main.aqi == 1) {
            a2.textContent = "AQ  \nG [" + daa.list[4].main.aqi + "]";
        }
        if (daa.list[4].main.aqi == 2) {
            a2.textContent = "AQ  \nF [" + daa.list[4].main.aqi + "]";
        }
        if (daa.list[4].main.aqi == 3) {
            a2.textContent = "AQ  \nM [" + daa.list[4].main.aqi + "]";
        }
        if (daa.list[4].main.aqi == 4) {
            a2.textContent = "AQ  \nP [" + daa.list[4].main.aqi + "]";
        }
        if (daa.list[4].main.aqi == 5) {
            a2.textContent = "AQ  \nVP [" + daa.list[4].main.aqi + "]";
        }

        //day 3
        if (daa.list[5].main.aqi == 1) {
            a3.textContent = "AQ  \nG [" + daa.list[5].main.aqi + "]";
        }
        if (daa.list[5].main.aqi == 2) {
            a3.textContent = "AQ  \nF [" + daa.list[5].main.aqi + "]";
        }
        if (daa.list[5].main.aqi == 3) {
            a3.textContent = "AQ  \nM [" + daa.list[5].main.aqi + "]";
        }
        if (daa.list[5].main.aqi == 4) {
            a3.textContent = "AQ  \nP [" + daa.list[5].main.aqi + "]";
        }
        if (daa.list[5].main.aqi == 5) {
            a3.textContent = "AQ  \nVP [" + daa.list[5].main.aqi + "]";
        }

        //day 4
        if (daa.list[6].main.aqi == 1) {
            a4.textContent = "AQ  \nG [" + daa.list[6].main.aqi + "]";
        }
        if (daa.list[6].main.aqi == 2) {
            a4.textContent = "AQ  \nF [" + daa.list[6].main.aqi + "]";
        }
        if (daa.list[6].main.aqi == 3) {
            a4.textContent = "AQ  \nM [" + daa.list[6].main.aqi + "]";
        }
        if (daa.list[6].main.aqi == 4) {
            a4.textContent = "AQ  \nP [" + daa.list[6].main.aqi + "]";
        }
        if (daa.list[6].main.aqi == 5) {
            a4.textContent = "AQ  \nVP [" + daa.list[6].main.aqi + "]";
        }

        //day 5
        if (daa.list[7].main.aqi == 1) {
            a5.textContent = "AQ  \nG [" + daa.list[7].main.aqi + "]";
        }
        if (daa.list[7].main.aqi == 2) {
            a5.textContent = "AQ  \nF [" + daa.list[7].main.aqi + "]";
        }
        if (daa.list[7].main.aqi == 3) {
            a5.textContent = "AQ  \nM [" + daa.list[7].main.aqi + "]";
        }
        if (daa.list[7].main.aqi == 4) {
            a5.textContent = "AQ  \nP [" + daa.list[7].main.aqi + "]";
        }
        if (daa.list[7].main.aqi == 5) {
            a5.textContent = "AQ  \nVP [" + daa.list[7].main.aqi + "]";
        }

        //day 6
        if (daa.list[8].main.aqi == 1) {
            a6.textContent = "AQ  \nG [" + daa.list[8].main.aqi + "]";
        }
        if (daa.list[8].main.aqi == 2) {
            a6.textContent = "AQ  \nF [" + daa.list[8].main.aqi + "]";
        }
        if (daa.list[8].main.aqi == 3) {
            a6.textContent = "AQ  \nM [" + daa.list[8].main.aqi + "]";
        }
        if (daa.list[8].main.aqi == 4) {
            a6.textContent = "AQ  \nP [" + daa.list[8].main.aqi + "]";
        }
        if (daa.list[8].main.aqi == 5) {
            a6.textContent = "AQ  \nVP [" + daa.list[8].main.aqi + "]";
        }

    }
    catch (error) {
        alert('City not found');
    }
};


//fetch weather of current location
window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`

            fetch(api).then((response) => {
                return response.json();
            })
                .then(data => {

                    let lati = position.coords.latitude;
                    let longi = position.coords.longitude;

                    const qua = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lati}&lon=${longi}&appid=ba98deab6ce9cd74af9735fb0625c520`

                    fetch(qua).then((response) => {
                        return response.json();
                    })
                        .then(d => {

                            if (d.list[0].main.aqi == 1) {
                                air.textContent = "Air Quality: GOOD [" + d.list[0].main.aqi + "]";
                            }
                            if (d.list[0].main.aqi == 2) {
                                air.textContent = "Air Quality: FAIR [" + d.list[0].main.aqi + "]";
                            }
                            if (d.list[0].main.aqi == 3) {
                                air.textContent = "Air Quality: MODERATE [" + d.list[0].main.aqi + "]";
                            }
                            if (d.list[0].main.aqi == 4) {
                                air.textContent = "Air Quality: POOR [" + d.list[0].main.aqi + "]";
                            }
                            if (d.list[0].main.aqi == 5) {
                                air.textContent = "Air Quality: VERY POOR [" + d.list[0].main.aqi + "]";
                            }

                            console.log(d);
                        })

                    const { name } = data;
                    const { country } = data.sys;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];
                    const { humidity } = data.main;
                    const { speed } = data.wind;


                    loc.textContent = name;
                    con.textContent = country;
                    climate.textContent = main;
                    tempvalue.textContent = feels_like + "°C";
                    hum.textContent = "Humidity : " + humidity + "%";
                    win.textContent = "Wind Speed : " + speed + " km/h";
                    rise.textContent = "Sun-rise : " + window.moment(data.sys.sunrise * 1000).format('hh:mm a');
                    set.textContent = "Sun-set : " + window.moment(data.sys.sunset * 1000).format('hh:mm a');


                    if (id < 300 && id > 200) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/strom.png"
                        }
                        else {
                            tempicon.src = "./icons/strom.png"
                        }
                    }
                    else if (id < 400 && id > 300) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/rain.png"
                        }
                        else {
                            tempicon.src = "./icons/rain.png"
                        }
                    }
                    else if (id < 600 && id > 500) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/rainy-day.png"
                        }
                        else {
                            tempicon.src = "./icons/night-rain.png"
                        }
                    }
                    else if (id < 700 && id > 600) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/snow.png"
                        }
                        else {
                            tempicon.src = "./icons/snow.png"
                        }
                    }
                    else if (id < 800 && id > 700) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/haze.png"
                        }
                        else {
                            tempicon.src = "./icons/night-fog.png"
                        }
                    }
                    else if (id == 741 && id == 701) {

                        {
                            tempicon.src = "./icons/fog.png"
                        }
                    }
                    else if (id == 800) {
                        if (hour >= 4 && hour < 20) {
                            tempicon.src = "./icons/sun.png"
                        }
                        else {
                            tempicon.src = "./icons/moon.png"
                        }
                    }
                    else if (id == 801) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/cloudy-day.png"
                        }
                        else {
                            tempicon.src = "./icons/night-cloud.png"
                        }
                    } else if (id < 900 && id > 801) {
                        if (hour >= 4 && hour <= 20) {
                            tempicon.src = "./icons/clouds.png"
                        }
                        else {
                            tempicon.src = "./icons/clouds.png"
                        }
                    }

                    console.log(data);



                    //weather forecasting

                    const key = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${longi}&exclude=,hourly,minutely&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`

                    fetch(key).then((response) => {
                        return response.json();
                    })
                        .then(dd => {
                            //Day
                            d1.textContent = window.moment(dd.daily[1].dt * 1000).format('ddd');
                            d2.textContent = window.moment(dd.daily[2].dt * 1000).format('ddd');
                            d3.textContent = window.moment(dd.daily[3].dt * 1000).format('ddd');
                            d4.textContent = window.moment(dd.daily[4].dt * 1000).format('ddd');
                            d5.textContent = window.moment(dd.daily[5].dt * 1000).format('ddd');
                            d6.textContent = window.moment(dd.daily[6].dt * 1000).format('ddd');


                            //day 1

                            if (dd.daily[1].weather[0].id < 300 && dd.daily[1].weather[0].id > 200) {
                                i1.src = "./icons/strom.png"
                            } else if (dd.daily[1].weather[0].id < 400 && dd.daily[1].weather[0].id > 300) {
                                i1.src = "./icons/rain.png"
                            } else if (dd.daily[1].weather[0].id < 600 && dd.daily[1].weather[0].id > 500) {
                                i1.src = "./icons/rainy-day.png"
                            } else if (dd.daily[1].weather[0].id < 700 && dd.daily[1].weather[0].id > 600) {
                                i1.src = "./icons/snow.png"
                            } else if (dd.daily[1].weather[0].id < 800 && dd.daily[1].weather[0].id > 700) {
                                i1.src = "./icons/haze.png"
                            } else if (dd.daily[1].weather[0].id < 900 && dd.daily[1].weather[0].id > 800) {
                                i1.src = "./icons/clouds.png"
                            } else if (dd.daily[1].weather[0].id == 800) {
                                i1.src = "./icons/sun.png"
                            }

                            //day 2
                            if (dd.daily[2].weather[0].id < 300 && dd.daily[2].weather[0].id > 200) {
                                i2.src = "./icons/strom.png"
                            } else if (dd.daily[2].weather[0].id < 400 && dd.daily[2].weather[0].id > 300) {
                                i2.src = "./icons/rain.png"
                            } else if (dd.daily[2].weather[0].id < 600 && dd.daily[2].weather[0].id > 500) {
                                i2.src = "./icons/rainy-day.png"
                            } else if (dd.daily[2].weather[0].id < 700 && dd.daily[2].weather[0].id > 600) {
                                i2.src = "./icons/snow.png"
                            } else if (dd.daily[2].weather[0].id < 800 && dd.daily[2].weather[0].id > 700) {
                                i2.src = "./icons/haze.png"
                            } else if (dd.daily[2].weather[0].id < 900 && dd.daily[2].weather[0].id > 800) {
                                i2.src = "./icons/clouds.png"
                            } else if (dd.daily[2].weather[0].id == 800) {
                                i2.src = "./icons/sun.png"
                            }

                            //day 3
                            if (dd.daily[3].weather[0].id < 300 && dd.daily[3].weather[0].id > 200) {
                                i3.src = "./icons/strom.png"
                            } else if (dd.daily[3].weather[0].id < 400 && dd.daily[3].weather[0].id > 300) {
                                i3.src = "./icons/rain.png"
                            } else if (dd.daily[3].weather[0].id < 600 && dd.daily[3].weather[0].id > 500) {
                                i3.src = "./icons/rainy-day.png"
                            } else if (dd.daily[3].weather[0].id < 700 && dd.daily[3].weather[0].id > 600) {
                                i3.src = "./icons/snow.png"
                            } else if (dd.daily[3].weather[0].id < 800 && dd.daily[3].weather[0].id > 700) {
                                i3.src = "./icons/haze.png"
                            } else if (dd.daily[3].weather[0].id < 900 && dd.daily[3].weather[0].id > 800) {
                                i3.src = "./icons/clouds.png"
                            } else if (dd.daily[3].weather[0].id == 800) {
                                i3.src = "./icons/sun.png"
                            }

                            //day 4
                            if (dd.daily[4].weather[0].id < 300 && dd.daily[4].weather[0].id > 200) {
                                i4.src = "./icons/strom.png"
                            } else if (dd.daily[4].weather[0].id < 400 && dd.daily[4].weather[0].id > 300) {
                                i4.src = "./icons/rain.png"
                            } else if (dd.daily[4].weather[0].id < 600 && dd.daily[4].weather[0].id > 500) {
                                i4.src = "./icons/rainy-day.png"
                            } else if (dd.daily[4].weather[0].id < 700 && dd.daily[4].weather[0].id > 600) {
                                i4.src = "./icons/snow.png"
                            } else if (dd.daily[4].weather[0].id < 800 && dd.daily[4].weather[0].id > 700) {
                                i4.src = "./icons/haze.png"
                            } else if (dd.daily[4].weather[0].id < 900 && dd.daily[4].weather[0].id > 800) {
                                i4.src = "./icons/clouds.png"
                            } else if (dd.daily[4].weather[0].id == 800) {
                                i4.src = "./icons/sun.png"
                            }

                            //day 5

                            if (dd.daily[5].weather[0].id < 300 && dd.daily[5].weather[0].id > 200) {
                                i5.src = "./icons/strom.png"
                            } else if (dd.daily[5].weather[0].id < 400 && dd.daily[5].weather[0].id > 300) {
                                i5.src = "./icons/rain.png"
                            } else if (dd.daily[5].weather[0].id < 600 && dd.daily[5].weather[0].id > 500) {
                                i5.src = "./icons/rainy-day.png"
                            } else if (dd.daily[5].weather[0].id < 700 && dd.daily[5].weather[0].id > 600) {
                                i5.src = "./icons/snow.png"
                            } else if (dd.daily[5].weather[0].id < 800 && dd.daily[5].weather[0].id > 700) {
                                i5.src = "./icons/haze.png"
                            } else if (dd.daily[5].weather[0].id < 900 && dd.daily[5].weather[0].id > 800) {
                                i5.src = "./icons/clouds.png"
                            } else if (dd.daily[5].weather[0].id == 800) {
                                i5.src = "./icons/sun.png"
                            }
                            //day 6
                            if (dd.daily[6].weather[0].id < 300 && dd.daily[6].weather[0].id > 200) {
                                i6.src = "./icons/strom.png"
                            } else if (dd.daily[6].weather[0].id < 400 && dd.daily[6].weather[0].id > 300) {
                                i6.src = "./icons/rain.png"
                            } else if (dd.daily[6].weather[0].id < 600 && dd.daily[6].weather[0].id > 500) {
                                i6.src = "./icons/rainy-day.png"
                            } else if (dd.daily[6].weather[0].id < 700 && dd.daily[6].weather[0].id > 600) {
                                i6.src = "./icons/snow.png"
                            } else if (dd.daily[6].weather[0].id < 800 && dd.daily[6].weather[0].id > 700) {
                                i6.src = "./icons/haze.png"
                            } else if (dd.daily[6].weather[0].id < 900 && dd.daily[6].weather[0].id > 800) {
                                i6.src = "./icons/clouds.png"
                            } else if (dd.daily[6].weather[0].id == 800) {
                                i6.src = "./icons/sun.png"
                            }

                            //daily temperature
                            tem1.textContent = dd.daily[1].temp.day + "\n°C";
                            tem2.textContent = dd.daily[2].temp.day + "\n°C";
                            tem3.textContent = dd.daily[3].temp.day + "\n°C";
                            tem4.textContent = dd.daily[4].temp.day + "\n°C";
                            tem5.textContent = dd.daily[5].temp.day + "\n°C";
                            tem6.textContent = dd.daily[6].temp.day + "\n°C";

                            console.log(dd);


                        })

                    //Air forecasting

                    const aq = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lati}&lon=${longi}&appid=ba98deab6ce9cd74af9735fb0625c520`

                    fetch(aq).then((response) => {
                        return response.json();
                    })
                        .then(af =>
                        {

                            //day 1
                            if (af.list[3].main.aqi == 1) {
                                a1.textContent = "AQ-\nG [" + af.list[3].main.aqi + "]";
                            }                           if (af.list[3].main.aqi == 2) {
                                a1.textContent = "AQ-\nF [" + af.list[3].main.aqi + "]";
                            }
                            if (af.list[3].main.aqi == 3) {
                                a1.textContent = "AQ-\nM [" + af.list[3].main.aqi + "]";
                            }
                            if (af.list[3].main.aqi == 4) {
                                a1.textContent = "AQ-\nP [" + af.list[3].main.aqi + "]";
                            }
                            if (af.list[3].main.aqi == 5) {
                                a1.textContent = "AQ-\nVP [" + af.list[3].main.aqi + "]";
                            }

                            //day 2
                            if (af.list[4].main.aqi == 1) {
                                a2.textContent = "AQ-\nG [" + af.list[4].main.aqi + "]";
                            }
                            if (af.list[4].main.aqi == 2) {
                                a2.textContent = "AQ-\nF [" + af.list[4].main.aqi + "]";
                            }
                            if (af.list[4].main.aqi == 3) {
                                a2.textContent = "AQ-\nM [" + af.list[4].main.aqi + "]";
                            }
                            if (af.list[4].main.aqi == 4) {
                                a2.textContent = "AQ-\nP [" + af.list[4].main.aqi + "]";
                            }
                            if (af.list[4].main.aqi == 5) {
                                a2.textContent = "AQ-\nVP [" + af.list[4].main.aqi + "]";
                            }

                            //day 3
                            if (af.list[5].main.aqi == 1) {
                                a3.textContent = "AQ-\nG [" + af.list[5].main.aqi + "]";
                            }
                            if (af.list[5].main.aqi == 2) {
                                a3.textContent = "AQ-\nF [" + af.list[5].main.aqi + "]";
                            }
                            if (af.list[5].main.aqi == 3) {
                                a3.textContent = "AQ-\nM [" + af.list[5].main.aqi + "]";
                            }
                            if (af.list[5].main.aqi == 4) {
                                a3.textContent = "AQ-\nP [" + af.list[5].main.aqi + "]";
                            }
                            if (af.list[5].main.aqi == 5) {
                                a3.textContent = "AQ-\nVP [" + af.list[5].main.aqi + "]";
                            }

                            //day 4
                            if (af.list[6].main.aqi == 1) {
                                a4.textContent = "AQ-\nG [" + af.list[6].main.aqi + "]";
                            }
                            if (af.list[6].main.aqi == 2) {
                                a4.textContent = "AQ-\nF [" + af.list[6].main.aqi + "]";
                            }
                            if (af.list[6].main.aqi == 3) {
                                a4.textContent = "AQ-\nM [" + af.list[6].main.aqi + "]";
                            }
                            if (af.list[6].main.aqi == 4) {
                                a4.textContent = "AQ-\nP [" + af.list[6].main.aqi + "]";
                            }
                            if (af.list[6].main.aqi == 5) {
                                a4.textContent = "AQ-\nVP [" + af.list[6].main.aqi + "]";
                            }

                            //day 5
                            if (af.list[7].main.aqi == 1) {
                                a5.textContent = "AQ-\nG [" + af.list[7].main.aqi + "]";
                            }
                            if (af.list[7].main.aqi == 2) {
                                a5.textContent = "AQ-\nF [" + af.list[7].main.aqi + "]";
                            }
                            if (af.list[7].main.aqi == 3) {
                                a5.textContent = "AQ-\nM [" + af.list[7].main.aqi + "]";
                            }
                            if (af.list[7].main.aqi == 4) {
                                a5.textContent = "AQ-\nP [" + af.list[7].main.aqi + "]";
                            }
                            if (af.list[7].main.aqi == 5) {
                                a5.textContent = "AQ-\nVP [" + af.list[7].main.aqi + "]";
                            }

                            //day 6
                            if (af.list[8].main.aqi == 1) {
                                a6.textContent = "AQ-\nG [" + af.list[8].main.aqi + "]";
                            }
                            if (af.list[8].main.aqi == 2) {
                                a6.textContent = "AQ-\nF [" + af.list[8].main.aqi + "]";
                            }
                            if (af.list[8].main.aqi == 3) {
                                a6.textContent = "AQ-\nM [" + af.list[8].main.aqi + "]";
                            }
                            if (af.list[8].main.aqi == 4) {
                                a6.textContent = "AQ-\nP [" + af.list[8].main.aqi + "]";
                            }
                            if (af.list[8].main.aqi == 5) {
                                a6.textContent = "AQ-\nVP [" + af.list[8].main.aqi + "]";
                            }
                            console.log(af);
                        })
                })
        })
    }
})