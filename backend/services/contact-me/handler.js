const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { db, logger, buildResponse } = require("../utils");

const sns = new SNSClient({ region: "us-east-1" });
const DAYS_TO_KEEP = 30;

/**
 * Lambda handler for inbound “contact me” messages.
 * Stores contact data in DynamoDB and notifies an SNS topic.
 * @param {Object} event - The API Gateway event object.
 * @param {Object} event.body - JSON string containing name, email, and message.
 * @returns {Promise<Object>} API Gateway response object.
 */
module.exports.handler = async (event) => {
  logger("Received event", event);

  if (!event.body) {
    logger("Missing request body");
    return buildResponse(400, { error: "Request body is required" });
  }

  try {
    const { name, email, message } = JSON.parse(event.body);
    logger("Parsed incoming message", { name, email, message });

    const expirationTime =
      Math.floor(Date.now() / 1000) + DAYS_TO_KEEP * 24 * 60 * 60;

    // 1. Store in Always-Free DynamoDB (25GB limit)
    const item = {
      id: `MSG#${Date.now()}`,
      type: "CONTACT",
      sender: name,
      contactEmail: email,
      text: message,
      date: new Date().toISOString(),
      expiresAt: expirationTime, // TTL attribute for automatic cleanup
    };

    await db.send(
      new PutCommand({ TableName: process.env.TableName, Item: item }),
    );
    logger("DynamoDB put succeeded", item);

    // 2. Publish to SNS Topic (Always Free up to 1k/month)
    // You'll create this "Topic" in the AWS Console and subscribe your email to it.
    const snsMessage = `Cyber-OS Alert!\nFrom: ${name} (${email})\nMessage: ${message}`;
    await sns.send(
      new PublishCommand({
        Message: snsMessage,
        Subject: "New Portfolio Message",
        TopicArn: process.env.SnsTopicArn,
      }),
    );
    logger("SNS publish succeeded", { topicArn: process.env.SnsTopicArn });

    return buildResponse(200, { message: "Inbound transmission successful." });
  } catch (err) {
    logger("Error in contact-me handler", err);
    return buildResponse(500, { error: err.message });
  }
};
