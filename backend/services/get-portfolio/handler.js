/**
 * @fileoverview Main entry point for the Cyber-OS Portfolio Data API.
 * This Lambda function retrieves specific data segments (Projects, Experience, etc.) 
 * from DynamoDB based on a unique ID.
 */

const { GetCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { db, logger, buildResponse } = require("../utils");


/**
 * Lambda handler to fetch portfolio items.
 * @param {Object} event - The AWS Lambda event object.
 * @returns {Promise<Object>} API Gateway compatible response object.
 */
const getPortfolioById = async (id) => {
  if (!id) return null;

  const command = new GetCommand({
    TableName: process.env.TableName,
    Key: { id },
  });

  const result = await db.send(command);
  return result.Item || null;
};

const getAllPortfolioSegments = async () => {
  const [projects, experience] = await Promise.all([
    db.send(new QueryCommand({
      TableName: process.env.TableName,
      IndexName: "TypeIndex",
      KeyConditionExpression: "#t = :type",
      ExpressionAttributeNames: { "#t": "type" },
      ExpressionAttributeValues: { ":type": "PROJECT" },
    })),
    db.send(new QueryCommand({
      TableName: process.env.TableName,
      IndexName: "TypeIndex",
      KeyConditionExpression: "#t = :type",
      ExpressionAttributeNames: { "#t": "type" },
      ExpressionAttributeValues: { ":type": "EXPERIENCE" },
    })),
  ]);

  return [...(projects.Items || []), ...(experience.Items || [])];
};

const handleRequest = async (queryStringParameters = {}) => {
  const { id } = queryStringParameters;

  if (!id) {
    const systemMemory = await getAllPortfolioSegments();
    return buildResponse(200, systemMemory);
  }

  const portfolioItem = await getPortfolioById(id);
  if (!portfolioItem) {
    return buildResponse(404, { error: "Data segment not found" });
  }

  return buildResponse(200, portfolioItem);
};

module.exports.handler = async (event) => {
  logger("Received event:", JSON.stringify(event));

  try {
    const response = await handleRequest(event.queryStringParameters);
    return response;
  } catch (error) {
    logger("DynamoDB Error", error);
    return buildResponse(500, { error: "System fault: Internal Server Error" });
  }
};
