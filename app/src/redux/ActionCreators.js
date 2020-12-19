import * as ActionTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";
import {ADD_LEADERS, LEADERS_FAILED, LEADERS_LOADING} from "./ActionTypes";

export const addComment = ({dishId, rating, author ,comment,id,date})=>({
  type:ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
    id: id,
    date:date
  }
})


export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();
  
  return fetch(baseUrl + 'comments', {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      throw error;
    })
  .then(response => response.json())
  .then(response => {
    console.log("after JSON"+ JSON.stringify({...response}));
    dispatch(addComment(response))
      })
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};


export const fetchDishes = () => (dispatch) => {
  
  dispatch(dishesLoading(true));
  
  return fetch(baseUrl + 'dishes')
  .then(response => response.json())
  .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});


export const addDishes=(dishes)=>({
  type:ActionTypes.ADD_DISHES,
  payload:dishes
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
  
  dispatch(promosLoading());
  
  return fetch(baseUrl + 'promotions')
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const addLeaders=(leaders)=>({
  type:ADD_LEADERS,
  payload:leaders
})

export const leadersLoading = ()=>({
  type:LEADERS_LOADING
});

export const leadersFailed = (errMessg)=>({
  type:LEADERS_FAILED,
  payload:errMessg
})
export const fetchLeaders=()=>dispatch=>{
  
  dispatch(dishesLoading());
  
  return fetch(baseUrl + 'leaders')
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch((err)=>{
    dispatch(leadersFailed(err.message))
  });
  
  
}
export const postFeedback=(data)=>dispatch=>{
  
  return fetch(baseUrl+'feedback',{
    method:'POST',
    credentials: "same-origin",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(data)
  }).then((res)=>res.json())
    .then(res=> { return res})
    .catch(err=>console.log("Could not send feedback"+err.message));
  
  
  
}
