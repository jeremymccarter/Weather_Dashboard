var key = "2532ad69e22752509812a5e695cab215"

function runApi() {
    var city = document.getElementById("searchcity").value
    var fetchUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + key
    console.log(fetchUrl)
    fetch(fetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.main.temp)
            console.log(data.main.humidity)
            console.log(data.wind.speed)
            console.log("http://openweathermap.org/img/wn/"+data.weather[0].icon+".png")
            var date = new Date()
            var month = date.getMonth()+1
            var day = date.getDate()
            var year = date.getFullYear()  
            var dateString = month+"/"+day+"/"+year
        
            document.getElementById("currentcity").innerHTML=city+" ("+dateString+")"
            document.getElementById("icon").innerHTML="<img src='"+"http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'>"
            document.getElementById("temperature").innerHTML=data.main.temp+" F"
            document.getElementById("humidity").innerHTML=data.main.humidity+" %"
            document.getElementById("windspeed").innerHTML=data.wind.speed+" mph"
        
            var lat = data.coord.lat
            var lon = data.coord.lon
            var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid=" +key


            fetch(fiveDayUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
             for (let index = 0; index < 40; index+=8) {
                var output = "<div>"
                output+=data.list[index].dt_txt
                output+="</div>"
                document.getElementById("fiveday").innerHTML+=output
             }  
            });


        });
}


document.getElementById("searchbutton").addEventListener("click",runApi)
