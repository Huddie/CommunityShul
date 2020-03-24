var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    if(req.body.title === undefined || req.body.link === undefined  || req.body.date === undefined || req.body.lecturer === undefined || req.body.institution === undefined) {
        res.status(400).send('Bad Request');
    } else {
        var query = sanitizer.escape()`insert into shiurim (title, link, sources, date, lecturer, institution) VALUES ('${req.sanitize(req.body.title)}', '${req.sanitize(req.body.link)}', '${req.sanitize(req.body.sources)}', '${req.sanitize(req.body.date)}', '${req.sanitize(req.body.lecturer)}', '${req.sanitize(req.body.institution)}')`
        res.locals.connection.query(query, function (error, results, fields) {
            if(error) res.status(400).send('Bad Request');
            res.send(JSON.stringify(results));
        });
    }
});

module.exports = router; 