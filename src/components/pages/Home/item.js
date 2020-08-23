import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import apiItem from '../../../action/ItemAction';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

  
export default function Item(props) {
    const classes = useStyles();

    const deleteItem = async (e) => {
      e.preventDefault();

      apiItem.deleteItem(props.idItem)
      .then(res => console.log(res.data))
        .catch((err) => console.log(err.response));
    }
return(
    <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.name}
            height="140"
            image="/public/image/item/item1.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
          <Button>
          <Delete onClick={deleteItem}/>
          </Button>
        </CardActions>
      </Card>
)
}