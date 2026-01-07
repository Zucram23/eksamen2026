// middleware/logger.js
// Middleware som logger alle indkommende HTTP-requests.
// Bruges på tværs af applikationen.
// Ligger uden for MVC, da middleware er tværgående funktionalitet.

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
};


module.exports = { logger };