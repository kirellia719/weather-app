const search = document.querySelector('.search-box button');
const notFound = document.querySelector('.not-found');
const content = document.querySelector('.content');

const showWeather = () => {
    const APIKEY_1 = "af295f5464b4";
    const APIKEY_2 = "8048dd7d560c8387e0a0";
    const city = document.querySelector('.search-box input').value;
    console.log(city);
    if (city == '') {
        content.classList.remove("fadeIn");
        content.style.height = "0px";
        content.classList.remove("fadeIn");
        content.style.height = "0px";
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY_1}${APIKEY_2}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);

                if (json.cod == "404") {
                    notFound.classList.add("fadeIn");
                    notFound.style.height = "300px";
                    content.classList.remove("fadeIn");
                    content.style.height = "0px";
                }
                else {
                    notFound.classList.remove("fadeIn");
                    notFound.style.height = "0";
                    content.classList.add("fadeIn");
                    content.style.height = "470px";

                    var temp = document.querySelector('.temperature');
                    temp.innerHTML = `<text>${parseInt(json.main.temp)}<span>&deg;C</span></text>`;

                    var description = document.querySelector('.description');
                    description.innerHTML = `${json.weather[0].description}`;

                    var humid = document.querySelector('.humidity .text span');
                    humid.innerHTML = `${json.main.humidity}%`;

                    var wind = document.querySelector('.wind .text span');
                    wind.innerHTML = `${json.wind.speed}Km/h`;

                    const image = document.querySelector('.weather-box img');
                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = 'images/clear.png';
                            break;

                        case 'Rain':
                            image.src = 'images/rain.png';
                            break;

                        case 'Snow':
                            image.src = 'images/snow.png';
                            break;

                        case 'Clouds':
                            image.src = 'images/cloud.png';
                            break;

                        case 'Haze':
                            image.src = 'images/fog.png';
                            break;

                        default:
                            image.src = '';
                    }
                }

            })
    }
}

search.addEventListener('click', showWeather);