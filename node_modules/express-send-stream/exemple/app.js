var express = require('express'),
    app = express(),
    expressSendStream = require('../index.js')(app);
    
app.use(require('serve-static')(__dirname));
app.get('/open', expressSendStream(__dirname + '/mybigfile.xml'));
app.listen(3000);

