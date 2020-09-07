import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/userContext";
import apiItem from '../../../action/ItemAction';
import Item from '../item/item';
import { Grid } from "@material-ui/core";

export default function Home() {
  const { userData } = useContext(UserContext);

  const [items, setItems] = useState([]);

  const loadItem = async () => {
    const ItemsData = await apiItem.getItems();
    setItems(ItemsData.data)
  };

  useEffect(() => {
    loadItem()
  },[])
  return (
    <div className="page center">
      {userData.user ? (
        <>
        <h1>Welcome {userData.user.username}</h1>
        <Link to="/items">Add Item</Link>

      <Grid container spacing={1} justify="center">
      {items.map((item) => (
                <Item
                  key={item._id}
                  idItem={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                />
              ))}
              </Grid>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
