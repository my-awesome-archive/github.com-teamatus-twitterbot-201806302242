var twitter = require('twitter');
var evet = new process.EventEmitter();

var bot = undefined

var TwitterBot = function (KEY) {
  bot = new twitter(KEY)
}
TwitterBot.prototype.createTweet = (text, timeout, callback) => {
  var id = setTimeout(() => {
    client.post('statuses/update', {status: text},  function(error, tweet, response){
      if(error) callback(error)
    });
  }, timeout);
  callback(undefined, id)
}
TwitterBot.prototype.removeTweet = (id) => {
  clearTimeout(id)
}
TwitterBot.prototype.recive = (text) => {
  client.stream('statuses/filter', {track: text}, function(stream) {
  stream.on('data', function(tweet) {
    evet.emit('tweet', tweet)
  });

  stream.on('error', function(error) {
    evet.emit('error', error)
  });
});
}

TwitterBot.prototype = evet

exports = TwitterBot
