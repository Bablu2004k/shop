// 404 handler - runs when no route is matched

const notFound = (req, res, next) => {
    res.status(404).json({
        success: false, message: "Router not found"
    })
}

// error handler 
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // mongoose bad objectId
    if(err.name === "CastError") {
        return res.status(400).json({
            success: false, message: "Invalid ID format"
        })
    }

    // mongoose validation error
    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map((e) => e.message)
        return res.status(400).json({
            success: false, message: message.join(",")
        })
    }
    // fallback for anything else
        res.status(500).json({ success: false, message: "server error"})
}

module.exports = {notFound, errorHandler}