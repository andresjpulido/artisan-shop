module.exports.tryCatch = (controller) => async (req, res, next) => {
    console.log("init trycatch 0")
    
    try {
        console.log("init trycatch")
      await controller(req, res);
    
    } catch (error) {
        console.log(error)
      return next(error);
    }

  };
