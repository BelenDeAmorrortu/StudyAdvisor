import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import summaryReducer from '../reducers/summary'
import flashCardReducer from '../reducers/flashCard'
import cardSetReducer from '../reducers/cardSet'

const rootReducer = combineReducers({

  summary: summaryReducer,
  flashCard: flashCardReducer,
  cardSet: cardSetReducer
})

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export default store;