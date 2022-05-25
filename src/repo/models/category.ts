
export default class Category {
  id: number;
  name: string;
  parent_id!: number | null;
}

export class ResponseDto extends Category {
  children: Array<Category>;
}

export class CategoryDto {
  name: string;
  parent_id!: number | null;
}