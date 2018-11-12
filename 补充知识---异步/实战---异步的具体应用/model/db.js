/**
 * Created by hama on 2017/4/19.
 */
    var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db('test', new Server('localhost', 27017),
    {safe: true});