## node server
基于node的个人网站服务器程序

## 技术栈
**node + express + mongodb + nginx**

## 项目结构
～～～
├── app.js                              // 项目启动主文件               
├── config                              // 项目配置文件夹
│   ├── default.js
│   ├── development.js
│   └── production.js
├── controller                          // 请求处理的文件夹
│   ├── admin.js                            
│   ├── article.js                          
│   └── photo.js                            
├── ecosystem.json                      // pm2配置文件
├── logs                                // 日志文件夹
│   ├── error.log
│   └── out.log
├── middlewares                         // 中间件文件夹
│   ├── checkLogin.js
│   └── visitorCount.js
├── mongodb                             // 数据库文件夹
│   ├── db.js                               
│   └── models 
│       ├── admin.js
│       ├── article.js
│       ├── ids.js
│       ├── photo.js
│       └── visitor.js
├── package.json                        // node配置文件
├── public                              // 静态文件全用的nginx开启，express服务没有设置静态目录。此文件主要用来转存图片到七牛
│   ├── img
│   └── index.html
├── router                              // 路由文件夹
│   ├── admin.js
│   ├── article.js
│   ├── index.js
│   └── photo.js
└── util                                // 工具函数文件夹
    └── index.js
～～～

## 项目截图
![img](/screenshot/01.png)