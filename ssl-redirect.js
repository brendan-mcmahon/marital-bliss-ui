/**
* Force load with https on production environment
* https://devcenter.heroku.com/articles/http-routing#heroku-headers
*/

// original: https://medium.com/@seunghunsunmoonlee/how-to-enforce-https-redirect-http-to-https-on-heroku-deployed-apps-a87a653ba61e

function redirectSSL(status) {
  status = status || 302;
  return function(req, res, next) {
      if (req.headers['x-forwarded-proto'] != 'https') {
          res.redirect(status, 'https://' + req.hostname + req.originalUrl);
      }
      else {
          next();
      }
  };
};

module.exports = redirectSSL
