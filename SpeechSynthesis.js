const express = require('express'),
ms = require('mediaserver');
const cors = require('cors')
const send = require('send')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
app.use(cors())
// app.use(bodyParser);
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// const port = 8080
app.use(express.json());
app.use(express.urlencoded());

app.post('/', urlencodedParser, (req, res) => {
  console.log('Got body:', req.body.Body);
    // res.sendStatus(200);
  async function cod() {

    "use strict";

    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var readline = require("readline");

    var audioFile = "YourAudioFile.mp3";
    const speechConfig = sdk.SpeechConfig.fromSubscription('61785b4bd30b4dd4b287208d04a5a27d', 'eastasia');
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

    // The language of the voice that speaks.
    speechConfig.speechSynthesisVoiceName = "so-SO-UbaxNeural"; 

    // Create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    // var rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });

    // rl.question("Enter some text that you want to speak >\n> ", function (text) {
    //   rl.close();
      // Start the synthesizer and wait for a result.
       synthesizer.speakTextAsync(req.body.Body,
          function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
              "\nDid you set the speech resource key and region values?");
        }
        synthesizer.close();
        synthesizer = null;
      },
          function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = null;
      });
      console.log("Now synthesizing to: " + audioFile);
      
    };
// }());
  
  // console.log(__dirname+"/index.html")
  // res.writeHead(416, {
  //   'Content-Range': 'bytes 200-1000/67589'
  // })
  // send(req, __dirname+"/YourAudioFile.wav").pipe(res)
  // expressSendStream(__dirname+"/YourAudioFile.wav");
  // let audio = `<audio controls>
  // <source src="${__dirname}/YourAudioFile.wav" type="audio/wav">
  // </audio>`
  // res.send(audio)
    // ms.pipe(req, res, "./YourAudioFile.wav");
    // const range = req.headers.range;
    // if (!range) {
    //     res.status(400).send("Requires Range header");
    // }
    cod()
    // res.sendFile(videoStream)
    res.send('finished')
})

app.get('/sound', (req, res) => {
  const videoPath = __dirname+"/YourAudioFile.mp3";
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number("");
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    console.log(videoSize)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mp3",
    };
    // res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
    console.log('requested file success')
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})




