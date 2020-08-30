
const utils = require("./modules/utilities");
const errRtn = require("./modules/errorReturns")
const colors = require("./modules/colors")
const news = require("./modules/news")
const os = require("os")

const Discord = require("discord.js");
const client = new Discord.Client();

const OwnerID = "205980203153883138";

var prefix = "!";

async function command(message)
{
    if(message.content.substr(0, prefix.length) != prefix) {
        return;
    }

    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]) {
        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "ping": //pong!
            message.reply("Pong!");
            break;
        
        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "prefix": //change the command prefix for the bot
            if(!args[1])
            {
                message.reply(errRtn.returnIncorrectSyntax(prefix, "prefix",["New Prefix"], true))
                break;
            }
            prefix = args[1];
            message.channel.send(utils.embedText("Prefix Change" ,"Prefix has been changed: **" + args[1] + "**"));
            break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "roleusers": //display a list of users for specified role
            if(!args[1]) {
                return(message.channel.send(errRtn.returnIncorrectSyntax(prefix, "roleusers", ["Role name"], true)));
            }

            try {
                var roleID = message.guild.roles.cache.find(role => role.name === args[1]).id;
                var description = message.guild.roles.cache.get(roleID).members.map(m=>m.user.tag).join("\n");
            } catch (error){
                console.error("Caught Error!\n" + error);
                return(message.channel.send("This is not a role! (rolename is case sensitive)"));
            }

            var memberCount = message.guild.roles.cache.get(roleID).members.size; //How many members are in the role
            var ListEmbed = new Discord.MessageEmbed()
                .setTitle("There are " + memberCount + " users with the " + utils.titleCase(args[1]) + " role:")
                .setDescription(description);
            message.channel.send(ListEmbed);
            break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "roles": //display all roles on the server
            var roles = message.guild.roles.cache;
            var sortedRoles = "";
            message.guild.roles.cache.forEach(role => sortedRoles = sortedRoles + role.name + " - " + role.members.size + " Members\n");

            message.channel.send(utils.embedText("There are " + roles.size + " roles", sortedRoles)); 
            break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "createrole":
        case "addrole":
        case "newrole": //Create a new role
            if(!args[1]){
                return(message.channel.send(errRtn.returnIncorrectSyntax(prefix, "newrole", ["Name of role", "Hex Color"], true)));
            }

            var color;
            if(colors.colorList[utils.titleCase(args[2])]){
                var color = colors.colorList[utils.titleCase(args[2])];
            } else if(args[2] && args[2].includes("#")) {
                var color = args[2].toUpperCase();
            }

            utils.createRole(message, args[1], color);
            message.channel.send(utils.embedText("Role Created", "**Name:** " + args[1] + "\n**Color:** " + color))
            break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "deleterole":
        case "delrole": //Remove a role
            if(!args[1]) {
                return(message.channel.send(errRtn.returnIncorrectSyntax(prefix, "delrole", ["Name or ID of role"], true)));
            }

            if(utils.deleteRole(message, args[1]) == false) {
                return(errRtn.returnIncorrectSyntax(prefix, "delrole", ["Name or ID of Role"], true));
            } else {
                return(message.channel.send(utils.embedText("Role Removed", "Removed " + args[1] + " from roles")));
            }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "roleremove":
            if(!args[1] || !args[2]) {
                return(message.channel.send(errRtn.returnIncorrectSyntax(prefix, "roleremove", ["ID of user", "ID of role"], true)));
            }

            if(utils.roleRemove(message, args[1], args[2])){
                return(message.channel.send(utils.embedText("Remove Role from User", "Successfully removed role from user!")))
            } else {
                return(message.channel.send(utils.embedText("Unsuccessfully removed role from user", "Incorrect role or user!")))
            }
        
        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "roleadd":
            if(!args[1] || !args[2]) {
                return(message.channel.send(errRtn.returnIncorrectSyntax(prefix, "roleadd", ["Mention or ID of user", "Mention or ID of role"], true)));
            }

            if(utils.roleAdd(message, args[1], args[2])){
                return(message.channel.send(utils.embedText("Add Role from User", "Successfully added role to user!")))
            } else {
                return(message.channel.send(utils.embedText("Unsuccessfully added role from user", "Perhaps the role/user doesn't exist?")))
            }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

            case "headlines":
                news.topHeadlines();
                break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "colors": //Display all saved colors (currently discord role colors)
            message.channel.send(utils.embedText("Default Bot Colors", utils.combineLists(utils.listFromDictKeys(colors.colorList), utils.listFromDictValues(colors.colorList), " - ")));
            break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "shutdown": //shutdown the bot
            if (message.author.id !== OwnerID) { //Makes sure user is admin (of bot)
                message.reply(errRtn.returnAdminCommand());
                return;
            }

            message.channel.send("Shutting Down...");
            await utils.sleep(1000);
            console.log("Good Night...")
            process.exit(1);
            break;

        // --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        case "hostinfo":
            if (message.author.id !== OwnerID) { //Makes sure user is admin (of bot)
                message.reply(errRtn.returnAdminCommand());
                return;
            }

            message.channel.send(utils.embedText("Host Info", "Hostname: " + os.hostname() + "\nOS Platform: " + os.platform() + "\nOS Name: " + os.type() + 
            "\nUptime: " + os.uptime() + " Seconds\nTotal System Memory: " + utils.bytesToMB(os.totalmem(), true) + "MB\nFree System Memory: " + utils.bytesToMB(os.freemem(), true) + "MB"));
            
            break;
    }
}

client.once("ready", () => { //Shows on console that the bot is successfully running
    console.log("Koala Bot is Running\n");
});

client.on("message", message=> {
    command(message);
})

client.login("NTA2ODY4ODY2MDAyMDU5Mjc0.W9iIag.JF-ub_wF3tMtqIGrl3QRh254DH4"); //Must be on last line