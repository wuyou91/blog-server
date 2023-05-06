const formidable = require('formidable')
const adminModel = require('../mongodb/models/admin')
const visitorModel = require('../mongodb/models/visitor')
const articleModel = require('../mongodb/models/article.js')

const util = require('../util')

module.exports = {
  // 登陆
  async login (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err,fields,files) => {
      if(err){
        res.send({
          status: 0,
          message: '登录出错'
        })
        return
      }
      const{name, password} = fields
      try {
        if(!name){
          throw new Error('用户名参数出错')
        }else if(!password){
          throw new Error('密码参数出错')
        }
      } catch (error) {
        res.send({
          status: 0,
          message: error.message
        })
        return
      }
      try {
        const adminInfo = await adminModel.findOne({name})
        if(!adminInfo){
          res.send({
            status: 0,
            message: '用户不存在'
          })
        }else{
          if(password === adminInfo.password){
            req.session.admin_id = adminInfo.id
            adminInfo.last_login_time = util.formatDateTime()
            adminInfo.save()
            res.send({
              status: 1,
              message: '登录成功'
            })
          }else{
            res.send({
              status:0,
              message: '密码不正确'
            })
          }
        }
      } catch (error) {
        res.send({
          status: 0,
          message: '管理员登录失败'
        })
      }
    })
  },
  // 退出
  async singout(req,res) {
    try{
			delete req.session.admin_id;
			res.send({
				status: 1,
				message: '退出成功'
			})
		}catch(err){
			console.log('退出失败', err)
			res.send({
				status: 0,
				message: '退出失败'
			})
		}
  },
  // 注册
  async register (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err,fields,files) => {
      if (err) {
				res.send({
					status: 0,
					message: '表单信息错误'
				})
				return
      }
      const{name, password} = fields
      try {
        if(!name){
          throw new Error('用户名不正确，注册失败')
        }else if(!password){
          throw new Error('密码错误，注册失败')
        }
      } catch (error) {
        res.send({
          status: 0,
          message: error.message
        })
        return
      }
      try {
        const adminInfo = await adminModel.findOne({name})
        if(adminInfo){
          res.send({
            status: 0,
            message: '用户名已存在，注册失败'
          })
        }else{
          const admin_index = await util.getId('admin_id')
          const id = util.PrefixInteger(admin_index, 6)
          const create_time = util.formatDateTime()
          console.log(id)
          await adminModel.create({
            id,
            name,
            password,
            create_time,
            last_login_time: create_time
          })
          req.session.admin_id = id;
          res.send({
            status: 1,
            message: '注册成功！'
          })
        }
      } catch (error) {
        console.log(error)
        res.send({
          status: 0,
          message: '注册管理员失败'
        })
      }
    })
  },
  // 获取概览信息
  async getInfo (req, res) {
    const id = req.session.admin_id
    if(!id){
      res.send({
        status: 0,
        message: '获取数据失败'
      })
      return
    }
    try {
      const adminInfo = await adminModel.findOne({id}, '-_id -__v -password')
      if(!adminInfo){
        res.send({
          status: 0,
          message: '未找到管理员信息'
        })
      }else{
        res.send({
          status: 1,
          message: '获取数据成功',
          data: adminInfo
        })
      }
    } catch (error) {
      res.send({
        status: 0,
        message: '管理员信息获取失败'
      })
    }
  },
  // 获取管理员列表
  async getList(req, res) {
    try {
      const adminList = await adminModel.find({ grade: { $ne: 0 } }, '-__v -_id -password')
      const total = await adminModel.countDocuments()
      res.send({
        status: 1,
        data: adminList,
        total,
        message: '获取管理员列表成功'
      })
    } catch (error) {
      console.log('出错了')
    }
  },
  // 获取访客列表
  async visitor(req,res) {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)
    const skip = limit*(page-1)
    try {
      const visitorList = await visitorModel.find().sort({'id':1}).limit(limit).skip(skip)
      const visitorTotal = await visitorModel.countDocuments()
      res.send({
        status: 1,
        total: visitorTotal,
        data: visitorList,
        message: '数据请求成功'
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 获取访客统计
  async visitorCount(req,res) {
    try {
      const count = await visitorModel.aggregate([{ $group : { _id : null, count : {$sum : "$visit_count"}}}])
      res.send({
        status: 1,
        data:count,
        message: '访问总量获取成功'
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 文章统计
  async blogInfo(req,res){
    try {
      const visitorCount = await visitorModel.aggregate([{ $group : { _id : null, count : {$sum : "$visit_count"}}}])
      const articleCount = await articleModel.countDocuments()
      const deletedArticle = await articleModel.countDocuments({"deleted":true})
      res.send({
        status: 1,
        data:{
          visitorCount:visitorCount[0] ? visitorCount[0].count : 0,
          articleCount,
          deletedArticle
        },
        message: 'blog概览数据请求成功'
      })
    } catch (error) {
      res.send({
        status:0,
        message: error.message
      })
      console.log(error)
    }
  }

}