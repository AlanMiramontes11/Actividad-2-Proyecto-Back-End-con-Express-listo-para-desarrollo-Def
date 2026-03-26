function health(req, res){
    res.status(200).json({
        status: "ok",
        uptime: ProcessingInstruction.uptime(),
        timestamp: Date.now()
    })
}

module.exports = {health};