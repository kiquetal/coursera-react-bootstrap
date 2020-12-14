import React from "react";
import {Button, Col, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

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
    console.log('Current State is: ' + JSON.stringify(values));
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
export default CommentForm;
