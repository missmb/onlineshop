import urlBase from './../route/baseURI';

const getItems = () => urlBase.get("/items/");
const newItem = (ItemData) => urlBase.post("/items/add" , ItemData);
const deleteItem = (idItem) => urlBase.delete("/items/delete/" + idItem);
const detailItem = (name) => urlBase.get("/items/detail/" + name);

const apiItem = {
  getItems,
  newItem,
  deleteItem,
  detailItem
};

export default apiItem;
