const TelegramBot = require('node-telegram-bot-api');
const { spawnSync } = require( 'child_process' );
const fs = require('fs');

const token = 'token';

const bot = new TelegramBot(token, {polling: true});

const secretToken = '123';
const users = {};

bot.on('message', (msg) => {

    const chatId = msg.chat.id;

    if (msg.text === secretToken) {
        users[chatId] = true;
        bot.sendMessage(chatId, 'ok!!!');
        return;
    }

    if (!users.hasOwnProperty(chatId)) {
        bot.sendMessage(chatId, 'please do login');
        return;
    }

    const fname = `./run/${chatId}_${msg.message_id}`;
    const content = `#!/bin/bash\n${msg.text}`;

    fs.writeFileSync(fname, content);

    const ls = spawnSync( 'bash', [fname] );
    let resp = ls.stdout.toString();
    if (ls.stderr.toString()) {
        resp = `${resp}\n${ls.stderr.toString()}`;
    }
    
    bot.sendMessage(chatId, resp);
});
