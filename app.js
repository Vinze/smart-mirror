var express = require('express');
var app = express();
var request = require('request');
var xml2js = require('xml2js');
var moment = require('moment');

app.use(express.static('assets'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/news', function (req, res) {
    var url = 'http://feeds.nos.nl/nosnieuwsalgemeen?format=xml';

    request.get(url, function(error, response, body) {
        xml2js.parseString(body, function (err, result) {
            var parsed = result.rss.channel[0].item.map(function(item) {
                return {
                    title: item.title[0],
                    time: moment(item.pubDate[0], 'ddd, DD MMM YYYY HH:mm:ss').format('HH:mm'),
                    url: item.link[0]
                };
            });
            
            res.json(parsed.slice(0, 6));
        });
    });

    // request.get('http://www.nu.nl/rss', function(error, response, body) {
    //     xml2js.parseString(body, function (err, result) {
    //         if (result.rss.channel[0].item) {
    //             var test = result.rss.channel[0].item.map(function(item) {
    //                 console.log(item)
    //                 var date = item.pubDate[0].split(' ');
    //                 var time = date[4].substr(0,5);

    //                 return { title: item.title[0], time: time };
    //             });
    //             res.send(test);
    //         }
    //     });
    // });
});

app.listen(1337);