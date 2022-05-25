import { Request, Response } from "express";
import { BadRequestError, DataNotSavedError } from "../errors";
import * as categoryRepository from "../repo/category-repository";
import { ResponseDto } from "../repo/models/category";
import { createResponse } from "../utils";
import { listToTree, makeTree } from "../utils/list-tree";

class Category {
  fetchCategories = async (req: Request, res: Response) => {
    let id: any = req?.query?.id;

    let returnedObject: ResponseDto[] = [];
    let foundCollections = await categoryRepository.getAllCategorys();

    //check if id was passed in the query Url
    if (id == null) {

      returnedObject = listToTree(foundCollections, null);

    } else {
      let categoryWithId = await categoryRepository.getCategoryById(id);
      if (categoryWithId == undefined) {
       return res.json("Parent ID does not exist")
      }
      var returner = JSON.parse(JSON.stringify(makeTree(foundCollections, id)));

      let newObject = new ResponseDto();
      newObject.id = categoryWithId.id;
      newObject.name = categoryWithId.name;
      newObject.parent_id = categoryWithId.parent_id;
      newObject.children = returner;

      returnedObject.push(newObject)
    }
    return createResponse(res, 200, "Found Categories", returnedObject);
  };

  createCategory = async (req: Request, res: Response) => {
    const { name, parent_id } = req.body;
    if (parent_id != null) {
      let findParentId = await categoryRepository.getCategoryById(parent_id);
      if (findParentId == null) throw new BadRequestError("Parent ID does not exist");;
    }

    let savedCategory: Boolean = await categoryRepository.createCategory({ name, parent_id });
    if (!savedCategory) throw new DataNotSavedError("There was a problem saving the Category");

    return createResponse(res, 200, "Category Saved", null);
    
    
  }

  updateCategory = async (req: Request, res: Response) => {
    const { name, parent_id, id } = req.body;

    //check if the id to be updated exists
    var updateCategory = await categoryRepository.getCategoryById(id);
    if (updateCategory == null) throw new BadRequestError("ID does not exist");

    if (parent_id != null) {
      let findParentId = await categoryRepository.getCategoryById(parent_id);
      if (findParentId == null) throw new BadRequestError("Parent ID does not exist");
    }

    let updated: Boolean = await categoryRepository.updateCategory(name, parent_id, id);
    if (!updated) throw new DataNotSavedError("There was a problem updating the Category");

    return createResponse(res, 200, "Category Updated", null);
    
  }

  deleteACategory= async (req: Request, res: Response) => {
    const deleted: boolean = await categoryRepository.deleteCategory(req.params.categoryId);
    if (deleted) {
      return createResponse(res, 200, "Category Deleted",null);
    } else {
      throw new BadRequestError(" Category Deletion failed ");
    }
  }
  
}

export const categoryController = new Category();
