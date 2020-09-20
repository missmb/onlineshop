import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/userContext";
import apiItem from '../../../action/ItemAction';
import Item from './item';
import { Grid } from "@material-ui/core";
import Navigation from "../../Layout/Navigation";
import Button from '@material-ui/core/Button';

export default function ListItems() {
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
      <Navigation />
        <h1>Welcome {userData.user.username}</h1>
        <Button size="small" color="primary">
        <Link to="/items/add">Add Item</Link>
        </Button>

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
    </div>
  );
}
