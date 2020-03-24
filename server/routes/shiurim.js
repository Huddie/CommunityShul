var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.locals.connection.query(`select * from shiurim where date >= NOW() ORDER BY date DESC `, function (error, results, fields) {
        if(error) res.status(400).send('Bad Request');
        else res.send(JSON.stringify(results));
    });
});

module.exports = router;