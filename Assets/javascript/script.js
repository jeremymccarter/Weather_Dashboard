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

             /*   function displayFunction() {
                    var x = document.querySelector("fivedayclass");
                    if (x.style.display === "none") {
                      x.style.display = "block";
                    } else {
                      x.style.display = "none";
                    }
                  }
*/

           // document.getElementById("icon0").innerHTML="<img src='"+"http://openweathermap.org/img/wn/"+data.list[0].weather.icon+".png'>"
           // document.getElementById("temperature0").innerHTML=data.list[0].main.temp+" F"
           // document.getElementById("humidity0").innerHTML=data.list[0].main.humidity+" %"
           // document.getElementById("windspeed0").innerHTML=data.list[0].wind.speed+" mph"

            
         /*   document.getElementById("icon1").innerHTML="<img src='"+"http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'>"
            document.getElementById("temperature1").innerHTML=data.main.temp+" F"
            document.getElementById("humidity1").innerHTML=data.main.humidity+" %"
            document.getElementById("windspeed1").innerHTML=data.wind+" mph"


            document.getElementById("icon2").innerHTML="<img src='"+"http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'>"
            document.getElementById("temperature2").innerHTML=data.main.temp+" F"
            document.getElementById("humidity2").innerHTML=data.main.humidity+" %"
            document.getElementById("windspeed2").innerHTML=data.wind.speed+" mph"

           
            document.getElementById("icon3").innerHTML="<img src='"+"http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'>"
            document.getElementById("temperature3").innerHTML=data.main.temp+" F"
            document.getElementById("humidity3").innerHTML=data.main.humidity+" %"
            document.getElementById("windspeed3").innerHTML=data.wind.speed+" mph"

            
            document.getElementById("icon4").innerHTML="<img src='"+"http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'>"
            document.getElementById("temperature4").innerHTML=data.main.temp+" F"
            document.getElementById("humidity4").innerHTML=data.main.humidity+" %"
            document.getElementById("windspeed4").innerHTML=data.wind.speed+" mph"
*/

             for (let index = 0; index < 40; index+=8) {
                var output = "<div>"
                var date = data.list[index].dt_txt
                var year = date.substring(0,4)
                var month = date.substring(5,7)
                var day = date.substring(8,10)
                var dateString = month+"/"+day+"/"+year
                output+="<p>"+dateString+"</p>"
                output+="<p><img src='http://openweathermap.org/img/wn/"+data.list[index].weather[0].icon+".png'></p>"
                output+="<p> Temperature: "+data.list[index].main.temp+" F </p>"
                output+="<p> Humidity: "+data.list[index].main.humidity+" % </p>"
                output+="<p> Wind Speed: "+data.list[index].wind.speed+" mph </p>"
                output+="</div>"
                document.getElementById("fivedaydisplay").innerHTML+=output
             }  
            });

        })
       
    }


document.getElementById("searchbutton").addEventListener("click",runApi)
