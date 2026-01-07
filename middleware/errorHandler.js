module.exports = (err, req, res, next) => {
    console.error('Error:', err?.message || err);
    res.status(err?.status || 500).json({
        error: 'Something went wrong'
    });
};
