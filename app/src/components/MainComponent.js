import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { COMMENTS } from "../shared/comments";
import Header from "./HeaderComponent";
import Footer  from "./FooterComponent";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';

export default class MainComponent extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      dishes: DISHES,
      selectedDish: null,
      comments:COMMENTS,
      leaders:LEADERS,
      promotions:PROMOTIONS
    }
  }
  
  onDishSelect(dishId) {
    
    this.setState({selectedDish: dishId});
    
  }
  
  
  render() {
  
    const HomePage = () => {
      return(
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    
    
    return (
  <div>
    <Header/>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={() => {
          return (
             <React.Fragment>
            <Menu dishes={this.state.dishes}  onClick={(dishId) => this.onDishSelect(dishId)}/>
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
             </React.Fragment>
             );
        }} />
        <Route exact path='/contactus' component={Contact} />} />
  
        <Redirect to="/home" />
      </Switch>
    <Footer/>
  </div>

    );
    
    
  }
  
  
}

/*
    <div>
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
        <Footer/>
      </div>
 */
