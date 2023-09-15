import mongoose, { Document } from "mongoose"

interface IItem extends Document {
  title: string
  category: 'films' | 'series' | 'games'
  image: string
  isViewed: boolean
  _doc: any
}

const ItemSchema = new mongoose.Schema<IItem>({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  isViewed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
})

export default mongoose.model('Item', ItemSchema)