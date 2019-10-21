const AWS = require("aws-sdk")
const to = require('await-to-js').default
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { success, failure } = require("./response-helper")


module.exports = {
    processEvent: async () => {
        const databaseParameters = {
            TableName: "posts",
            AtributesToGet:[
                'id',
                'title',
                'author',
                'imageURL',
                'content',
                'createdAt'
            ]

        }

        let [ error,result ] = await to(dynamoDb.scan(databaseParameters).promise())

        if(error) {
            console.log(error)
            return failure({status:false})
        }

        return success(result.Items)
    }
}
