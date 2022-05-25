import { ResponseDto } from "../repo/models/category";

const listToTree = (arr: any = [], id: any) => {
  let map = {},
    node: any,
    res: ResponseDto[] = Array(),
    i;

  for (i = 0; i < arr.length; i += 1) {
    map[arr[i].id] = i;
    arr[i].children = [];
  }

  for (i = 0; i < arr.length; i += 1) {
    node = arr[i];
    if (node.parent_id !== null) {
      arr[map[node.parent_id]].children.push(node);
    } else {
      res.push(node);
    }
  }
  return res;
};

const makeTree = (nodes: any, parentId) => {
  return nodes
    .filter((node) => node.parent_id == parentId)
    .reduce(
      (tree, node) => [
        ...tree,
        {
          ...node,
          children: makeTree(nodes, node.id),
        },
      ],
      [],
    )
}
export { listToTree, makeTree };
