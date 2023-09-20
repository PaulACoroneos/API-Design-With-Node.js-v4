import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';

const router = Router();

/**
 * Product
 */
//@ts-ignore
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(),createProduct)
router.delete('/product/:id', deleteProduct)

/**
* Update
*/
router.get('/update', () => { })
router.get('/update/:id', () => { })
router.put('/update/:id', body('title').optional(), body('body').optional(), body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']), body('status'), body('version').optional, () => { })
router.post('/update', body('title').exists(), body('body').exists().isString(), oneOf([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]), body('status'), body('version').optional, () => { })
router.delete('/update/:id', () => { })

/**
* Update Points
*/
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', body('name').optional().isString(), body('description').optional().isString(), () => { })
router.post('/updatepoint', body('name').isString(), body('description').isString(), body('updateId').exists().isString(), () => { })
router.delete('/updatepoint/:id', () => { })

export default router