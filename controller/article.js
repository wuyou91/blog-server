const formidable = require('formidable')
const articleModel = require('../mongodb/models/article.js')
const util = require('../util')

module.exports = {
  async add (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
					message: '表单信息错误'
        })
        return
      }
      if(!fields.html || fields.html === ''){
        res.send({
          status: 0,
					message: '请勿提交无内容的文章'
        })
        return
      }
      try {
        const article_index = await util.getId('article_id')
        const create_date = new Date()
        const date_string = create_date.toLocaleString()
        await articleModel.create({
          ...fields,
          create_date,
          date_string,
          id: util.PrefixInteger(article_index, 6)
        })
        res.send({
          status: 1,
          message: '文章提交成功'
        })
      } catch (error) {
        res.send({
          status: 0,
          message: '写入文章出现错误'
        })
        throw Error(error)
      }
    })
  },
  async delete(req, res) {
    if(req.query.id){
      try{
        await articleModel.deleteOne({ id: req.query.id});
        res.send({
          status:1,
          message: '文章删除成功'
        })
      }catch(err){
        res.send({
          status:0,
          message: '删除出现错误'
        })
        throw Error(err)
      }  
    }else{
      res.send({
        status:0,
        message: '未获取到文章id，请重新操作'
      })
    }
  },
  async update (req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const id = fields.article_id
      const content = fields.content
      if(!id){
        res.send({
          status: 0,
          message: '没有文章id'
        })
      }
      try {
        await articleModel.update({id:id},content)
        res.send({
          status: 1,
          message: '文章更新成功'
        })      
      } catch (err) {
        res.send({
          status: 0,
          message: '更新失败'
        }) 
        throw Error(err)     
      }
    })
  },
  async list(req,res) {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)
    const skip = limit*(page-1)
    try {
      const articleList = await articleModel.find({}, '-_id -__v -html -create_date').sort({'create_date':1}).limit(limit).skip(skip)
      const articleTotal = await articleModel.count()
      res.send({
        status: 1,
        total: articleTotal,
        data: articleList,
        message: '数据请求成功'
      })
    } catch (error) {
      console.log(error)
    }
  },
  async get(req, res) {
    const id = req.params.article_id
    const data = await articleModel.findOne({id}, '-__v -_id -create_date')
    // const data = await articleModel.findOne({id},{$inc:{ clicks:1 }}, '-__v -_id -create_date')
    res.send({
      status: 1,
      data,
      message: 'OK'
    })
  }
}