// +----------------------------------------------------------------------
// | MINO [ WHAT DO YOU NODE ]
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
 * MONO mongo
  +------------------------------------------------------------------------------
 * @package  core.db
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */
var mongo = require("mongodb"),
    ObjectID = mongo.ObjectID;
exports.str2ObjectID = str2ObjectID = function(obj){
    if(typeof obj === 'string'){
       // console.log('doing...    ' + new ObjectID(obj));
        return new ObjectID(obj);
    
    }else if(typeof obj === 'object' ){
        for(var i in obj){
            obj[i] = str2ObjectID(obj[i]);
            //console.log('done.   '+i);
            //console.log(obj[i] instanceof ObjectID);
        }
        return obj;
    }      
}
/*
a = {_id:{$in:['4ddc67be0418590d0c0018c1','4ddc67be0418590d0c0018c2','4ddc67be0418590d0c0018c3'],$or:'4ddc67be0418590d0c0018c4',$and:{aaa:'4ddc67be0418590d0c0018c5'}}};
a._id = str2ObjectID(a._id);

console.log('over.');
console.dir(a);
*/
