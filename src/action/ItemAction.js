import urlBase from './../route/baseURI';

const getItems = () => urlBase.get("/items/");
const newItem = (ItemData) => urlBase.post("/items/add" , ItemData);
const deleteItem = (idItem, image) => urlBase.delete("/items/delete/" + idItem , { data: { filename: image } });
const detailItem = (name) => urlBase.get("/items/detail/" + name);
const editItem = (name, data) => urlBase.post("/items/detail/" + name+ "/edit", data);
const searchItem = (name) => urlBase.get("/items/search/"+ name)

const apiItem = {
  getItems,
  newItem,
  deleteItem,
  detailItem,
  editItem,
  searchItem
};

export default apiItem;
