const apiKey = 'provide your own key';
document.addEventListener('DOMContentLoaded', function() {

  const locationInput = document.getElementById('locationInput');
  const btnGetWeather = document.getElementById('btnGetWeather');
  const name = document.getElementById('name'),
        temp = document.getElementById('temp'),
        weather = document.getElementById('weather'),
        feelsLike = document.getElementById('feelsLike');




  function resetResults(){
    weather.textContent = '';
    temp.textContent = '';
    feelsLike.textContent = '';
    name.textContent = '';
  }




  async function result(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            resetResults();
            name.textContent = 'please write proper name';
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        console.log(data.current.condition.text);
        console.log('Current Temp = '+ data.current.temp_c);
        console.log(data.current.feelslike_c);
        feelsLike.textContent = 'Todays temperature should feel like'+data.current.feelslike_c;
        name.textContent = 'Region is '+data.location.country + '-->' + data.location.name;
        weather.textContent = 'The current weather is '+data.current.condition.text;
        temp.textContent = 'The Current temperature in celsius is '+data.current.temp_c;
        } catch (error) {console.error('There has been a problem with your fetch operation:', error);}
      }



 
  btnGetWeather.addEventListener('click', function() {
    const inputValue = locationInput.value;
  
    if (!inputValue) {
      console.log('Input field is empty');
    } else {
      console.log('Input field value:', inputValue);
      result(inputValue);
      locationInput.value = '';
    }
  });
});





