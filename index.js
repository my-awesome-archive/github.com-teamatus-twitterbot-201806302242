var twitter = require('twitter');
const util = require('util');
const EventEmitter = require('events');

var bot = undefined
var self = this
var TwitterBot = function (KEY) {
  bot = new twitter(KEY)
  EventEmitter.call(this);
  self = this
}
util.inherits(TwitterBot, EventEmitter);
TwitterBot.prototype.createTweet = (text, timeout, callback) => {
  var lastError = undefined
  if(lastError && lastError[0].code == 182) text+=" "
  var id = setInterval(() => {
    bot.post('statuses/update', {status: text},  function(error, tweet, response){
      if(error) {
        self.emit('error', error)
        callback(error)
        lastError = error
      }else{
        lastError = undefined
        self.emit('updated', text)
      }
      //
    });
  }, timeout);
  callback(undefined, id)
}
TwitterBot.prototype.tweet = (text) => {
  bot.post('statuses/update', {status: text},  function(error, tweet, response){
    if(error){
      self.emit('error', error)
    }
    self.emit('updated', text)
  });
}
TwitterBot.prototype.removeTweet = (id) => {
  clearTimeout(id)
}
TwitterBot.prototype.recive = (text) => {
  bot.stream('statuses/filter', {track: text}, (stream) => {
    stream.on('data', (tweet) => {
      self.emit('recived', tweet)
      self.emit('data', tweet) // Deperated. It'll delete on 1.3
    });
    stream.on('error', (error) => {
      self.emit('error', error)
    });
  });
}

module.exports = TwitterBot
