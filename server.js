var express = require('express');
var app = express();
var request = require('request');
var xml2js = require('xml2js');
var moment = require('moment');
var _ = require('lodash');

app.use(express.static('assets'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/news', function (req, res) {
    var url = 'http://feeds.nos.nl/nosnieuwsalgemeen?format=xml';

    request.get(url, function(error, response, body) {
        xml2js.parseString(body, function (err, result) {
            var items = _.map(result.rss.channel[0].item, function(item) {
                var pubDate = moment(item.pubDate[0], 'ddd, DD MMM YYYY HH:mm:ss');

                return {
                    title: item.title[0],
                    time: pubDate.format('HH:mm'),
                    timestamp: pubDate.unix(),
                    url: item.link[0]
                };
            });

            items= _.sortBy(items, 'timestamp');

            items = _.reverse(items, 5);

            items = _.take(items, 5);
            
            res.json(items);
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