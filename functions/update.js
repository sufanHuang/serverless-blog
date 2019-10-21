const AWS = require("aws-sdk")
const to = require('await-to-js').default
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { success, failure } = require("./response-helper")


module.exports = {
    processEvent: async (event) => {
        const requestBody = JSON.parse(event.body)
        const { title, imageURL, content } = requestBody
        const databaseParameters = {
            TableName: "posts",
            Key: {
                id: event.pathParameters.id
            },
            ConditionExpression: 'attribute_exists(id)',
            UpdateExpression: "set title= :title, content= :content, imageURL=:imageURL",
            ExpressionAttributeValues:{
                ':title': title,
                ':content': content,
                ':imageURL': imageURL
             },
            ReturnValues: "ALL_NEW"

        }

        let [ error,result ] = await to(dynamoDb.update(databaseParameters).promise())

        if(error) {
            console.log(error)
            return failure({status:false})
        }

        return success(result.Item)
    }
}
