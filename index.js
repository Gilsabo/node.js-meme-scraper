// import fs from 'node:fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

/* fs.mkdir('./memes', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('New directory successfully created.');
  }
}); */

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

const $ = cheerio.load(body);

const listItems = $('a').find('img');

console.log(listItems[0].attribs.src);

const arrayImages = [];

for (let i = 0; i <= 9; i++) {
  arrayImages.push(listItems[i].attribs.src);
  console.log(i);
}

console.log(arrayImages);
