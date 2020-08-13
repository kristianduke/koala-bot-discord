const utils = require("./utilities");

module.exports.returnWrongPerms = function returnWrongPerms(perms) {
    var permsText = "";
    perms.forEach(function(perm) {
        if(perm == perms[perms.length - 1]) {
            permsText = permsText.concat(perm);
        } else {
            permsText = permsText.concat(perm + ", ");
        }
    });

    console.log(permsText);
    returnText = "These permissions are needed to execute this command: " + permsText;
    return(returnText);
}

module.exports.returnIncorrectSyntax = function returnIncorrectSyntax(prefix, commandName, arguments, embed) {
    var returnText = "";

    if(embed == true) {
        var title = "Incorrect Syntax"
        var description = "Syntax: " + prefix + commandName + " ";
    } else {
        var returnText = "Incorrect syntax\nSyntax: " + prefix + commandName + " ";
    }
    
    arguments.forEach(function(argument) {
        returnText = returnText.concat("(" + argument + ") ");
    });

    if(embed == true){
        description += returnText;
        return(utils.embedText(title, description));
    } else {
        return(returnText);
    }
}

module.exports.returnAdminCommand = function returnAdminCommand() {
    var returnText = "This command is for admins of the bot";
    return(returnText);
}