const userRouter = require('./user')
const eventRouter = require('./event')
const {errorHandler,notFound} = require('../middlewares/errHandler')

const initRoutes = (app)=>{
    app.use('/api/user', userRouter)
    app.use('/api/event', eventRouter)
 

    app.use(notFound)
    app.use(errorHandler)
}


module.exports= initRoutes