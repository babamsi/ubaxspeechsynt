# Express Send Stream

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jsrun/express-send-stream/master/LICENSE)
[![npm version](https://badge.fury.io/js/express-send-stream.svg)](https://badge.fury.io/js/express-send-stream)

Module for Express 4.x to load large files via xhr

## Install

```bash
$ npm install express-send-stream
```

## Server-side

```js
var express = require('express'),
    app = express(),
    expressSendStream = require('express-send-stream')(app);
    
app.use(require('serve-static')(__dirname));
app.get('/open', expressSendStream(__dirname + '/mybigfile.xml'));
app.listen(3000);
```

## Client-side

```js
var xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/octet-stream");
xhr.responseType = "arraybuffer";

xhr.onprogress = function(progress){
    document.querySelector(".progress").style.width = ((progress.loaded*100)/parseInt(xhr.getResponseHeader("File-size"))) + "%";
};

xhr.onload = function(v){
    var byteArray = new Uint8Array(xhr.response);
    renderStream(1, byteArray.byteLength, byteArray, 524288, "#code");
};

xhr.onerror = function (e) {
    console.log(e);
};

xhr.open("GET", "/open", true);
xhr.send();

function renderStream(byteStart, byteLength, byteArray, byteBlock, elem){
    var blockString = "";

    if(byteStart+byteBlock > byteLength)
        byteBlock = (byteLength - byteStart)-1;

    for (var i = byteStart; i <= (byteStart+byteBlock); i++)
        blockString += String.fromCharCode(byteArray[i]);

    document.querySelector(elem).appendChild(document.createTextNode(blockString));
    document.querySelector(".progress").style.width = ((byteStart+byteBlock)*100)/(byteLength-1) + "%";
    //console.log(byteStart,(byteStart+byteBlock),byteLength,(((byteStart+byteBlock)*100)/(byteLength-1) + "%"));

    if(byteStart+byteBlock < byteLength-1)
        setTimeout(renderStream, 200, (byteStart+byteBlock)+1, byteLength, byteArray, byteBlock, elem);  
    else{
        var editor = ace.edit("code");
        editor.setTheme("ace/theme/twilight");
        editor.session.setMode("ace/mode/xml");
    }
}
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.