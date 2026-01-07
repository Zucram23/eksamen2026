// middleware/errorHandler.js
// Central fejlhåndtering for hele applikationen.
// Fanger og formatterer fejl fra controllers og routes.
// Ligger uden for MVC som global middleware.

module.exports = (err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
};

