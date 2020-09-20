import urlBase from '../route/baseURI';

const getUser = () => urlBase.get("/");
const newItem = (ItemData) => urlBase.post("/items/add" , ItemData);
const deleteItem = (idItem, image) => urlBase.delete("/items/delete/" + idItem , { data: { filename: image } });
const detailUser = (user) => urlBase.get("/users/" + user);
const editUser = (name, data) => urlBase.post("/users/detail/" + name+ "/edit", data);
const searchItem = (name) => urlBase.get("/items/search/"+ name)

const apiUser = {
  getUser,
  newItem,
  deleteItem,
  detailUser,
  editUser,
  searchItem
};

export default apiUser;
