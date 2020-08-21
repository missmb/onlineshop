import urlBase from './../route/baseURI';

const newItem = (ItemData) => urlBase.post("/items/add" , ItemData);

const apiItem = {
  newItem
};

export default apiItem;
