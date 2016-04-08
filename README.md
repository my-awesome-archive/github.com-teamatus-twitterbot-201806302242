# twitterbot
![/](https://nodei.co/npm/twitterbot.png?downloads=true&downloadRank=true&stars=true)

[![npm](https://img.shields.io/npm/dt/twitterbot.svg?style=flat-square)](https://www.npmjs.com/package/twitterbot) [![npm](https://img.shields.io/npm/l/twitterbot.svg?style=flat-square)](https://www.npmjs.com/package/twitterbot)
[![management](https://img.shields.io/badge/management-Atus-blue.svg?style=flat-square)](http://www.atus.ml)

This is Twitter Warpper for develop your own bot on twitter. on now, this project use timer built-in timer, so **callback time is not accurate**. 0.5 to 1 second late or may be faster.

## Example
### Tweet "Hello, World!" every 3 second!
```javascript
var TwitterBot = require('twitterbot')
var bot = new TwitterBot({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}) // Your Keys Here
bot.createTweet("Hello, World!", 3000, (err, id) => {
  if(err) throw err;
  // Register Tweet. This will tweet "Hello, World!" every 3 second!

  doSomething()

  twbot.removeTweet(id) // "Hello, World!" will not tweeted anymore.
  // Tweet has already been created will NOT BE REMOVED.
})
```
### Log it tweet contains "nodejs"
```javascript
var TwitterBot = require('twitterbot')
var bot = new TwitterBot({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}) // Your Keys Here
bot.recive("nodejs")
bot.on('error', (err) => {
  throw err;
})
bot.on('tweet', (data) => { // Recived Tweet contains "nodejs"
  console.log(data.text)
})
```
## Why `twitterbot`
* No message 'Status is a duplicate.'
 * This will automatically add space to avoid the filter.
