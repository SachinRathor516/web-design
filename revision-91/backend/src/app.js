const express = require('express')
const noteModel = require('./models/note_model')
const cors = require('cors')

const app = express()


app.use(cors())
app.use(express.json())


app.post('/notes' , async(req , res)=>{

   const {title , description} = req.body

  const note = await noteModel.create({
    title ,description
   })

   res.status(201).json({
    message:"note created successfully",
    note
   })

})

app.get('/notes' ,async(req ,res )=>{

 const note = await noteModel.find()

 res.status(200).json({
    message:"note fetched successfully",
    note
 })
    
})

app.delete('/notes/:id' ,async (req ,res)=>{

    const id = req.params.id

  await  noteModel.findByIdAndDelete(id)

  res.status(204).json({
    message:"note deleted"
  })
})

app.patch('/notes/:id' , async(req , res)=>{
    const id = req.params.id
    const {title ,description} = req.body

  const note = await noteModel.findByIdAndUpdate(id , {title ,description})

    res.status(200).json({
        message:"note updated successfully",
        note
    })
})




module.exports = app