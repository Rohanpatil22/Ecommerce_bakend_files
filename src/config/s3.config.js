import aws from "aws-sdk"
import config from "./index.js"

const s3= new aws.S3({

    accessKeyId: config.s3.accessKeyId,
    secretAccessKey:config.S3_SECRET_ACCESS_KEY,
    region:config.S3_REGION

})

export default s3;