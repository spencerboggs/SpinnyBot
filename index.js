/**
 * @fileoverview SPINNY BOT 2.0
 * A discord bot that helps you to troll your friends.
 * Copyright (c) 2023 Spencer Boggs
 */

/* DEPENDENCIES */
require('dotenv').config();
const { Client, Routes, GatewayIntentBits, Collection, Interaction, ActivityType, discord, PermissionsBitField, PermissionFlagsBits, Invite } = require("discord.js")
const fs = require("fs");
const path = require('path');
const { REST } = require('@discordjs/rest');
const { joinVoiceChannel } = require('@discordjs/voice');
const { addSpeechEvent, SpeechEvents } = require("discord-speech-recognition");
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { TIMEOUT } = require('dns');

/* VARIABLES */
const client = new Client({ intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
addSpeechEvent(client);

/* COMMAND COLLECTIONS */
client.slashCommands = new Collection();
client.commands = new Collection();

/* SLASH COMMANDS */
const slashCommands = [];
const commandSlashFiles = fs.readdirSync('./src/slash-commands').filter(file => file.endsWith(".js"));

// Read slash commands from the slash-commands folder
for (const fileSlash of commandSlashFiles) {
    const commandSlash = require(`./src/slash-commands/${fileSlash}`);
    client.slashCommands.set(commandSlash.data.name, commandSlash);
    slashCommands.push(commandSlash.data.toJSON());
}
/* BOT START */
client.once("ready", async () => {
    console.log("\x1b[2J\x1b[0f\x1b[1m");
    console.log("░██████╗██████╗░██╗███╗░░██╗███╗░░██╗██╗░░░██╗  ██████╗░░█████╗░████████╗  ██████╗░░░░░█████╗░")
    console.log("██╔════╝██╔══██╗██║████╗░██║████╗░██║╚██╗░██╔╝  ██╔══██╗██╔══██╗╚══██╔══╝  ╚════██╗░░░██╔══██╗")
    console.log("╚█████╗░██████╔╝██║██╔██╗██║██╔██╗██║░╚████╔╝░  ██████╦╝██║░░██║░░░██║░░░  ░░███╔═╝░░░██║░░██║")
    console.log("░╚═══██╗██╔═══╝░██║██║╚████║██║╚████║░░╚██╔╝░░  ██╔══██╗██║░░██║░░░██║░░░  ██╔══╝░░░░░██║░░██║")
    console.log("██████╔╝██║░░░░░██║██║░╚███║██║░╚███║░░░██║░░░  ██████╦╝╚█████╔╝░░░██║░░░  ███████╗██╗╚█████╔╝")
    console.log("╚═════╝░╚═╝░░░░░╚═╝╚═╝░░╚══╝╚═╝░░╚══╝░░░╚═╝░░░  ╚═════╝░░╚════╝░░░░╚═╝░░░  ╚══════╝╚═╝░╚════╝░")
    client.user.setPresence({ activities: [{ name: `Destiny 2`, type: ActivityType.Playing }], status: 'online' });
    client.user.setStatus('dnd');

    // Display the date and time the bot went online
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
    var time = (today.getHours() + 5) + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("Online since: " + date + " at " + time + "\n");

    // Display the server list
    console.log("Spinny Bot 2.0 Server List:");
    console.log("Current Server Count: " + client.guilds.cache.size);
    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name);
    })

    const clientId = '1076961852564701184';
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    // Load commands
    console.log("\n\x1b[32mLOADING COMMANDS\x1b[0m");
    let commandCount = 0;
    const obj = JSON.parse(fs.readFileSync(path.resolve('./src/commands.json')));
    for (var key in obj) {
        commandCount++;
    }
    console.log(`Loaded ${commandCount} auto response.`);

    // load voice commands
    console.log("\x1b[1m");
    console.log("\x1b[32mLOADING VOICE COMMANDS\x1b[0m");
    const commandVoiceFiles = fs.readdirSync('./src/voice-commands').filter(file => file.endsWith(".js"));
    let voiceCommandCount = 0;
    for (const fileVoice of commandVoiceFiles) {
        const commandVoice = require(`./src/voice-commands/${fileVoice}`);
        voiceCommandCount++;
    }
    console.log(`Loaded ${voiceCommandCount} voice commands.`);

    (async () => {
        // Load slash commands
        console.log("\x1b[1m");
        console.log("\x1b[32mLOADING SLASH COMMANDS\x1b[0m");
        try {
            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: slashCommands },
            )
            console.log(`Loaded ${data.length} slash commands.`);
        } catch (error) {
            console.error(error);
        }
    })();

    // set the max emitters to high
    client.setMaxListeners(255);
});

/* REGISTER INTERACTIONS */
client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        // Register slash commands
        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return;
        try {
            await slashCommand.execute(client, interaction);
        } catch (err) {
            await interaction.reply({ content: `An error has occured. ${err}`, ephemeral: true });
        }
    }
});

/* REGISTER MESSAGES */
let connection;
let joinChannel;
client.on("messageCreate", message => {
    if (message.author.bot) return;
    const obj = JSON.parse(fs.readFileSync(path.resolve('./src/commands.json')));
    if (obj[message.content.toLowerCase()]) {
        message.channel.send(obj[message.content.toLowerCase()].res);
    }

    if (message.content === 'join' && (message.author.id === '420059335486341122' || message.author.id === '303388836648452096' || message.author.id === '704360116891418745')) {
        joinChannel = message.channel;

        if (!message.member.voice.channel) {
            message.reply('You need to join a voice channel first!');
            return;
        }
        // then join the voice channel the user is in
        connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.member.voice.channel.guild.id,
            adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false,
        });

        const obj = JSON.parse(fs.readFileSync(path.resolve('./src/aliases.json')));
        let aliases = obj.aliases;

        message.guild.members.cache.forEach(member => {
            if (member.user.bot) return;
            aliases[member.user.username.toLowerCase()] = member.user.username;
            console.log("username: " + member.user.username);
            aliases[member.displayName.toLowerCase()] = member.user.username;
            console.log(member.username);
            console.log(message.guild.members.cache.get(member.user.id).displayName);
            console.log("")
            // for some reason display name becomes the username and the actual display name never gets set
            //console.log("display name: " + member.displayName);
            if (member.nickname) {
                aliases[member.nickname.toLowerCase()] = member.user.username;
                //console.log(member.nickname);
            }
        });

        fs.writeFileSync(path.resolve('./src/aliases.json'), JSON.stringify({ aliases: aliases }, null, 4));
    }
});

/* REGISTER GUILD JOINS */
client.on("guildCreate", guild => {
    const obj = JSON.parse(fs.readFileSync(path.resolve('./src/blacklist.json')));
    if (obj[guild.name]) {
        guild.leave();
        client.users.fetch('420059335486341122').then((user) => {
            user.send(`A blacklisted server tried to add the bot: ${guild.name} (${guild.id})`);
        }
        );
    } else {
        client.users.fetch('420059335486341122').then((user) => {
            user.send(`A server added the bot: ${guild.name} (${guild.id})\n`);
        }
        );
    }
});

/* REGISTER GUILD LEAVES */
client.on("guildDelete", guild => {
    // message me when the bot leaves a server
    client.users.fetch('420059335486341122').then((user) => {
        user.send(`A server removed the bot: ${guild.name} (${guild.id})`);
    }
    );
});

/* REGISTER INVITES */
client.on("inviteCreate", invite => {
    // message me when an invite is created
    client.users.fetch('420059335486341122').then((user) => {
        user.send(`An invite was created: ${invite.url} (${invite.guild.name})`);
    }
    );
});

/* REGISTER VC DISCONNECTS */
client.on("voiceStateUpdate", (oldState, newState) => {
    /* if (newState.member.id === '1076961852564701184' && newState.channel === null) {
        newState.member.setNickname('Spinny Bot');
        client.user.setAvatar('./spinnybot.png');
    } */
});


/** 
 * TO DO:
 * - Fix the problem where a command is used on a user not in a voice channel
 * - make a slash command for the join vc command
*/
/* REGISTER SPEECH EVENTS */
client.on(SpeechEvents.speech, (msg) => {
    if (!msg.content) return;
    /*
    client.users.fetch('420059335486341122').then((user) => {
        user.send(msg.member.user.username + ": " + msg.content);
    }); */

    // send all the messages to this server id: 775797660488564757 and this channel id in that ser: 1138310465496305755
    client.guilds.fetch('775797660488564757').then((guild) => {
        guild.channels.fetch('1138310465496305755').then((channel) => {
            channel.send("**" + msg.member.user.username + "**" + ": " + msg.content);
        });
    });

    // We're going to put all of the voice commands in the .src/voice-commands folder
    const commandVoiceFiles = fs.readdirSync('./src/voice-commands').filter(file => file.endsWith(".js"));

    /* Deafen Adjustments */
    // Change definition -> deafen
    if (msg.content.toLowerCase().includes('definition')) {
        msg.content = msg.content.toLowerCase().replace('definition', 'deafen');
    }
    // change death in -> deafen
    if (msg.content.toLowerCase().includes('death in')) {
        msg.content = msg.content.toLowerCase().replace('death in', 'deafen');
    }
    // change devin -> deafen
    if (msg.content.toLowerCase().includes('devin')) {
        msg.content = msg.content.toLowerCase().replace('devin', 'deafen');
    }

    /* Undeafen Adjustments */
    // change undefined -> undeafen
    if (msg.content.toLowerCase().includes('undefined')) {
        msg.content = msg.content.toLowerCase().replace('undefined', 'undeafen');
    }
    // change on deafen -> undeafen
    if (msg.content.toLowerCase().includes('on deafen')) {
        msg.content = msg.content.toLowerCase().replace('on deafen', 'undeafen');
    }
    // change on deaf and -> undeafen
    if (msg.content.toLowerCase().includes('on deaf and')) {
        msg.content = msg.content.toLowerCase().replace('on deaf and', 'undeafen');
    }

    /* Aliases Adjustments */
    // change alias -> aliases
    if (msg.content.toLowerCase().includes('alias')) {
        msg.content = msg.content.toLowerCase().replace('alias ', 'aliases');
    }

    for (const fileVoice of commandVoiceFiles) {
        const commandVoice = require(`./src/voice-commands/${fileVoice}`);
        if (commandVoice.data.includes) {
            if (msg.content.toLowerCase().includes(' ' + commandVoice.data.includes + ' ')) {
                commandVoice.execute(client, msg, connection, joinChannel);
            }
            else if (msg.content.toLowerCase().startsWith(commandVoice.data.includes + ' ')) {
                commandVoice.execute(client, msg, connection, joinChannel);
            }
        }
        else if (commandVoice.data.command) {
            if (msg.content.toLowerCase() === commandVoice.data.command) {
                commandVoice.execute(client, msg, connection, joinChannel);
            }
        }
    }

    // Register 'mods crush ___'s skull' command
    if (msg.content.toLowerCase().startsWith('mods crush') || msg.content.toLowerCase().startsWith('mod crush') || msg.content.toLowerCase().startsWith('mods crushes') || msg.content.toLowerCase().startsWith('mod crushes')) {
        let crush = msg.content.split(' ')[2];
        if (crush === 'my') {
            // set it to the user who spoke
            crush = msg.member.user.username;
        } else if (crush) {
            let member = msg.guild.members.cache.find(member => member.user.username.toLowerCase() === crush.toLowerCase());
            if (!member) {
                try {
                    member = msg.guild.members.cache.find(member => member.nickname.toLowerCase() === crush.toLowerCase());
                } catch (error) {
                    member = null;
                }
            }
            if (member) {
                const player = createAudioPlayer();
                const resource = createAudioResource('./crush.mp3');
                connection.subscribe(player);
                player.play(resource);
                setTimeout(() => {
                    member.voice.disconnect();
                    client.users.fetch('420059335486341122').then((user) => {
                        user.send("**CRUSHED " + member.user.username + "'S SKULL**");
                    });
                }, 1000);
            } else {
                client.users.fetch('420059335486341122').then((user) => {
                    user.send("**COULD NOT FIND " + crush + "**");
                });
            }
        }
    }

    // Register 'mods kill yourself' command
    if (msg.content.toLowerCase().includes('mods kill yourself') || msg.content.toLowerCase().includes('mods kill your self') || msg.content.toLowerCase().includes('mod kill yourself')) {
        const player = createAudioPlayer();
        const resource = createAudioResource('./audio-clips/gunshot.mp3');
        // subscibe to the connection
        connection.subscribe(player);
        player.play(resource);
        // wait 1 second then disconnect
        setTimeout(() => {
            connection.destroy();
        }, 2000);
    }

    // Register 'gun' command
    if (msg.content.toLowerCase().includes('gun')) {
        const player = createAudioPlayer();
        const resource = createAudioResource('./audio-clips/gunshot.mp3');
        connection.subscribe(player);
        player.play(resource);
    }

    // Register 'bomb' command
    if (msg.content.toLowerCase().includes('bomb') || msg.content.toLowerCase().includes('bom')) {
        const player = createAudioPlayer();
        const resource = createAudioResource('./audio-clips/explosion.mp3');
        connection.subscribe(player);
        player.play(resource);
    }

    // Register 'kill yourself' command
    if (msg.content.toLowerCase().includes("kill yourself") && !msg.content.toLowerCase().includes("mods kill yourself")) {
        const player = createAudioPlayer();
        const resource = createAudioResource('./audio-clips/vine-boom.mp3');
        connection.subscribe(player);
        player.play(resource);
    }

    // Register 'i hate gingers' command
    if (msg.content.toLowerCase().includes("i hate gingers")) {
        const player = createAudioPlayer();
        const resource = createAudioResource('./audio-clips/irish.mp3');
        connection.subscribe(player);
        player.play(resource);
    }
});


client.login(process.env.TOKEN);
