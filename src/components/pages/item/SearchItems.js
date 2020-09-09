import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/userContext";
import apiItem from '../../../action/ItemAction';
import Item from './item';
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';

export default function SearchItems(props) {
  const { userData } = useContext(UserContext);

  const [items, setItems] = useState([]);

  const loadItem = async () => {
    const ItemsData = await apiItem.searchItem(props.match.params.name);
    setItems(ItemsData.data.data)
  };

  useEffect(() => {
    loadItem()
  },[])
  
  return (
    <div className="page center">
      <Button variant="raised" component="span" >
      <Link to="/"> Back to Home</Link>
          </Button>
        <h1>Result Search</h1>

      <Grid container spacing={1} justify="center">
      {items[0] == null ? ( < h1>nothing product with " { props.match.params.name } " name</h1> 
              ) : (items.map((item) => (
                <Item
                  key={item._id}
                  idItem={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                />
              )))}
              </Grid>
      
    </div>
  );
}
