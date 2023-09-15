import { Request, Response } from 'express'
import ItemModel from '../models/Item'
import { responseObject } from '../utils'

export const getAll = async (request: Request, response: Response) => {
  try {
    const items = await ItemModel.find().exec()

    response.json(responseObject(items, false))
  } catch (error) {
    console.log(error)
    response.json(responseObject(false, true, 'Не удалось получить элементы'))
  }
}

export const getOne = async (request: Request, response: Response) => {
  try {
    const itemId = request.params.id
    const items = await ItemModel.findOneAndUpdate({
      _id: itemId
    })

    if (!items) {
      return response.json(responseObject(false, true, 'Элемент не найдена'))
    }

    response.json(responseObject(items, false))
  } catch (error) {
    console.log(error)
    response.json(responseObject(false, true, 'Не удалось получить элемент'))
  }
}

export const create = async (request: Request, response: Response) => {
  try {
    const doc = new ItemModel({
      title: request.body.title,
      category: request.body.category,
      image: request.body.image,
      isViewed: request.body.isViewed,
    })

    const item = await doc.save()

    response.json(responseObject(item, false))
  } catch (error) {
    console.log(error)
    response.json(responseObject(false, true, 'Не удалось создать элемент'))
  }
}

export const remove = async (request: Request, response: Response) => {
  try {
    const itemId = request.params.id
    const items = await ItemModel.findOneAndDelete({
      _id: itemId
    })

    if (!items) {
      return response.json(responseObject(null, true, 'Не удалось удалить элемент'))
    }

    response.json(responseObject({success: true}, false))
  } catch (error) {
    console.log(error)
    response.json(responseObject(null, true, 'Не удалось удалить элемент'))
  }
}

export const update = async (request: Request, response: Response) => {
  try {
    const itemId = request.params.id
    const items = await ItemModel.findOneAndUpdate({
      _id: itemId
    },
    {
      title: request.body.title,
      categoty: request.body.categoty,
      image: request.body.image,
      isViewed: request.body.isViewed,
    },
    {
      new: true,
    })

    if (!items) {
      return response.json(responseObject(null, true, 'Не удалось изменить элемент'))
    }

    response.json(responseObject(items, false))
  } catch (error) {
    console.log(error)
    response.json(responseObject(null, true, 'Не удалось изменить элемент'))
  }
}

export const setViewed = async (request: Request, response: Response) => {
  try {
    const itemId = request.params.id
    const items = await ItemModel.findOneAndUpdate({
      _id: itemId
    },
    {
      isViewed: request.body.isViewed,
    },
    {
      new: true,
    })

    if (!items) {
      return response.json(responseObject(null, true, 'Не удалось изменить элемент'))
    }

    response.json(responseObject(items, false))
  } catch (error) {
    console.log(error)
    response.json(responseObject(null, true, 'Не удалось изменить элемент'))
  }
}