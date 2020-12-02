import React, {Component} from 'react';
import {Media} from 'reactstrap';

import {
  Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle
} from 'reactstrap';

class DishDetail extends Component {
  
  constructor(props) {
    super(props);
    
  }
  
  
  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name}/>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else
      return (
        <div></div>
      );
  }
  
  renderComments(comments) {
    if (comments != null) {
      var comments = comments.map((comment) => {
         var options = { year: 'numeric', month: 'short' ,day:'numeric'}; 
	var d=new Date(comment.date);      
        return (<li key={comment.id.toString()} className="m-1">
          <div>{comment.comment}</div>
          <div className="mt-2">--{comment.author},{d.toLocaleDateString('en-US',options)}</div>
        </li>);
        
        
      });
      
      return (<div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{comments}</ul>
      </div>);
    } else
      
      return (<div></div>);
    
    
  }
  
  render() {
    var dish = this.props.dish;
    return (
	    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(dish)}
        </div>
        
        
        {dish && this.renderComments(dish.comments)}
      
      </div>
      </div>);
    
    
  }
  
  
}

export default DishDetail;
