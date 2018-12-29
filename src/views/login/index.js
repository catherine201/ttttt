import React from 'react';
import { Button, Form, Input, Icon, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import styles from './login.less';
import createApi from '../../api/registerAndLogin';

const srcImg = require('../../assets/images/logo.png');

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired
  };

  state = {
    username: '',
    password: ''
    // isLoding: false
  };

  componentDidMount() {
    this.props.form.setFieldsValue({
      username: this.state.username,
      password: this.state.password
    });
  }

  login = async obj => {
    const res = await createApi.login(obj);
    if (res) {
      // this.setState({
      //   isLoding: false
      // });
      // sessionStorage.setItem('user', JSON.stringify(res.data));
      console.log(res);
      const info = {
        access_token: res.data.access_token,
        open_id: res.data.openid
      };
      const result = await createApi.secondLogin(info);
      if (result) {
        this.$msg.success('登陆成功');
        setTimeout(() => {
          this.props.history.push('/admin');
        }, 500);
      } else {
        this.$msg.error('登陆失败');
      }
      // sessionStorage.setItem('user', JSON.stringify(res));
    } else {
      // this.setState({
      //   isLoding: false
      // });
      this.$msg.error('授权失败');
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        sessionStorage.setItem('user', JSON.stringify(values));
        // this.setState({
        //   isLoding: true
        // });
        const obj = {
          name: values.username,
          password: values.password
        };
        this.login(obj);
        // this.$msg.loading('正在登陆...', 2, () => {
        //   this.setState({
        //     isLoding: false
        //   });
        //   this.$msg.success('登陆成功');
        //   setTimeout(() => {
        //     this.props.history.push('/admin');
        //   }, 500);
        // });
      }
    });
  };

  toRegister = e => {
    e.preventDefault();
    this.props.history.push('/register');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
            EUEN ADMIN
          </h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              {/* <a className="login-form-forgot" href="">
                Forgot password
              </a> */}
              <Button
                className="btn-block btn-lg"
                type="primary"
                htmlType="submit"
                disabled={this.state.isLoding}
              >
                Log in
              </Button>
              <a href="#" onClick={this.toRegister}>
                没有账号？点击注册
              </a>
            </Form.Item>
          </Form>

          <div style={{ color: '#9fa8b1' }} className="text-center">
            Euen admin platform
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
