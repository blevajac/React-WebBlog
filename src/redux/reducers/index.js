import { combineReducers } from 'redux';
import PostReduecr from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostReduecr,
  form: formReducer
});

export default rootReducer;
