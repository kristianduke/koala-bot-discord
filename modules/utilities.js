const Discord = require("discord.js");
const OS = require("os")

module.exports.sleep = function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.listFromDictKeys = function listFromDictKeys(dict) {
    var returnList = [];

    for(var key in dict) {
        returnList.push(key);
    }

    return(returnList);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.listFromDictValues = function listFromDictValues(dict) {
    var returnList = [];

    for(var key in dict) {
        var value = dict[key];
        returnList.push(value);
    }

    return(returnList);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.stringFromList = function stringFromList(list1) {
    var returnText = "";

    for(var i in list1){
        returnText = returnText + list1[i] + "\n";
    }

    return(returnText);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.combineLists = function combineLists(list1, list2, format){
    var returnList = [];

    for(var i in list1){
        if(format){
            returnList.push(list1[i] + format + list2[i]);
        } else {
            returnList.push(list1[i] + " " + list2[i]);
        }
    }

    return(returnList);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.titleCase = function titleCase(string) {
    if(!string){
        return;
    }
    var returnText = string.toLowerCase().split(" ");
    for(var i = 0; i< returnText.length; i++){
       returnText[i] = returnText[i][0].toUpperCase() + returnText[i].slice(1);
    }
    return(returnText);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.embedText = function embedText(title, description) {
    var returnEmbedded = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description);
    return(returnEmbedded);
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.createRole = function createRole(message, name, color) {
    message.guild.roles.create({
        data: {
            name: name,
            color: color,
        },
    });
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.deleteRole = function deleteRole(message, role) { //role can be id or name
    var roleID;

    console.log("1");

    if(message.guild.roles.cache.find(role => role.name === role)) {
        console.log("2");
        roleID = (message.guild.roles.cache.find(role => role.name === role));
        message.guild.roles.cache.get(roleID).delete();
        return(true);
    } else if (message.guild.roles.cache.get(role)) {
        console.log("3");
        message.guild.roles.cache.get(role).delete();
        return(true);
    } else {
        console.log("4");
        return(false);
    }
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.roleRemove = function roleRemove(message, userID, role){ //user can be id or name, as with the role.
    if(message.guild.members.cache.get(userID)){
        var target = message.guild.members.cache.get(userID);
    } else if(message.mentions.users.first().id){
        var target = message.guild.members.cache.get(message.mentions.users.first().id);
    }

    if (message.guild.roles.cache.get(role)) {
        var targetRole = message.guild.roles.cache.get(role);
    } else if(message.mentions.roles.first().id) {
        var targetRole = message.guild.roles.cache.get(message.mentions.roles.first().id);
    }
    
    if(target.guild.roles.fetch(targetRole)) {
        target.roles.remove(targetRole);
        return(true);
    } else {
        return(false);
    }
}
    
// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.roleAdd = function roleAdd(message, userID, role){ //user can be id or name, as with the role.
    if(message.guild.members.cache.get(userID)){
        var target = message.guild.members.cache.get(userID);
    } else if(message.mentions.users.first().id){
        var target = message.guild.members.cache.get(message.mentions.users.first().id);
    }

    if (message.guild.roles.cache.get(role)) {
        var targetRole = message.guild.roles.cache.get(role);
    } else if(message.mentions.roles.first().id) {
        var targetRole = message.guild.roles.cache.get(message.mentions.roles.first().id);
    }
    
    if(target.guild.roles.fetch(targetRole)) {
        target.roles.add(targetRole);
        return(true);
    } else {
        return(false);
    }
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- ---

module.exports.bytesToMB = function bytesToMB(bytes, rounded) {
    if(rounded){
        return(Math.round(bytes / Math.pow(2, 20)));
    } else {
        return(bytes / Math.pow(2, 20));
    }
}