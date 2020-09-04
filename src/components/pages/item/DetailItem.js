import React, {useState, useEffect} from 'react';
import apiItem from './../../../action/ItemAction';
import {Grid} from "@material-ui/core";

export default function DetailItem(props) {
    const [items, setItems] = useState([]);

    const loadItem = async () => {
      const ItemData = await apiItem.detailItem(props.match.params.name);
      console.log(ItemData)
      console.log(ItemData.data.data)
      setItems(ItemData.data.data)
    };
  
    useEffect(() => {
      loadItem()
    },[])

  return (
    <div>
      <Grid container  spacing={1} justify="center">
            <Grid item md={4} sm={12} xs={12}>
              <h1>{items.name}</h1>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            <img
            alt="cover"
            src={items.image}
            style={{
              width: "100%",
              height: 360,
              objectFit: "cover",
              objectPosition: "0 0",
            }}
          />
            </Grid>
            <Grid item md={3} sm={12} xs={12}></Grid>
            <Grid item md={7} sm={12} xs={12}>
              <h3>price        :  {items.price}</h3>
              <h3>Quantity     :  {items.quantity}</h3>
              <h3>description  :  {items.description}</h3>
            </Grid>
      </Grid>
        
    </div>
  );
}
