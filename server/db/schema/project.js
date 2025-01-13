const mongoose = require('mongoose')

const newProject = new mongoose.Schema({
    namProject :{
        type:String,
        trim:true,
        maxLength : 100,
    },
    TypeProject :{
        type:String,
        trim:true,
        maxLength : 100,
    },
    userName:{
        type:String,
        trim:true,
        maxLength : 100,
    },
    userPhone :{
        type:String,
        trim:true,
        maxLength : 100,
    },
},{
    timestamps : true,
})


const Project = mongoose.model('Project-errachidia.online',newProject)
module.exports = Project