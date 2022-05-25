import dao from "./dao";
import Category, { CategoryDto } from "./models/category";

export async function getAllCategorys(): Promise<Category[]> {
  const Categorys = await dao.all("SELECT * FROM Categories", []);
  return <Category[]>Categorys;
}

export async function getCategoryById(id: string): Promise<Category> {
  const Category = await dao.get("SELECT * FROM Categories WHERE id = ?", [id]);
  return <Category>Category;
}

export async function createCategory(Category: CategoryDto): Promise<boolean> {
  const stmt = `INSERT INTO Categories (name, parent_id) VALUES (?,?);`;
  try {
    await dao.run(stmt, [
      Category.name,
      Category.parent_id,
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function updateCategory(name:string, parent_id, id): Promise<boolean> {
  const stmt = `UPDATE Categories SET name = ?, parent_id= ?, WHERE id = ?;`;
  try {
    await dao.run(stmt, [
      name,
      parent_id,
      id
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deleteCategory(CategoryId: string) {
  const stmt = `DELETE FROM Categories WHERE id = ?;`;
  try {
    await dao.run(stmt, [CategoryId]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}