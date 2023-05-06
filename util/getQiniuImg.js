const photoModel = require('../mongodb/models/photo.js')
const http = require('http')
const sizeOf = require('image-size')
const util = require('./index.js')


const qiniu = require('qiniu')
const { rejects } = require('assert')
const qinueKey = require('../config/production')['qiniuKey'];

const mac = new qiniu.auth.digest.Mac(qinueKey.accessKey, qinueKey.secretKey);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

function getImglist(type) {
    const bucket = 'blog'

    // @param options 列举操作的可选参数
    //                prefix    列举的文件前缀
    //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
    //                limit     每次返回的最大列举文件数量
    //                delimiter 指定目录分隔符
    const options = {
        limit: 10,
        prefix: type + '/',
    };
    const fn = function() {
        bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
        if (err) {
            console.log('err:', err);
            throw err;
        }
        if (respInfo.statusCode == 200) {
            options.marker = respBody.marker
            const items = respBody.items;
            items.forEach(async (item, index, arr) => {
                http.get(encodeURI('http://blog.cdn.yancx.cn/' + item.key), (req, res) => {
                    let imgData = []
                    req.on('data', chunk => {
                        imgData.push(chunk)
                    })
                    req.on('end', async() => {
                        const buffer = Buffer.concat(imgData);
                        const img = sizeOf(buffer)
                        const photo_index = await util.getId('photo_id')
                        await photoModel.create({
                            name: item.key,
                            hash: item.hash,
                            size: (Number(item.fsize) / 1024 / 1024).toFixed(2),
                            bucket: 'blog',
                            type,
                            width: img.width,
                            height: img.height,
                            upload_date: util.formatDateTime(),
                            id: util.PrefixInteger(photo_index, 9)
                        })
                    })
                })
            });
            if (items.length >= options.limit) {
                fn()
            }
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
        });
    }
    fn()
}

module.exports = getImglist