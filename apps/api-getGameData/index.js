// apps/api-getGameData/index.js

/**

 *
 * @param {Object} req Cloud Functions request context.
 * @param {Object} res Cloud Functions response context.
 */
exports.getGameData = (req, res) => {
    console.log("getGameData function was triggered!");
    
    // For now, just send a simple success message
    res.status(200).send("Hello from getGameData!");
  };