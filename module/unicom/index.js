/**
  +------------------------------------------------------------------------------
 * MONO unicom 活动
  +------------------------------------------------------------------------------
 * @package  module.unicom
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */
exports.api = {
    index:function(request,response){
        //TODO
        var dateTime=new Date();
        response.end(dateTime.toString());
 
        //response.end();
        
    }
}



