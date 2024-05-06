function getWeather() {
    const ubicacion = document.getElementById("ubicacion").value;

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://yahoo-weather5.p.rapidapi.com/weather?location=" + ubicacion + "&format=json&u=c",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "61a94d644bmsh15352cd563d610bp1176cbjsn77e2f0d641d8",
            "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        // Manejar la respuesta de la API aquí
        displayWeather(response);
    });
}

function displayWeather(data) {
    // Obtener la información del clima para los próximos 10 días
    const forecast = data["forecasts"];
    let weatherHTML = "<h2>Pronóstico del tiempo para los próximos 10 días en " + data["location"]["city"] + ":</h2>";

    for (let i = 0; i < forecast.length && i < 10; i++) {
        const day = forecast[i];
        weatherHTML += "<div class='weather-box'>";
        weatherHTML += "<strong>";

        // Convertir el nombre del día de la semana a español
        const dia = day["day"].toLowerCase();
        let nombreDia = "";

        switch (dia) {
            case "mon":
                nombreDia = "lunes";
                break;
            case "tue":
                nombreDia = "martes";
                break;
            case "wed":
                nombreDia = "miércoles";
                break;
            case "thu":
                nombreDia = "jueves";
                break;
            case "fri":
                nombreDia = "viernes";
                break;
            case "sat":
                nombreDia = "sábado";
                break;
            case "sun":
                nombreDia = "domingo";
                break;
            default:
                nombreDia = "desconocido";
        }

        weatherHTML += nombreDia + ":</strong> ";

        // Traducir la descripción del clima a español
        const descripcionClima = day["text"].toLowerCase();
        let descripcionTraducida = "";

        switch (descripcionClima) {
            case "sunny":
                descripcionTraducida = "soleado";
                break;
            case "rainy":
                descripcionTraducida = "lluvioso";
                break;
            case "cloudy":
                descripcionTraducida = "nublado";
                break;
            case "partly cloudy":
                descripcionTraducida = "parcialmente nublado";
                break;
            case "misty":
                descripcionTraducida = "brumoso";
                break;
            case "thundery":
                descripcionTraducida = "tormentoso";
                break;
            case "showers":
                descripcionTraducida = "chubascos";
                break;
            // Agregar más casos según sea necesario para otras descripciones de clima
            default:
                descripcionTraducida = day["text"];
        }

        weatherHTML += descripcionTraducida + "<br>";
        weatherHTML += "Máxima: " + day["high"] + "°C, Mínima: " + day["low"] + "°C";
        weatherHTML += "</div>";
    }

    // Mostrar los datos del clima en el div
    document.getElementById("weatherData").innerHTML = weatherHTML;
}

// Llamar a la función getWeather al cargar la página
window.onload = getWeather;
