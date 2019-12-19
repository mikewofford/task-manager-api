const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT //|| 3000 -removed thanks to environment variable in config folder


// This is middleware. Request method, prog does middle, then next
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests n/a')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//         res.status(503).send('Site under maintenance')
//     }
// )

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ', port)
})

const Task = require('./models/tasks')
const User = require('./models/user')

// Find task by user id
//const main = async () => {
    //const task = await Task.findById('5d3f9bf7a7192128b0979d7e')
    // Populates all owner info
    //await task.populate('owner').execPopulate()
    //console.log(task.owner)
    // const user = await User.findById('5d3f9a0ec4a0f83dacdf83f0')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
//}

//main()


// This is for hashing passwords
//const bcrypt = require('bcryptjs')


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id = 'id123' },'secretToken', { expiresIn: '7 days' })

//     const data = jwt.verify(token, 'secretToken')
// }

// myFunction()

// const pet = {
//     name: 'Kara'
// }
// pet.toJSON = function () {
//     return {}
// }
// console.log(JSON.stringify(pet))

