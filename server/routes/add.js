var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body.title);
    var query = `insert into shiurim (title, link, sources, date, lecturer, institution) VALUES ('${req.body.title}', '${req.body.link}', '${req.body.sources}', '${req.body.date}', '${req.body.lecturer}', '${req.body.institution}')`
    res.locals.connection.query(query, function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router; 