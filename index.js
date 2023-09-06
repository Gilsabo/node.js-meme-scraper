import fs from 'node:fs';
import fetch from 'node-fetch';

fs.mkdir('./memes', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('New directory successfully created.');
  }
});

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

console.log(body);
