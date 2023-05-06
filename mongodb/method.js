const tagModel = require('./models/tag')
module.exports = {
    addOrUpdateTag(tagArray) {
        tagArray.forEach(async (item) => {
            const tag = await tagModel.findOne({ name: item })
            if (!tag) {
                tagModel.create({
                name: item
                })
            } else {
                tag.useNum++
                tag.save()
            }
        })

    }
}