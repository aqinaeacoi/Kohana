const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        if (message.mentions.length !== 1) return message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant lick a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant lick your self.").catch(err => console.error("Cannot send messages to this channel", err));
        const lick = await fetch('https://purrbot.site/api/img/sfw/lick/gif');
        const lickJSON = await lick.json();

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was licked by ${message.author.username}`,
                "color": 2717868,
                "image": {
                    "url": lickJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Lick a user.\n```\n??botPrefix??lick <@user>\n```","inline": true}
    ]
};