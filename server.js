//Install express server
const express = require('express');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const compression = require('compression');
const app = express();

app.use(compression());
app.use(sslRedirect);
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/marital-bliss-ui'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/marital-bliss-ui/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
