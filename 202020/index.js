#! /usr/bin/env node

const notifier = require('node-notifier');
const path = require('path');
const interval = require('./interval');

const time = 1200000;
const timeInterval = (process.argv[2] * 1000) * 60 || time;

interval(timeInterval, 3, (count) => {
  const message = [
    {'title':`Third timer done.`, 'body':`Time's up.`},
    {'title':`Second timer done.`, 'body':`Ask a mentor`},
    {'title':`First timer done.`, 'body':`Ask your team.`},
  ][count];

  console.log(`${message.title} ${message.body}`);

  notifier.notify({
    title: message.title,
    message: message.body,
  });
});
