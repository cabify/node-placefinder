var request = require('request');
var querystring = require('querystring');

var PlaceFinder = function(appID) {
  this.baseUrl = "http://where.yahooapis.com/geocode?";  
  this.appID = appID;
};

PlaceFinder.prototype._makeRequest = function(params, callback) {
  params.appid = this.appID;
  params.flags = "J";
  var qs = querystring.stringify(params);
  var url = this.baseUrl+qs;
  request(url, function(error, response, body) {
    try {
      callback(error, JSON.parse(body));
    } catch {
      callback("Error parsing JSON response", null);
    }
  });
};

PlaceFinder.prototype.location = function(name, callback) {
  this._makeRequest({ location: name }, callback);
};

PlaceFinder.prototype.placeOfInterest = function(name, callback) {
  this._makeRequest({ name: name }, callback);
};

PlaceFinder.prototype.woeid = function(woeid, callback) {
  this._makeRequest({ woeid: woeid }, callback);
};

PlaceFinder.prototype.city = function(city, callback) {
  this._makeRequest({ city: city }, callback);
};

PlaceFinder.prototype.zip = function(zip, callback) {
  this._makeRequest({ postal: zip }, callback);
};

module.exports = PlaceFinder;
