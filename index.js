var twitter = require('twitter');
const util = require('util');
const EventEmitter = require('events');
var _this_ = this

var bot = undefined
var TwitterBot = function (KEY) {
  bot = new twitter(KEY)
  EventEmitter.call(this);
  util.inherits(TwitterBot, EventEmitter);
}
util.inherits(TwitterBot, EventEmitter);
TwitterBot.prototype.createTweet = (text, timeout, callback) => {
  var lastError = undefined
  if(lastError && lastError[0].code == 182) text += " "
  var id = setTimeout(() => {
    bot.post('statuses/update', {status: text},  function(error, tweet, response){
      if(error) {
        callback(error)
        lastError = error
      }else{
        lastError = undefined
      }
      _this_.emit('updated', text)
    });
  }, timeout);
  callback(undefined, id)
}
TwitterBot.prototype.tweet = (text) => {
  bot.post('statuses/update', {status: text},  function(error, tweet, response){
    if(error){}
    _this_.emit('updated', text)
  });
}
TwitterBot.prototype.removeTweet = (id) => {
  clearTimeout(id)
}
TwitterBot.prototype.recive = (text) => {
  bot.stream('statuses/filter', {track: text}, (stream) => {
    stream.on('data', (tweet) => {
      _this_.emit('data', tweet)
    });
    stream.on('error', (error) => {
      _this_.emit('error', error)
    });
  });
}

module.exports = TwitterBot
