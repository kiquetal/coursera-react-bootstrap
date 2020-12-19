import React from 'react';
import {Breadcrumb, BreadcrumbItem, Button,  Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  Card, CardImg,  CardText, CardBody,
  CardTitle
} from 'reactstrap';
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";


import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends React.Component{
  
  
  constructor(props) {
    super(props);
    this.state={
      isModalOpen:false
    }
  }
  
  handleSubmit = (values) => {
    alert(JSON.stringify(values));
    console.log('Current State is: ' + JSON.stringify(values) + `Y MI ${this.props.dishId}`);
    this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);

    this.toggleModal();
    
  }
  
  renderForm=() => {
    
    this.setState({isModalOpen:true});
    
  }
  toggleModal=() =>  {
    this.setState({isModalOpen:!this.state.isModalOpen});
  }
  
  
  //<Errors model=".rating" show={(field)=> field.touched && !field.focus}messages={{required:"Please select a rank"}} className="text-danger"/>
  render() {
    
    
    
    return(<div>
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                
                <Row className="form-group">
                  <Label htmlFor="Rating">Rating</Label>
                  <Control.select model=".rating" id="rating" name="rating"
                                  placeholder="Rating"
                                  defaultValue="1"
                                  className="form-control">
                    
                    <option value="1" >1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                
                
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" >Your Name</Label>
                  <Control.text model=".name" id="name" name="name"
                                placeholder="Your name"
                                validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}
                                className="form-control"
                  
                  
                  />
                  <Errors model=".name" show="touched" className="text-danger"
                          messages={{required:'Required',minLength:"Must be at least 3 characters",maxLength:"Must be 15 characters or less"}}
                  
                  />
                </Row>
                
                <Row className="form-group">
                  <Label htmlFor="comment"> Comment</Label>
                  
                  <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                
                </Row>
                <Row className="form-group">
                  
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                
                </Row>
              </LocalForm>
            </div>
          
          </ModalBody>
        </Modal>
      </div>
      <Button className="button border-dark"  color="light" style={{color:"gray"}} onClick={this.renderForm}>  <i className="fa fa-pencil"></i> Submit Comment</Button>
    
    </div>)
    
    
    
  }
  
  
}



function  DishDetail(props){
  
  if (props.isLoading) {
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (props.dish != null)
    
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
        <RenderComments comments={props.comments} dishId={props.dish.id} postComment={props.postComment}/>
      </div>
    </div>
  </div>);
  
  
  
}
  
  
  function Dish({dish}) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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
  
  function RenderComments({comments,postComment,dishId}) {
    if (comments != null) {
      
      var commentsItems = comments.map((comment) => {
         var options = { year: 'numeric', month: 'short' ,day:'numeric'};
	var d=new Date(comment.date);
        return (<Fade in> <li key={comment.id.toString()} className="m-1">
          <div>{comment.comment}</div>
          <div className="mt-2">--{comment.author},{d.toLocaleDateString('en-US',options)}</div>
        </li></Fade>);
        
        
      });
      
      return (<div className="col-12  m-1">
        <div className="row">
        <h4>Comments</h4>
          <ul className="list-unstyled"><Stagger in>{commentsItems}</Stagger></ul>
      </div>
        <div className="row">
          <CommentForm postComment={postComment} dishId={dishId}/>
        </div>
      </div>);
    } else
      
      return (<div/>);
    
    
  }
  

  
  
  
  


export default DishDetail;
