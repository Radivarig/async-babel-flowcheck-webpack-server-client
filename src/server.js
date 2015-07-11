var express = require('express')
  , app = express()

var bodyParser = require('body-parser')
  , compression = require('compression')

var db_api = require('./db_api-compiled')
  , whitelist = require('./authentications/whitelist')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', whitelist)
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

app.set('port', process.env.PORT || 7777)
app.use(compression())
app.use(allowCrossDomain)
app.use(bodyParser.urlencoded({ extended: false }))
app.enable('trust proxy')
//app.use(express.static(__dirname + '/www'))

app.post('/ajax_post', db_api.ajax_post)

app.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'))
})
