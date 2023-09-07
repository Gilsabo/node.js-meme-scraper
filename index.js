import fs from 'node:fs';
import path from 'node:path';
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
}

console.log(arrayImages);

// The URL of the image to download
arrayImages.forEach((image, index) => {
  const imageURL = image;

  // The path of the directory to save the image
  const dirPath = './memes';

  // The name of the image file
  let fileName = `0${index + 1}.jpg`;

  if (index === 9) {
    fileName = `${index + 1}.jpg`;
  }
  // Create the directory if it does not exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Use fetch to get the image data as a buffer
  fetch(imageURL)
    .then((resp) => resp.arrayBuffer())
    .then((buffer) => {
      // convert arraybuffer into buffer
      const arrBuffer = buffer;
      const nodeBuffer = Buffer.from(arrBuffer);

      fs.writeFile(path.join(dirPath, fileName), nodeBuffer, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Image downloaded successfully');
          console.log('buffer', buffer);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
// import https from 'node:https';
// import fs from 'node:fs';
// This piece of code but does not store in memes

// const imageUrl = arrayImages[0];
// const imageName = '01.jpg';

// const file = fs.createWriteStream(imageName);

/* https
  .get(imageUrl, (resp) => {
    resp.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Image downloaded as ${imageName}`);
    });
  })
  .on('error', (err) => {
    fs.unlink(imageName);
    console.error(`Error downloading image: ${err.message}`);
  });
 */
