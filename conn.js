var mongoose = require('mongoose')

var url = "mongodb://localhost:27017/meanbatch121"

mongoose.connect(url, function(err) {
    if (err)
        console.log(err)
    else
        console.log('Connected successfully...')
});
db = mongoose.connection;
module.exports = db