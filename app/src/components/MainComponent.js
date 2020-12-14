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
import {addComment} from "../redux/ActionCreators";


const mapDispatchToProps = dispatch => {
  
  return {
       
       addComment:  (dishId, rating,author,comment) => dispatch(addComment(dishId,rating,author,comment))
  }
  
  
}

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
  
  onDishSelect(dishId) {
    
    this.setState({selectedDish: dishId});
    
  }
  
  
  render() {
    
    
    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}/>
      );
    };
    
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
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
          
          <Route exact path='/contactus' component={Contact}/>} />
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
