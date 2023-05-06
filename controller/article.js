const formidable = require('formidable')
const articleModel = require('../mongodb/models/article.js')
const tagModel = require('../mongodb/models/tag.js')
const dbFn = require('../mongodb/method.js')
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
        const clicks = util.randNum(45,260)
        const stars = util.randNum(2,24)
        const article_index = await util.getId('article_id')
        const create_date = util.formatDateTime()
        const tags = fields.tags || []
        dbFn.addOrUpdateTag(tags)
        if (!fields.cover) {
          delete fields.cover
        }
        await articleModel.create({
          ...fields,
          clicks,
          stars,
          create_date,
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
    if (req.query.id) {
      if (req.query.remove) {
        // 真删除
        try {
          await articleModel.deleteOne({ id: req.query.id })
          res.send({
            status:1,
            message: '文章已从回收站删除！'
          })
        } catch (error) {
          res.send({
            status:0,
            message: '从回收站删除出现错误'
          })
          throw Error(err)
        }
      } else {
        // 加入回收站
        try{
          const article = await articleModel.findOneAndUpdate({ id: req.query.id }, { deleted: true });
          const tags = article.tags
          tags.forEach( async item => {
            await tagModel.updateOne({ name: item }, {$inc: {useNum: -1}})
          })
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
      }
    }else{
      res.send({
        status:0,
        message: '未获取到文章id，请重新操作'
      })
    }
  },
  async recovery(req, res) {
    const id = req.query.id
    const article = await articleModel.findOne({ id })
    const tags = article.tags || []
    article.deleted = false
    article.save()
    dbFn.addOrUpdateTag(tags)
    res.send({
      status: 1,
      message: '恢复成功'
    })
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
        const article = await articleModel.findOne({ id })
        const oldTagArr = article.tags
        const newTagarr = content.tags
        await article.update(content)
        const newAdd = util.filter2Array(newTagarr, oldTagArr)
        const subtract = util.filter2Array(oldTagArr, newTagarr)
        console.log('n:', newAdd)
        console.log('s:', subtract)
        dbFn.addOrUpdateTag(newAdd)
        subtract.forEach(async x => {
          await tagModel.updateOne({name : x}, {$inc: {useNum: -1}})
        })
        res.send({
          status: 1,
          message: '文章更新成功'
        })      
      } catch (err) {
        res.send({
          status: 0,
          message: '操作失败'
        }) 
        throw Error(err)     
      }
    })
  },
  async list(req,res) {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)
    const skip = limit*(page-1)
    if(req.query.deleted){
      try {
        const articleList = await articleModel.find({"deleted":true}, '-_id -__v -html').sort({'create_date':-1}).limit(limit).skip(skip)
        const articleTotal = await articleModel.countDocuments({"deleted":true})
        res.send({
          status: 1,
          total: articleTotal,
          data: articleList,
          message: '数据请求成功'
        })
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const articleList = await articleModel.find({"deleted":{$ne: true}}, '-_id -__v -html').sort({'create_date':-1}).limit(limit).skip(skip)
        const articleTotal = await articleModel.countDocuments({"deleted":{$ne: true}})
        res.send({
          status: 1,
          total: articleTotal,
          data: articleList,
          message: '数据请求成功'
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  async hot(req,res) {
    try {
      const articleList = await articleModel.find({"deleted":{$ne: true}}, '-_id -__v -html').sort({'clicks':-1}).limit(5)
      res.send({
        status: 1,
        data: articleList,
        message: '数据请求成功'
      })
    } catch (error) {
      console.log(error)
    }
  },
  async handleClick(req, res) {
    const id = req.params.article_id
    const data = await articleModel.findOneAndUpdate({id},{$inc:{ clicks:1 }},{projection: { "__v" : 0, "_id" : 0 }})
    res.send({
      status: 1,
      data,
      message: 'OK'
    })
  },
  async star(req, res) {
    const { id, type }= req.query
    try {
      if(type === 'star') {
        await articleModel.updateOne({id}, {$inc:{ stars: 1}})
        res.send({
          status: 1,
          message: '加心成功'
        })
      }else{
        await articleModel.updateOne({id}, {$inc:{ stars: -1}})
        res.send({
          status: 1,
          message: '取消加心成功'
        })
      } 
    } catch (error) {
      res.send({
        status: 0,
        message: '操作失败'
      })
    }
  }
}