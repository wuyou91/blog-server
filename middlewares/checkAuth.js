const adminModel = require('../mongodb/models/admin')


module.exports = async function(req, res, next) {
    const user = await adminModel.findOne({ id: req.session.admin_id }) 
    if (!user) {
        return res.send({
            status: 49,
            message: '未登录，或登录已过期！'
        })
    } else {
        if (user.grade) {
            return res.send({
                status: 0,
                message: '所属用户没有权限'
            })
        } else {
            next()
        }
    }
}