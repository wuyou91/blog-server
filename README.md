## node server
基于node的个人网站服务器程序

## 技术栈
**node + express + mongodb + nginx**

* [前台网站项目地址](https://github.com/wuyou91/website-view)
* [后台管理项目地址](https://github.com/wuyou91/website-admin)

## 项目简介
这是一个基于node的express框架的web服务器程序；数据库采用mongodb，用mongoose库来操作数据库。利用config-lite包管理配置文件，以应对不同的运行环境。用cross-env包实现跨平台设置NODE_ENV变量。
实现了文章管理、编辑和删除，图片上传，用户注册及登陆验证等功能。
项目登陆采用session验证。在实践过程中因为服务器和管理页面分别在不同的二级域名下，所以需要处理跨域的session，需在配置cookie时将domain设置在以及域名下，已实现二级域名共享session。
项目上传图片全部经服务器转存至七牛云，服务器根据七牛的返回值将图片数据存入数据库。

## 项目结构
~~~
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
~~~

## 项目截图
后台管理系统登陆页
![img](http://static.cdn.yancx.cn/mkd/1.jpg)

用户中心
![img](http://static.cdn.yancx.cn/mkd/2.jpg)

文章管理
![img](http://static.cdn.yancx.cn/mkd/3.jpg)

添加文章
![img](http://static.cdn.yancx.cn/mkd/4.jpg)

图片上传
![img](http://static.cdn.yancx.cn/mkd/5.jpg)

访客统计
![img](http://static.cdn.yancx.cn/mkd/6.jpg)

前台首页
![img](http://static.cdn.yancx.cn/mkd/7.jpg)

文章内容页
![img](http://static.cdn.yancx.cn/mkd/8.jpg)

瀑布流图片展示页
![img](http://static.cdn.yancx.cn/mkd/9.jpg)

## 项目预览
[后台管理系统](http://admin.yancx.cn)
[前台页面](http://www.yancx.cn)

## to do
* 图片编辑
* 服务器进一步优化
* 评论系统
* 更多功能模块

## how to use
~~~
// 克隆项目到本地
git clone https://github.com/wuyou91/node-server.git

// 安装依赖
npm install

//启动数据库
mongod

// 运行项目
npm run start
~~~


