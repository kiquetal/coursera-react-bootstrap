import * as ActionTypes from './ActionTypes';
import { COMMENTS } from "../shared/comments";
export const Comments = (state = COMMENTS, action) => {
  switch(action.type)
  {
    case ActionTypes.ADD_COMMENTS:
      const comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      console.log("nuevo comment");
      return state.concat(comment);
    default:
      return state;
  }
  
}
