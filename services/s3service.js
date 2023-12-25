const AWS = require('aws-sdk');

exports.uploadTos3 = (data,filename) =>{

    const BUCKET_NAME = "expense000"
    const IAM_USER_KEY = "AKIASRMXEIUXYYHYGNRT"
    const IAM_USER_SECRET = "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"

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,

    })
    const fileContent  = Buffer.from(data, 'binary');


    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: "image/jpeg"
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log(err)
                reject(err);
            }else{
                console.log('success',s3response);
                resolve(s3response.Location);   
            }
        // });
    })
    })
    
}
