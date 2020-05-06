// Personal API Key for OpenWeatherMap API
const appID = '1a09117c381d7902dc386c387ce1ec07';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', calculateResults);

/* Function called by event listener */
function calculateResults(event) {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeatherData(baseURL, zipCode, appID)
    .then(function(data) {
        let date = new Date(data.dt * 1000)
        let date_str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        postData('/add', {temperature: data.main.temp, date: date_str, userResponse: userResponse});
        updateUI('/all');
    })
};

/* Function to GET Web API Data */
const getWeatherData = async (baseURL, zipCode, appID) => {
    const response  = await fetch(baseURL + zipCode + '&appid=' + appID + '&units=imperial');
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error);
    };
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

/* Function to GET Project Data */
const updateUI = async(url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
    } catch(error) {
        console.log('error', error);
    };
};