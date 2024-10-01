const notFoundHandler = (req, res, next) => {
    res.status(404).json(
        {
            status: "error",
            tatusCode: 404,
            error: "404 Not Found",
            message: `Not Found: ${req.method} ${req.originalUrl}`
        }
    );
}

export default notFoundHandler;