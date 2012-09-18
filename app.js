var path = require('path');
var express = require('express');
var app = express();

app.configure(function()
              {
                  app.use(express.bodyParser());
                  app.use(express.methodOverride());
                  app.use(app.router);
                  app.use(express.static(path.normalize(__dirname)));
                  // app.use('/js', express.static('js'));
                  // app.use(express.static(path.normalize('.')));
                  // app.use('/js', express.static(path.normalize('./js')));
                  app.use(express.errorHandler({dumpExceptions: true,
                                                showStack: true}));
                  
                          
              });

// app.get('/', 
//         function(req, res)
//         {
//             res.send('Hello World');
//         });


// app.listen(8000);
// console.log('listening on port 8000');

var mysql = require('mysql');
// var restify = require('restify');
// var server = restify.createServer({name: 'radar8-api'});

function dataStore()
{
    // _conn = mysql.createConnection({host: 'localhost',
    //                                 user: 'radar',
    //                                 password: 'r@dar L0v3'});

    getConn = function(org)
    {
        return mysql.createConnection({host: 'localhost',
                                       user: 'radar',
                                       password: 'r@dar L0v3',
                                       database: 'rradmin_' + org
                                      });
    };
    
    this.getPerson = function(org, key, callback)
    {
        // _conn.changeUser({database: 'rradmin_' + org});

        conn = getConn(org);

        person = {};
        person.org = org;
        person.key = key;
        conn.query('select f_name, l_name ' +
                   'from prospect_profile ' +
                   'where user_id = ' + key,
                   function(err, rows)
                   {
                       if (err) throw err;
                       person.first_name = rows[0].f_name;
                       person.last_name = rows[0].l_name;
                       callback(person);
                   }
                  );
    };
}


app.get('/data/:org/:key',
           function(req, res)
           {
               store = new dataStore();
               store.getPerson(req.params.org, 
                               req.params.key,
                               function(person)
                               {
                                   return res.send(person);
                               });
           });

app.listen(8080);

// server.get('/test/:name', 
//            function(req, res, next)
//            {
//                res.send('howdy ' + req.params.name);
//            });


// server.get('/data/:org/:key',
//            function(req, res, next)
//            {
//                store = new dataStore();
//                store.getPerson(req.params.org, 
//                                req.params.key,
//                                function(person)
//                                {
//                                    res.send(person);
//                                });
//                next();
//            });


// server.listen(8010,
//               function()
//               {
//                   console.log('%s listening at %s', server.name, server.url);
//               });