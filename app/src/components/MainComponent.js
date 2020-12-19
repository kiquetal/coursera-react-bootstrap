import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from "./AboutComponent";


import { postComment,addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import {actions} from "react-redux-form";


const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class MainComponent extends Component {
  
  constructor(props) {
    super(props);
    
    
  }
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
  onDishSelect(dishId) {
    
    this.setState({selectedDish: dishId});
    
  }
  
  
  render() {
    
    
    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
        />
      );
    };

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    
    
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/menu' component={() => {
              return (
               <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
            
            )
          }}/>
          <Route path='/menu/:dishId' component={DishWithId}/>
          
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
          <Route path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>
          
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    
    );
    
    
  }
  
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));


/*
    <div>
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
        <Footer/>
      </div>
 */
