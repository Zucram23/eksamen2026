module.exports = (err, req, res,) => {
    console.error('Error:', err.message);
    res.status(404).json({ error: 'Something went wrong' });
};
