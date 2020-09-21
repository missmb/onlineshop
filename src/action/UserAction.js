import urlBase from '../route/baseURI';

const getUser = () => urlBase.get("/");
const deleteUser = (idUser, image) => urlBase.delete("/users/delete/" + idUser , { data: { filename: image } });
const detailUser = (user) => urlBase.get("/users/" + user);
const editUser = (user, data) => urlBase.post("/users/" + user+ "/edit", data);
const editUserPic = (name, data) => urlBase.post("/users/" + name+ "/editpic", data);

const apiUser = {
  getUser,
  deleteUser,
  detailUser,
  editUser,
  editUserPic
};

export default apiUser;
