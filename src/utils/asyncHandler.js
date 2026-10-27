
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((error) => next(error))
    }
}

export { asyncHandler }


// wrapper function in try catch block
/*
// const asyncHandler1 = (fn) => { async () => {}} // niche jo function hai hai uska ye matlab hai bas curely braces nai likha

const asyncHandler1 = (fn) => async (req, res, next) => {
    try{
        await fn(req, res, next) 

    }
    catch(error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }

}  
    */