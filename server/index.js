const express = require('express');
const Project = require('./db/schema/project');
const connectDB = require('./db/mongodb');
const dotenv = require('dotenv')
const cors = require('cors')

const app = express();
app.use(cors())

dotenv.config();
connectDB();
app.use(express.json());

app.post('/', async (req, res) => {
    const {namProject,TypeProject,userName, userPhone} = req.body

    if (!namProject || !TypeProject || !userName || !userPhone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({ 
        namProject,
        TypeProject,
        userName,
        userPhone
    });

    await  newProject.save()
       .then(()=>{
        res.status(201).json({message : "تم التسجيل بنجاح"})
       }).catch((err)=>{
        res.status(400).json({message : "خطاء في التسجيل"})
       })
});
app.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
