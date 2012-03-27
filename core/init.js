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
 * MONO 初始化模板 session cookie
  +------------------------------------------------------------------------------
 * @package  core.init
 * @author   cupdir <cupdir@gmail.com>
 * @version  $Id$
  +------------------------------------------------------------------------------
 */
MI.configure(function(){
    
    MI.set("view engine", "html");
    /**
     *https://github.com/kof/node-jqtpl
     */
    MI.register(".html", require("jqtpl").express); 
    
    //添加到request对象中
    MI.set('view options', {
        layout: false,
        open: '{{',
        close: '}}'
    });
    MI.set('views', xiaomi.ROOT_PATH+'/views');
    MI.use(express.cookieParser()); //
    /**
     * 关于session 和cookie操作请参考本章
     * http://www.senchalabs.org/connect/middleware-session.html
     */
    MI.use(express.session({ secret: "xiaomi_mino" }));
    MI.use(express.methodOverride());
    MI.use(express.bodyParser());
    MI.use(MI.router);
});