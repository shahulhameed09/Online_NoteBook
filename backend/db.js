const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://shahul:myonlinenotes@notebookcluster0.cpetcwt.mongodb.net/NoteBooks?retryWrites=true&w=majority"

const connectToMongo = () =>{
    mongoose.connect(
        mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
}

module.exports = connectToMongo;