const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://Herman:password123456@cluster0.1ncwc.mongodb.net/Memories?`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})



