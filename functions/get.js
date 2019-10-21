const AWS = require("aws-sdk")
const to = require('await-to-js').default
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { success, failure } = require("./response-helper")


module.exports = {
    processEvent: async (event) => {
        const databaseParameters = {
            TableName: "posts",
            Key: {
                id: event.pathParameters.id,
            }
        }

        let [ error, result ] = await to(dynamoDb.get(databaseParameters).promise())

        if(error) {
            console.log(error)
            return failure({status:false})
        }

        return success(result.Item)
    }
}
