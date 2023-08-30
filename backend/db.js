const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://companyUser:amaanAnsari@cluster0.ivkgh.mongodb.net/notePad?retryWrites=true&w=majority'
const connectToMongo = () => {
    mongoose.connect(mongoURI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Mongo Connected")
        }
    )
}
module.exports = connectToMongo;