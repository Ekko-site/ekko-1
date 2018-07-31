import React from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "react-stripe-elements";
import createHistory from "history/createBrowserHistory";
import ReduxToastr from "react-redux-toastr";

import "@/App.css";

import configureStore from "@/etc/configure-store";
import Switcher from "@/containers/switcher";

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE);
const config = process.env;

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StripeProvider apiKey={config.REACT_APP_STRIPE_TOKEN}>
          <div>
            <Switcher />
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              position="top-right"
            />
          </div>
        </StripeProvider>
      </Provider>
    );
  }
}

export default Main;
