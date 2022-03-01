const mongoose = require('mongoose');
var url = 'mongodb+srv://yarawaheb:yara1230@cluster0.7n0jp.mongodb.net/dreamTrip?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected successfully to MongoDB!'))
 .catch(err => console.error('Something went wrong', err));


const userSchema = new mongoose.Schema(
    {
        firstName: String, 
        lastName: String,
        userName: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        posts: {
            type: Array,
            default: [],
        },
        chats: {
            type: Array,
            default: [],
        },
        trips: {
            type: Array,
            default: [],
        },
        equipmentList: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);



module.exports.Users = mongoose.model('Users', userSchema);
