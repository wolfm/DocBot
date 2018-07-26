/*server.js*/

const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./botconfig.json");
const tokenFile = require("./token.json");

var quoteOrder = [];

client.on("ready", () => {
    console.log("DocBot ready.");
});

client.on("message", (message) => {
    //ignore messages from other bots
    if(message.author.bot) return;

    //ignore any message that does not start with the prefix
    if(message.content.indexOf(config.prefix) == 0) {
        //Separate message into command and args array
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();


        if(command == "quote") {
            sendQuote(message, config.deleteCommands)
        }
    }
    else {

	var words = message.content.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") .match(/\S+/g) || [];
        for(var i = 0; i < config.moronTriggers.length; i++)
        {
            if(words.indexOf(config.moronTriggers[i]) !== -1) {
                sendMoron(message);
                return;
            }
        }
        for(var i = 0; i < config.quoteTriggers.length; i++)
        {
            if(words.indexOf(config.quoteTriggers[i]) !== -1) {
                sendQuote(message, false);
                return;
            }
        }
    }
});

client.login(tokenFile.token);

function sendQuote(message, deleteCommands) {

    //var quote = config.quotes[Math.floor(Math.random()*config.quotes.length)];
    var quote = nextQuote();
    message.channel.send(quote);
    if(deleteCommands) message.delete();

    console.log("Sent quote: " + quote + "\r\n\tWith request from user: \"" + message.author.username + " " + message.author + "\"\r\n\tWith request message content: \"" + message.content + "\"\r\n\tTimestamp: " + new Date())
}

function sendMoron(message) {
    message.channel.send("Moron!");
    console.log("Sent moron message" + "\r\n\tWith request from user: " + message.author.username + " " + message.author + "\r\n\tWith request message content: \"" + message.content + "\"\r\n\tTimestamp: " + new Date())
}

function nextQuote(){
    if(quoteOrder.length == 0){
        quoteOrder = generateShuffledIndices();

    }

    return config.quotes[quoteOrder.shift()];
}

function generateShuffledIndices() {
    var shuffledIndices = [];
    for(var i = 0; i < config.quotes.length; i++)
    {
        shuffledIndices.push(i);
    }
    return shuffle(shuffledIndices);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
