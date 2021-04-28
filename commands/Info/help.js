module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, runCmds, config} = itemsToImport;

        // sendMessage(message.channel.id, )

        let help = {
            "embed": {
                "title": "Help", 
                "description": `Below is a list of my commands.\nFor more details on any command use **${config.botPrefix}help <command>**\nFor further help you can join the [support server](${config.links["Support server"]})`, 
                "fields": [],
                "color": 5747894, 
                "timestamp": new Date().toISOString()
            }
        }
       
        let commandHelp = message.content.split(" ")[1]

        if (Object.keys(runCmds).includes(commandHelp)){
            help.embed.fields = JSON.parse(JSON.stringify(runCmds[commandHelp].help).split("??botPrefix??").join(config.botPrefix))
            help.embed.description=``;
        }else{
            for (const command in runCmds){
                let catagorynum
                help.embed.fields.forEach(field=> {
                    catagorynum = (field.name == runCmds[command].catagory)
                })

                if (catagorynum){
                    let index = help.embed.fields.findIndex(element => element.name === runCmds[command].catagory)
                    let splitString = help.embed.fields[index].value.split("```")
                    splitString[1]=`${splitString[1]}${command}\n`                    
                    help.embed.fields[index].value="```\n"+splitString.join("")+"```"
                }else{
                    help.embed.fields.push({"name": runCmds[command].catagory, "value": "```\n"+command+"\n```","inline": true})
                }
            }
        }
        sendMessage(message.channel.id, help)
    },
    "help":[
        { "name": "__Usage__", "value": "Lists all commands.\n```??botPrefix??help```\nGives information about a specific command.\n```??botPrefix??help <command>```" }
    ]
}