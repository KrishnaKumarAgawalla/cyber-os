const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { buildResponse, parseBody } = require("../utils");
const https = require("https");

const lambda = new LambdaClient({ region: "us-east-1" });

/**
 * Streams an asset from R2 through the Lambda to hide the R2 URL.
 * This allows us to serve assets without exposing our R2 infrastructure and also enables centralized caching and encryption if needed.
 * @param {String} path - The path of the asset in R2 (e.g., "images/photo.jpg").
 * @returns {Promise<Object|null>} An object containing contentType and buffer, or null if not found.
 */
const proxyAsset = (path) => {
  return new Promise((resolve, reject) => {
    https
      .get(`${process.env.R2BaseURL}${path}`, (res) => {
        if (res.statusCode !== 200) resolve(null);
        let data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => {
          resolve({
            contentType: res.headers["content-type"],
            buffer: Buffer.concat(data),
          });
        });
      })
      .on("error", reject);
  });
};

/**
 * Main Lambda handler for the API Gateway.
 * Routes requests to internal Lambdas or serves assets based on query parameters.
 * @param {Object} event - The API Gateway event object.
 * @returns {Promise<Object>} API Gateway response object.
 */
module.exports.handler = async (event) => {
  const query = event.queryStringParameters || {};

  // 1. Asset Proxy Logic (Hide R2 Infrastructure)
  if (query.proxyAsset) {
    const asset = await proxyAsset(query.proxyAsset);
    if (!asset) return buildResponse(404, { error: "Asset not found" }, false);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": asset.contentType,
        "Cache-Control": "max-age=86400",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: asset.buffer.toString("base64"),
      isBase64Encoded: true,
    };
  }

  // 2. Internal Lambda Routing (Lambda-to-Lambda)
  let targetFunction = "";
  if (query.action === "getPortfolio")
    targetFunction = process.env.GetPortfolioLambda;
  if (query.action === "contact") targetFunction = process.env.ContactMeLambda;

  if (targetFunction) {
    const command = new InvokeCommand({
      FunctionName: targetFunction,
      Payload: JSON.stringify(event),
    });

    const result = await lambda.send(command);
    const payload = JSON.parse(Buffer.from(result.Payload).toString());

    // 3. Centralized Masking & Encryption
    // Swaps R2 links for Gateway Proxy links before encrypting
    const sanitizedBody = JSON.stringify(payload.body || payload).replace(
      new RegExp(process.env.R2BaseURL, "g"),
      "?proxyAsset=",
    );

    return buildResponse(
      payload.statusCode || 200,
      JSON.parse(sanitizedBody),
      true,
    );
  }

  return buildResponse(400, { error: "Invalid Action" }, false);
};
