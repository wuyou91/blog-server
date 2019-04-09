const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const photoModel = require('../mongodb/models/photo.js')
const util = require('../util')
const qiniu = require('qiniu')
const qinueKey = require('../config/production')['qiniuKey'];

function uploadToQiniu(localFile,key,options){
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    
    const mac = new qiniu.auth.digest.Mac(qinueKey.accessKey, qinueKey.secretKey);
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken =  putPolicy.uploadToken(mac);
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
            respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                resolve(respBody)
            } else {
                console.log(respBody);
                reject(respInfo.statusCode)
            }
        })
    })
}

module.exports = {
    uploadPhoto(req,res) {
        const allFiles = []
        const form = new formidable.IncomingForm()
        form.uploadDir = './public/img';
        form.parse(req, (err, fields, files)=>{
            const { photoType , photoClassify } = fields
            if (!['.jpg', '.jpeg', '.png', 'gif'].includes(path.extname(files.file.name))) {
                fs.unlinkSync(files.file.path);
                res.send({
                    status: 0,
                    type: 'warning',
                    message: '文件格式错误'
                })
                return
            }
            const hashName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16) + '_' + files.file.name;
            const repath = './public/img/' + hashName;
            fs.rename(files.file.path, repath, (err) => {
                if(err){
                    res.send({
                        status:0,
                        type:'error',
                        message: '重命名文件出错'
                    })
                    fs.unlinkSync(repath);
                    return
                }
                const qiniuOptions = {
                    scope: 'blog',
                    returnBody: '{"name":"$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)","width":"$(imageInfo.width)","height":"$(imageInfo.height)","type":"$(mimeType)"}'
                }
                uploadToQiniu(repath, `${photoType}/${hashName}`, qiniuOptions).then(async (respBody) => {
                    await photoModel.create({
                        ...respBody,
                        size: (Number(respBody.size)/1024/1024).toFixed(2),
                        type: photoType,
                        classify: photoClassify
                    })
                    fs.unlinkSync(repath);
                    res.send({
                        status:1,
                        type:'success',
                        message: respBody.name
                    })
                })
            })
        })
    },
    async list(req,res) {
        const limit = Number(req.query.limit)
        const page = Number(req.query.page)
        const skip = limit*(page-1)
        if(req.query.deleted){
          try {
            const photoList = await photoModel.find({"deleted":true}, '-_id -__v -deleted').sort({'upload_date':-1}).limit(limit).skip(skip)
            const photoTotal = await photoModel.countDocuments({"deleted":true})
            res.send({
              status: 1,
              total: photoTotal,
              data: photoList,
              message: '数据请求成功'
            })
          } catch (error) {
            console.log(error)
          }
        }else{
            if(req.query.type){
                try {
                    const photoList = await photoModel.find({"deleted":{$ne: true}, type:req.query.type}, '-_id -__v -deleted').sort({'upload_date':-1}).limit(limit).skip(skip)
                    const photoTotal = await photoModel.countDocuments({"deleted":{$ne: true}, type:req.query.type})
                    res.send({
                      status: 1,
                      total: photoTotal,
                      data: photoList,
                      message: '数据请求成功'
                    })
                  } catch (error) {
                    console.log(error)
                  }
        
            }else{
                try {
                    const photoList = await photoModel.find({"deleted":{$ne: true}}, '-_id -__v -deleted').sort({'upload_date':-1}).limit(limit).skip(skip)
                    const photoTotal = await photoModel.countDocuments({"deleted":{$ne: true}})
                    res.send({
                      status: 1,
                      total: photoTotal,
                      data: photoList,
                      message: '数据请求成功'
                    })
                  } catch (error) {
                    console.log(error)
                  }        
            }
        }
    },
}