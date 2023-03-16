const errorHandler=(err,req,res,next)=>{
    const errMsg=err.message || "Something went wrong"
    const errStatus=err.status || 500
    return res.status(errStatus).json({
        success:false,
        message:errMsg,
        status:errStatus,
        stack:err.stack
    })
}

module.exports=errorHandler