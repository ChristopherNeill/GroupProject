const APIKEY = "f9849342e7c41936868fe3b62aa7794b";
var lat;
var lon;


getFood();
function getFood(){
    getCityID();
    var fURL = "https://developers.zomato.com/api/v2.1/search?count=10&lat=" + lat + "&lon=" + lon+ "&radius=10000" + "&apikey=" + APIKEY;

    $.ajax({
        url: fURL,
        method: "GET"
    }).then((response) =>{
        console.log(response);
        var restaurantList = [];
        /*restaurantList.forEach(function(index, element){
            var div = document.createElement("div");
            var resTitle = document.createElement("h1");
            //resTitle.textContent = response.

        })*/
    })
}

function getCityID(){
    var city = document.getElementById("cityInput").val();
    var CIDURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&apikey=" + APIKEY;

    $.ajax({
        url: CIDURL,
        method: "GET"
    }).then((response) =>{
        lat = response.latitude;
        lon = response.longitude
    })
}