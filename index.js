var twitter = require('twitter');
const util = require('util');
const EventEmitter = require('events');

var bot = undefined
var TwitterBot = function (KEY) {
  bot = new twitter(KEY)
  EventEmitter.call(this);
}
util.inherits(TwitterBot, EventEmitter);
TwitterBot.prototype.createTweet = (text, timeout, callback) => {
  var id = setTimeout(() => {
    client.post('statuses/update', {status: text},  function(error, tweet, response){
      if(error) callback(error)
    });
  }, timeout);
  callback(undefined, id)
}
TwitterBot.prototype.tweet = (text) => {
  client.post('statuses/update', {status: text},  function(error, tweet, response){
    if(error){}
  });
}
TwitterBot.prototype.removeTweet = (id) => {
  clearTimeout(id)
}
TwitterBot.prototype.recive = (text) => {
  client.stream('statuses/filter', {track: text}, (stream) => {
    stream.on('data', (tweet) => {
      this.emit('data', tweet)
    });
    stream.on('error', (error) => {
      this.emit('error', error)
    });
  });
}

module.exports = TwitterBot
