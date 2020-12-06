import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import {
  Card, CardImg,  CardText, CardBody,
  CardTitle
} from 'reactstrap';

function  DishDetail(props){
  
  return (              <div className="container">
    <div className="row">
      <Breadcrumb>
      
        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="col-12">
        <h3>{props.dish.name}</h3>
        <hr />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-5 m-1">
        <Dish dish={props.dish} />
      </div>
      <div className="col-12 col-md-5 m-1">
        <RenderComments comments={props.comments} />
      </div>
    </div>
  </div>);
  
  
  
}
  
  
  function Dish({dish}) {
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
        <div/>
      );
  }
  
  function RenderComments({comments}) {
    if (comments != null) {
      var commentsItems = comments.map((comment) => {
         var options = { year: 'numeric', month: 'short' ,day:'numeric'};
	var d=new Date(comment.date);
        return (<li key={comment.id.toString()} className="m-1">
          <div>{comment.comment}</div>
          <div className="mt-2">--{comment.author},{d.toLocaleDateString('en-US',options)}</div>
        </li>);
        
        
      });
      
      return (<div className="col-12  m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{commentsItems}</ul>
      </div>);
    } else
      
      return (<div/>);
    
    
  }
  

  
  
  
  


export default DishDetail;
