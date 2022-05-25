import * as categoryRepository from "../repo/category-repository";
import Category, { CategoryDto } from "../repo/models/category";
const seedData = async () => {
  let categoryList = await categoryRepository.getAllCategorys();
  if (categoryList.length < 1) {
    //we seed in some values
    let categories: CategoryDto[] = [
      {
        name: "category 1",
        parent_id: null,
      },
      {
        name: "category 2",
        parent_id: 1,
      },
      {
        name: "category 3",
        parent_id: null,
      },
      {
        name: "category 4",
        parent_id: null,
      },
      {
        name: "category 5",
        parent_id: null,
      },
      {
        name: "category 6",
        parent_id: 3,
      },
      {
        name: "category 7",
        parent_id: 4,
      },
      {
        name: "category 8",
        parent_id: null,
      },
      {
        name: "category 9",
        parent_id: 3,
      },
      {
        name: "category 10",
        parent_id: 3,
      },
    ];
    for (var i = 0; i < categories.length; i++) {
      await categoryRepository.createCategory(categories[i]);
    }
  }
};

export { seedData };
