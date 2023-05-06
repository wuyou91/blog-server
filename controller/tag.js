const tagModel = require('../mongodb/models/tag')

module.exports = {
    async list (req, res) {
        const tagList = await tagModel.find() || []
        res.send({
            status:1,
            type:'success',
            message: "操作成功！",
            data: tagList
        })
    },
    async hotTag(req,res) {
        const hotTag = await tagModel.find().sort({ useNum: -1 }).limit(20)
        res.send({
            status:1,
            type:'success',
            message: "操作成功！",
            data: hotTag
        })
    }
}