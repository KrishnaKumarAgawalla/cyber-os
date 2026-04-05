const { PutCommand, DeleteCommand, BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");
const { db, logger, parseBody, buildResponse } = require("../utils");

const BATCH_SIZE = 20;

/**
 * Lambda handler for managing inventory in DynamoDB (create/update/delete).
 * @param {Object} event - The API Gateway event object.
 * @param {Object} event.requestContext.http - Contains HTTP method.
 * @param {string} [event.body] - JSON string payload for POST/DELETE operations.
 * @returns {Promise<Object>} API Gateway-compatible response.
 */
module.exports.handler = async (event) => {
  logger("Received event", event);

  const method = event.requestContext?.http?.method;
  const body = parseBody(event.body);

  if (body === null) {
    return buildResponse(400, { error: "Invalid JSON payload" }, false);
  }

  logger("Request method", method);
  logger("Request body", body);

  try {
    if (method === "POST") {
      if (Array.isArray(body)) {
        const writeRequests = body.map(item => ({ PutRequest: { Item: item } }));

        for (let i = 0; i < writeRequests.length; i += BATCH_SIZE) {
          const batch = writeRequests.slice(i, i + BATCH_SIZE);
          logger("Sending batch of items", { batchSize: batch.length, startIndex: i });

          await db.send(new BatchWriteCommand({
            RequestItems: {
              [process.env.TableName]: batch,
            },
          }));
        }

        return buildResponse(200, { message: `Batch synchronization of ${body.length} items complete.` }, false);
      }

      await db.send(new PutCommand({ TableName: process.env.TableName, Item: body }));
      return buildResponse(200, { message: "K-OS Memory Updated/Synchronized" }, false);
    }

    if (method === "DELETE") {
      if (!body.id) {
        logger("Missing ID for delete", body);
        return buildResponse(400, { error: "Missing ID for purge operation" }, false);
      }

      await db.send(new DeleteCommand({ TableName: process.env.TableName, Key: { id: body.id } }));
      logger("DynamoDB delete succeeded", { id: body.id });
      return buildResponse(200, { message: "Data Segment Purged" }, false);
    }

    return buildResponse(405, { error: "Method Not Allowed" }, false);
  } catch (error) {
    logger("Management error", error);
    return buildResponse(500, { error: error.message }, false);
  }
};