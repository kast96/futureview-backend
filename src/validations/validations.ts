import { body } from 'express-validator'

export const itemCreateValidation = [
  body('title', 'Введите заголовок').isLength({min: 3}).isString(),
  body('category', 'Неверная категория').isIn(['films', 'series', 'games']).isString(),
  body('image', 'Неверная ссылка на изображение').optional().isString(),
  body('isViewed', 'Неверный формат значения просмотрено').optional().isBoolean()
]