import { Request, Response } from 'express'
import connection from '../database/connection'

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await connection('items').select('*')

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `/uploads/${item.image}`
        }
    })

    return response.json(serializedItems)
  }
}

export default ItemsController