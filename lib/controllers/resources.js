import { Router } from 'express';
import Resources from '../models/Resources.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const resource = await Resources.insert(req.body);

      res.send(resource);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Resources.getById(id);

      res.send(resource);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const resources = await Resources.getAll();

      res.send(resources);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, address, city, city_id, county, zip, usstate, state_id, number, number2, email, website, category, category_id, subcategory
      } = req.body;
      const updatedResource = await Resources.update(id, {
        name, address, city, city_id, county, zip, usstate, state_id, number, number2, email, website, category, category_id, subcategory
      });

      res.send(updatedResource);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Resources.delete(id);

      res.send({
        message: `You have deleted ${resource.name}.`,
      });
    } catch (err) {
      next(err);
    }
  });
