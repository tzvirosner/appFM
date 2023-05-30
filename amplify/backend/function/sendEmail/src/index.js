const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

const client = new SESv2Client({ region: "us-east-1" });

const sendEmail = async ( message) => {
    const defaultFromEmailAddress = "info@appfm.io";
    const input = {
        FromEmailAddress: defaultFromEmailAddress, // required
        Destination: {
            ToAddresses: [
                defaultFromEmailAddress,
            ],
        },
        ReplyToAddresses: [
            defaultFromEmailAddress
        ],
        Content: { // EmailContent
            Simple: { // Message
                Subject: { // Content
                    Data: "Contact us form - appfm.io", // required
                },
                Body: { // Body
                    Text: {
                        Data: message || "No comment provided", // required
                    },
                },
            },

        },

    };

    const command = new SendEmailCommand(input);
    return await client.send(command);
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    const { message} = JSON.parse(event.body);
    return await sendEmail(message).then(r => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify("Successful"),
            "isBase64Encoded": false,
        };
    }).catch((e) => {
        console.log("error", e);
        return {
            body: JSON.stringify(e),
            statusCode: 500,
        }
    });
};
