//making @GET call to weather API
//after submit is clicked
function initAPiCall() {
    var token = document.getElementById("accesstoken1").value;
    var location = document.getElementById("location1").value;

    //validations on mandatory fields
    if (location == undefined || location.trim() == "") {
        alert("please enter valid access location");
        return
    }
    if (token == undefined || token.trim() == "") {
        alert("please enter valid access token");
        return
    }

    //API base url and endpoint with dynamic params @location and @accessToken
    var apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${token}&contentType=json`;
    fetch(apiUrl)
        .then((data) => {
            //checking if response not OK and showing error
            if (data.ok == false) {
                alert("failed to load weather info")
                return
            }
            return data.json();
        })
        .then((post) => {
            console.log(JSON.stringify(post));
            updateUi(post);
        });
}

//binding response body to UI
function updateUi(data) {
    //handling error case
    if (data.hasOwnProperty("success")) {
        alert(data.error.info);
        return;
    }

    var paragraph = document.getElementById("location2");
    document.getElementById('location2').innerHTML = '';
    var text = document.createTextNode("Location: " + data.address);
    paragraph.appendChild(text);

    paragraph = document.getElementById("lat");
    document.getElementById('lat').innerHTML = '';
    var text = document.createTextNode("Lat: " + data.latitude);
    paragraph.appendChild(text);


    var paragraph = document.getElementById("long");
    document.getElementById('long').innerHTML = '';
    var text = document.createTextNode("Long: " + data.longitude);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("time-zone");
    document.getElementById('time-zone').innerHTML = '';
    var text = document.createTextNode("TimeZone: " + data.timezone);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("wind-speed");
    document.getElementById('wind-speed').innerHTML = '';
    var text = document.createTextNode("Wind Speed: " + data.currentConditions.windspeed);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("pressure");
    document.getElementById('pressure').innerHTML = '';
    var text = document.createTextNode("Pressure: " + data.days[0].pressure);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("humidity");
    document.getElementById('humidity').innerHTML = '';
    var text = document.createTextNode("Humidity: " + data.currentConditions.humidity);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("wind-direction");
    document.getElementById('wind-direction').innerHTML = '';
    var text = document.createTextNode("Wind Direction: " + data.days[0].winddir);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("uv-index");
    document.getElementById('uv-index').innerHTML = '';
    var text = document.createTextNode("UV Index: " + data.days[0].uvindex);
    paragraph.appendChild(text);

    var paragraph = document.getElementById("feels-like");
    document.getElementById('feels-like').innerHTML = '';
    var text = document.createTextNode("Feels Like: " + data.currentConditions.feelslike);
    paragraph.appendChild(text);
}