const Ids = require('../mongodb/models/ids')
const util = {
  types: ['article_id', 'admin_id', 'visitor_id'],
  async getId(type){
    if(!this.types.includes(type)){
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
  },
  randNum(min,max) {
    return parseInt(Math.random()*(max-min+1)+min,10)
  }
}

module.exports = util