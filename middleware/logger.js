function log(req,res,next) {
    console.log("Logging wait ...");
    next()
}

module.exports = log