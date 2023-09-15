import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { itemCreateValidation } from './validations/validations'
import { ItemController } from './controllers/index'
import { handleValidationErrors } from './utils/index'

dotenv.config()

const port = process.env.PORT || 8080

mongoose.connect(
  `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@freecluster.g4ty6e4.mongodb.net/${process.env.BD}?retryWrites=true&w=majority`
).then(() => {
  console.log('db connected')
}).catch((error) => {
  console.log('db connect error:', error)
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/items', ItemController.getAll)
app.get('/items/:id', ItemController.getOne)
app.post('/items', itemCreateValidation, handleValidationErrors, ItemController.create)
app.delete('/items/:id', ItemController.remove)
app.put('/items/:id', itemCreateValidation, handleValidationErrors, ItemController.update)
app.patch('/items/viewed/:id', handleValidationErrors, ItemController.setViewed)

app.listen(port, () => console.log(`Running on port ${port}`))