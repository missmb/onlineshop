import React, {useState, useEffect} from 'react';
import apiItem from './../../../action/ItemAction';
// import { param } from '../../../../server/routes/itemRoute';


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
        <h1>{items.name}</h1>
        <h1>{items.price}</h1>
        
        <h1>{items.description}</h1>
        <h1>{items.quantity}</h1>
    </div>
  );
}
