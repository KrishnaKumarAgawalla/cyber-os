/**
 * @fileoverview Database Seeding Script for Cyber-OS.
 * This script populates the DynamoDB table with project and experience data.
 * Run this locally using: node seed.js
 */

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require("fs");

// Initialize the Document Client
const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

// Use the development table name by default
const TABLE_NAME = "CyberOS_Data_dev";

/**
 * Uploads a single data object to DynamoDB.
 * @param {Object} item - The data segment (Project or Experience).
 */
const seedItem = async (item) => {
  try {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    });
    await docClient.send(command);
    console.log(`Successfully indexed: ${item.id} [${item.type}]`);
  } catch (err) {
    console.error(`Failed to index ${item.id}:`, err.message);
  }
};

/**
 * Main execution function to read local JSON and push to AWS.
 */
const runSeeder = async () => {
  console.log("Starting Cyber-OS Data Transmission...");

  // 1. Check if the private data file exists
  if (!fs.existsSync("./seedData.json")) {
    console.error("CRITICAL: seedData.json not found. Please sync from your Private Vault.");
    process.exit(1);
  }

  // 2. Load the data
  const data = JSON.parse(fs.readFileSync("./seedData.json", "utf8"));

  // 3. Iteratively push items to the "Always Free" table
  for (const item of data) {
    await seedItem(item);
  }

  console.log("Transmission Complete. System memory updated.");
};

runSeeder();