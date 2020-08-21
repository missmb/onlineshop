import urlBase from './../route/baseURI';

const getItems = () => urlBase.get("/items/");
const newItem = (ItemData) => urlBase.post("/items/add" , ItemData);

const apiItem = {
  getItems,
  newItem
};

export default apiItem;
