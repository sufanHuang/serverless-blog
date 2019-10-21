const AWS = require("aws-sdk")
const uuid = require("uuid")
const to = require('await-to-js').default
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { success, failure } = require("./response-helper")


module.exports = {
    processEvent: async (event) => {
        const requestBody = JSON.parse(event.body)
        const { title, author, imageURL, content } = requestBody
        const databaseParameters = {
            TableName: "posts",
            Item: {
                id: uuid.v1(),
                title: title,
                author: author,
                imageURL: imageURL,
                content: content,
                createdAt: Date.now()
            }
        }

        let [ error ] = await to(dynamoDb.put(databaseParameters).promise())

        if(error) {
            console.log(error)
            return failure({status:false})
        }

        return success(databaseParameters.Item)
    }
}
