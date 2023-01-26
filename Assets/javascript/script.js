var key = "2532ad69e22752509812a5e695cab215"


//fetches weather api, uses if else to store searches locally

function runApi() {
    var city = document.getElementById("searchcity").value
    document.getElementById("cityhistory").innerHTML+="<li>"+city+"</li>"
    var history = localStorage.getItem("history")
    if(history){
        localStorage.setItem("history",history+";"+city)
    }    
   else{
    localStorage.setItem("history",city)

   }
    console.log(localStorage.getItem("history"))
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


            document.getElementById("fivedaydisplay").innerHTML=""
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

var citydata = localStorage.getItem("history")
console.log(citydata)
if(citydata){
    var cities = citydata.split(";")
    for (let index = 0; index < cities.length; index++) {
        document.getElementById("cityhistory").innerHTML+="<li>"+cities[index]+"</li>"
        
    }    
}
document.getElementById("searchbutton").addEventListener("click",runApi)
