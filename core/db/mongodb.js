// +----------------------------------------------------------------------
// | MINO [ Why you want to nodejs ]
// +----------------------------------------------------------------------
// | Copyright (c) 2012 http://www.xiaomi.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: cupdir <cupdir@gmail.com>
// +----------------------------------------------------------------------
// $Id$

/**
  +------------------------------------------------------------------------------
 * MONO Mongo操作 http://christkv.github.com/node-mongodb-native/
  +------------------------------------------------------------------------------
 * @package  node
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */
var server_options = {auto_reconnect: true},
    db_options = {native_parser: true,strict: false}; //native_parser==true 安装mongodb必须 npm install mongodb --mongodb:native
var mongo = require("mongodb");
var server = new mongo.Server('10.237.2.180', 27017,server_options);

//访问 replica sets 的方法，
/*
var replSet = new ReplSetServers( [ 
    new Server( '127.0.0.1', 27017, server_options ),
    new Server( '127.0.0.1', 30001, server_options ),
    new Server( '127.0.0.1', 30002, server_options )
  ], {rs_name:'testReplset'}
);*/

exports.dbutil = dbutil = {
    dbName : '',
    db : null,
    createMongoClient : function(dbname, callback){
        this.dbName = dbname;
        // replSet 为集群，单机模式下，可用mongoServer
        this.db = new mongo.Db(this.dbName,server , db_options);     
        this.db.open(function(err,db){
            this.db = db;
            if(callback) callback(err,db,dbutil);
        });
        //return this;
    },
   
    // 查询第一条
    findOne : function(collection,query,callback){  
        this.db.collection(collection, function(err, collection) {
            collection.findOne(query,function(err, doc){
                if(callback) callback(err,doc);
            });               
        });
    },
    // 根据_id查询
    findById : function(collection,_id,callback){  
        this.db.collection(collection, function(err, collection) {
            collection.findOne({_id:db.bson_serializer.ObjectID.createFromHexString(_id)},function(err, doc){
                if(callback) callback(err,doc);
            });               
        });
    },
    // 删除
    remove : function(collection,query,callback){  
        this.db.collection(collection, function(err, collection) {
            collection.remove(query,function(err){
                if(callback) callback(err);
            });               
        });
    },
    // 参考已经实现的mongondbutil.js 的query方法，相同 args = {query,fields,options}
    find : function(collection,args,callback){
        if(!args.options)
            args.options = {skip:0,limit:20};
        this.db.collection(collection, function(err, collection) {
            var cursor = collection.find(args.query || {} ,args.fields || {},args.options);
            cursor.toArray(function(err, docs){
                //console.log(docs); // output all records
                if(docs){
                    cursor.count(function(err, count){
                        //console.log(count);
                        //分页计算
                        var pages = 0;
                        var page = args.options.skip/args.options.limit +1;
                        if(count > 0) { 
                            pages = Math.ceil(count/args.options.limit); 
                        }
                        if (page > pages) 
                            page=pages;
                        if(callback) callback(err,{rows:docs,total:count,page:page,pages:pages});
                    });
                }else{
                    if(callback) callback(err,docs);
                }
            });               
        });
    },
    // 关闭连接
    close : function(){
        if(this.db) this.db.close();
    },
    
    // 保存方法
    save : function(collection,doc,callback){
        //对字段进行过滤，转换数据类型，设置默认值,验证数据不否合法
        var newdoc = doc;
        //注意，所有mongodb中的collection 名都转变为全小写字母
        this.db.collection(collection,function(err, coll){
            if(!newdoc._id){
                coll.save(newdoc, {safe:true},function(err,doc){
                    //console.dir(callback);
                    callback(err, doc);
                });
            }else{
                dbutil.findOne(collection,{_id:newdoc._id},function(err, doc){
                    for(f in newdoc)
                        doc[f] = newdoc[f];
                    coll.save(doc, {safe:true},function(err,updatednum){
                        callback(err, doc);
                    });
                });   
            }
        });
        
    },
    // 批量更新方法
    update : function(collection,query,update,options,callback){
        //对字段进行过滤，转换数据类型，设置默认值,验证数据不否合法
        //update.$set = dbutil.fileterFormat(collection,update.$set);
        // 对_id字符串转为ObjectId
        if(query._id){
            query._id = str2ObjectID(query._id);
        }
        //注意，所有mongodb中的collection 名都转变为全小写字母
        this.db.collection(collection,function(err, coll){
            coll.update(query,update,options,callback);
            //coll.update({_id:{$in:[new ObjectID('4ddc67f10418590d0c0018c3'),new ObjectID('4ddc68160418590d0c0018c6')]}},
            //             {$set:{status:-1}},{safe:true,multi:true,upsert:false},callback);
        });
        
    }
};

