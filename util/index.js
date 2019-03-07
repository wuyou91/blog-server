const Ids = require('../mongodb/models/ids')
const util = {
  types: ['article_id', 'admin_id'],
  async getId(type){
    if(!this.types.includes(type)){
      console.log('id类型错误');
			throw new Error('id类型错误');
			return
    }
    try{
      const idData = await Ids.findOne();
      idData[type] ++
      await idData.save()
      return idData[type]
    }catch(err){
      console.log('获取id失败', err)
      throw new Error(err)
    }
  },
  PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }
}

module.exports = util