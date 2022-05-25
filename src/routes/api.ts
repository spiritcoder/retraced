import express from 'express'
const router = express.Router();

/*
|-------------------------------------------------------------------------------
| Controller Import
|-------------------------------------------------------------------------------
*/
import {categoryController} from "../controllers"

/*
|-------------------------------------------------------------------------------
| Creator Route Declearation
|-------------------------------------------------------------------------------
*/


/*----------Category Routes--------------------*/
router.get('/categories', categoryController.fetchCategories);
router.post('/updateCategoty', categoryController.updateCategory);
router.delete('/deleteCategory/:categoryId',categoryController.deleteACategory)
router.post('/createCategory', categoryController.createCategory)




/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as apiRoutess }