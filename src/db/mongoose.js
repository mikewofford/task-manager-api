const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch(e => console.log(e));

// const me = new User({
//     name: 'Chelsea',
//     age: 25,
//     email: 'chelsea@gmail.com',
//     password: 'IloveMichael'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })

// const Tasks = mongoose.model('Task', {
//     description: {
//         type: String,
//         required = true,
//         trim: true,
//     }, 
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const dishes = new Tasks({
//     description: 'Run dishwasher',
//     completed: true
// })

// dishes.save().then(() => {
//     console.log(dishes)
// }).catch((error) => {
//     console.log('Error', error)
// })

