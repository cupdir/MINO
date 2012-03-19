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
        pool.acquire(function(err,client) {
           
            client.find('phone',
                        {
                            query:{area:'1'},
                            fields:{},
                            options:{limit:2}
                        },
                        function(err,doc){               
                          if(doc){    
                              console.log(doc);
                              a = {list:doc,s:'1'};
                              response.render(request.params.module+'/'+request.params.method,{ list: a }); //http://expressjs.com/guide.html#view-rendering
                          }else{
                               response.end('null');
                          }
              
              pool.release(client);
            });
           
        });      
    }
}



