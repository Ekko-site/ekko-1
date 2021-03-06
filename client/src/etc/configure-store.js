import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRoutes } from "redux-first-router";
import { reducer as toastrReducer } from "react-redux-toastr";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import localStore from "@/etc/store";
import routesMap from "@/etc/routes-map";
import options from "@/etc/options";
import reducers from "@/reducers";
import * as actionCreators from "@/actions";

const config = process.env;

export default (history, preLoadedState) => {
  const { reducer: routerReducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routesMap,
    options
  );

  const loggerMiddleware = createLogger();

  const rootReducer = combineReducers({
    ...reducers,
    toastr: toastrReducer,
    location: routerReducer
  });

  let user = localStore.get("user");
  let parsedUser;
  if (user) {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error(error);
    }
  }

  const preload = {
    ...preLoadedState,
    authState: {
      logged_in: !!parsedUser,
      current_user: parsedUser
    }
  };

  const middlewares = applyMiddleware(
    middleware,
    thunkMiddleware,
    loggerMiddleware
  );
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preload, enhancers);

  store.subscribe(() => {
    const user = store.getState().authState.current_user;
    if (!user) return;
    localStore.set("user", JSON.stringify(user), 30);
  });

  return { store, thunk };
};

const composeEnhancers = (...args) =>
  typeof window !== "undefined"
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args);
