/**
 * @fileoverview Main entry point for the K-OS Portfolio Data API.
 * This Lambda function retrieves specific data segments (Projects, Experience, etc.)
 * from DynamoDB based on a unique ID.
 */

const { GetCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { db, logger, buildResponse } = require("../utils");

/**
 * Lambda handler to fetch portfolio items.
 * @param {String} id - Unique identifier for the portfolio item.
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

/**
 * Fetches all public portfolio segments.
 * @returns {Promise<Array>} List of all public portfolio items.
 */
const getAllPortfolioSegments = async () => {
  const publicTypes = [
    "ASSET",
    "BRAND",
    "CONFIG",
    "CONTACT",
    "EXPERIENCE",
    "IDENTITY",
    "LEARNING_STATUS",
    "PROJECT",
    "RESUME",
    "SKILL",
    "TERMINAL_CONFIG",
    "TESTIMONIAL",
  ];

  const segmentPromises = publicTypes.map((type) =>
    db.send(
      new QueryCommand({
        TableName: process.env.TableName,
        IndexName: "TypeIndex",
        KeyConditionExpression: "#t = :type",
        ExpressionAttributeNames: { "#t": "type" },
        ExpressionAttributeValues: { ":type": type },
      }),
    ),
  );

  const results = await Promise.all(segmentPromises);

  // Flatten all results into a single "Memory Disk"
  return results.flatMap((result) => result.Items || []);
};

/**
 * Fetches items belonging to a specific type using the GSI.
 * @param {string} type - The type of portfolio items to fetch (e.g., "PROJECT").
 * @returns {Promise<Array>} List of items matching the specified type.
 */
const getPortfolioByType = async (type) => {
  // Security: Block any manual attempts to fetch MESSAGE type via URL
  if (type === "MESSAGE") return [];

  const command = new QueryCommand({
    TableName: process.env.TableName,
    IndexName: "TypeIndex",
    KeyConditionExpression: "#t = :type",
    ExpressionAttributeNames: { "#t": "type" },
    ExpressionAttributeValues: { ":type": type },
  });

  const result = await db.send(command);
  return result.Items || [];
};

const handleRequest = async (queryStringParameters = {}) => {
  const { id, type } = queryStringParameters;

  if (id) {
    const portfolioItem = await getPortfolioById(id);
    if (!portfolioItem) {
      return buildResponse(404, { error: "Data segment not found" }, false);
    }

    return buildResponse(200, portfolioItem, false);
  }

  if (type) {
    const portfolioItems = await getPortfolioByType(type);
    return buildResponse(200, portfolioItems, false);
  }

  const systemMemory = await getAllPortfolioSegments();
  return buildResponse(200, systemMemory, false);
};

module.exports.handler = async (event) => {
  logger("Received event:", JSON.stringify(event));

  try {
    const response = await handleRequest(event.queryStringParameters);
    return response;
  } catch (error) {
    logger("DynamoDB Error", error);
    return buildResponse(500, { error: "System fault: Internal Server Error" }, false);
  }
};
