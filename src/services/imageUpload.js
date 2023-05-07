import s3 from "../config/s3.config";

export const s3FileUpload=async ({bucketName, key, body, contentType}) =>{

    return s3.upload({

        bucketName:bucketName,
        key:key,
        body:body,
        contentType:contentType
    }).promise()
}

export const s3FileDelete=async ({bucketName, key}) =>{

    return s3.deleteObject({

        bucketName:bucketName,
        key:key,
    }).promise()
}