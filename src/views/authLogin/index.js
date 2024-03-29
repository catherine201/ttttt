import React from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import LoginPassWord from './loginPassWord';
import createApi from '../../api/registerAndLogin';
import LoginGa from './loginGa';
import { getParams } from '../../utils';
import { loading } from '../../api/axios';

const srcImg = require('../../assets/images/logo.png');

class Login extends React.Component {
  // static propTypes = {
  //   form: PropTypes.any.isRequired,
  //   history: PropTypes.any.isRequired
  // };

  constructor() {
    // super(props);
    super();
    this.state = {
      status: 0, // 0 账号密码 1 谷歌验证码
      loginInfo: {}
    };
    this.changeState = this.changeState.bind(this);
    this.successLogin = this.successLogin.bind(this);
  }

  state = {
    // isLoding: false
  };

  componentDidMount() {
    console.log(getParams('appid'));
  }

  changeState = obj => {
    // console.log(val);
    this.setState({
      loginInfo: obj.loginInfo,
      status: obj.status
    });
  };

  successLogin = async res => {
    // const userObj = res.data;
    const authObj = {
      access_token: res.data.access_token,
      appid: getParams('appid')
    };
    const authResult = await createApi.authLogin(authObj);
    if (authResult) {
      loading.end();
      window.location.href = `${getParams('redirect_uri')}?auth_code=${
        authResult.data.auth_code
      }&scope=${getParams('scope')}&state=${getParams('state')}`;
    } else {
      loading.end();
    }
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { status, loginInfo } = this.state;
    return (
      <div className="middle-box login-page">
        <div
          className={`m-box ${styles['login-form']} ${
            this.state.isLoding ? ' blur-2' : ' blur-0'
          }`}
        >
          <div className="login-form-wallpaper" />
          <div className="text-center">
            <img
              src={srcImg}
              width="100"
              height="100"
              alt="logo"
              className={styles.logo}
            />
          </div>
          <h1
            className="text-center"
            style={{ color: '#1890FF', fontSize: 'rgba(24, 144, 255, 0.91)' }}
          >
            Leeker Labs
          </h1>
          {status === 0 && (
            <LoginPassWord
              {...this.props}
              changeState={this.changeState}
              successLogin={this.successLogin}
            />
          )}
          {status === 1 && (
            <LoginGa
              {...this.props}
              changeState={this.changeState}
              successLogin={this.successLogin}
              loginInfo={loginInfo}
            />
          )}

          <div style={{ color: '#9fa8b1' }} className="text-center">
            Leeker Labs platform
          </div>
        </div>
      </div>
    );
  }
}

// export default Form.create()(Login);

const mapDispatchToProps = dispatch => ({
  // getMenu: dispatch.menu.getMenu,
  // getGroup: dispatch.menu.getGroup,
  getNickName: dispatch.aside.getNickName,
  getOwnMenu: dispatch.menu.getOwnMenu,
  getAvatar: dispatch.aside.getAvatar,
  getBindStatus: dispatch.aside.getBindStatus
});
export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(Login);
