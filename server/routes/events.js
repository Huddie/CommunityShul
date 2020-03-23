var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.locals.connection.query(`select * from events where username = ${req.body.eventUsername}`, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;