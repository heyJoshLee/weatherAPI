$(function() {

  var weather_template = Handlebars.compile($("#weather_t").html());
     
  function findWeather() {
        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?q=" + city +"," + country +"&units=metric&APPID=f5762c0995d2774d41301332e0b5c436"
        })
        .done(function(data){
          data.weather = data.weather[0];
          data.weather.description = data.weather.description.charAt(0).toUpperCase() + data.weather.description.slice(1) + ".";
          data.fahrenheit = Math.round(data.main.temp * 1.8 + 32);
          $("#weather").html(weather_template(data));
          $("#user_input").val("");
          $("#user_input").attr("placeholder", city.charAt(0).toUpperCase() + city.slice(1) + "," + country.toUpperCase());
        })
        .fail(function(){
          conosle.log("error");
        })
  };

  function checkInput(city, country){
    if (typeof city === "undefined" || typeof country === "undefined") {
      $("#errors").fadeIn("slow", function() {
        setTimeout(function(){
          $("#errors").fadeOut();
        }, 2000)
      });
      console.log("error");
    } else {
      findWeather();
    }
  }

  $("form").on("submit", function(e) {
    e.preventDefault();
      input = $("#user_input").val();
      city = input.split(",")[0];
      country = input.split(",")[1];
    checkInput(city, country);
  });

  var input = $("#user_input").val();
  var city = input.split(",")[0];
  var country = input.split(",")[1];
  findWeather();

});
