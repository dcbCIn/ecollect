import express from 'express'
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'

import multerConfig from './config/multer'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'


const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post('/points', 
  upload.single('image'), 
  celebrate({
    body: Joi.object().keys({                 // Todo: separate celebrate validation from routes
      point: Joi.string().required()/*,
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required().max(2),
      items: Joi.string().required()*/
    })
  }, {abortEarly: false}), // Todo: Internationalization of the error messages
  pointsController.create) // Todo: use multer.fileFilter to filter the  

export default routes