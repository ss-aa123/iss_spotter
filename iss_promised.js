const request = require('request-promise-native');

const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  return request(url);
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  const url = `http://ipwho.is/${ip}`;
  return request(url);
}

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude} = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
// this function returns a promise so we call .then on its return value aka take a callback which accepts the response body and prints it to the screen
  .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
};

  module.exports = {nextISSTimesForMyLocation};

