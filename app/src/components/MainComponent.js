import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { COMMENTS } from "../shared/comments";
import Header from "./HeaderComponent";
import Footer  from "./FooterComponent";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from "./AboutComponent";

export default class MainComponent extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      dishes: DISHES,
      selectedDish: null,
      comments:COMMENTS,
      leaders:LEADERS,
      promotions:PROMOTIONS
    };
  }
  
  onDishSelect(dishId) {
    
    this.setState({selectedDish: dishId});
    
  }
  
  
  render() {
  
  
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    
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
            <Menu dishes={this.state.dishes}  onClick={(dishId) => this.onDishSelect(dishId)}/>

             )}}/>
        <Route path='/menu/:dishId' component={DishWithId} />
  
        <Route exact path='/contactus' component={Contact} />} />
        <Route path='/aboutus' component={()=> <About leaders={this.state.leaders} />}/>
  
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
