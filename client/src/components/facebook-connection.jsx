import React from "react";
import FacebookLogin from "react-facebook-login";

const config = process.env;

class FacebookConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false
    };
  }

  componentDidMount() {
    this.setState({
      load: true
    });
  }

  render() {
    const { cssClass, callback = () => {} } = this.props;
    return (
      <span>
        {this.state.load && (
          <FacebookLogin
            appId={config.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            callback={callback}
            cssClass={cssClass}
            textButton="Connect with Facebook"
            scope="manage_pages,user_photos,user_posts"
          />
        )}
      </span>
    );
  }
}

export default FacebookConnection;
