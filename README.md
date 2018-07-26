# Doc Bot

Bring the famed calculus and physics teacher to your Discord server to roast the living crap out of you and your friends.

## Adding to a Discord Server

Use the following URL:

`
https://discordapp.com/oauth2/authorize?client_id=471801005856784396&permissions=0&scope=bot
`

## Usage

Doc quotes can be triggered with any of the trigger words in the quoteTriggers array in `botconfig.json` or by the /quote command. The command prefix ("/" by default) can be changed with the prefix variable in `botconfig.json`.

A "Moron!" shoutout can be triggered with any of the trigger words in the moronTriggers array in `botconfig.json`.

## Development Setup

Register your [Discord Application](https://discordapp.com/developers/applications/) and setup a bot within it.

Create a `token.json` file with the following contents, using your own bot token:
``` json
{
    "token": "YOUR BOT TOKEN"
}
```
Make sure your bot token does not find its way onto this public Github repo!

To add your custom bot to a server, substitute your own bot ID in the URL from "Adding to a Discord Server" and visit that URL in a browser.