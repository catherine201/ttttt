import React from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { requestFullScreen, exitFullscreen } from '../utils/index';

const { Header } = Layout;

export default class AppHeader extends React.Component {
  state = {
    fullscreen: false
  };

  toHref = addr => {
    console.log(this);
    this.props.history.push(addr);
  };

  fullscreenTrigger() {
    if (this.state.fullscreen) {
      exitFullscreen();
    } else {
      requestFullScreen();
    }
    this.setState({
      fullscreen: !this.state.fullscreen
    });
  }

  doLogout() {
    console.log(this);
    this.$modal.confirm({
      title: '你确定退出么？',
      content: '',
      okText: '确定',
      cancelText: '再看一会',
      onOk: () => {
        sessionStorage.removeItem('user');
        this.props.history.push('/login');
      }
    });
  }

  dropdownMenu() {
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => this.toHref('/personalCenter/')}>
          <Icon type="user" style={{ marginRight: '5px' }} />
          个人信息
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={() => this.toHref('/personalCenter/changePassword')}
        >
          <Icon type="sync" style={{ marginRight: '5px' }} />
          密码变更
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => this.toHref('/personalCenter/binding')}
        >
          <Icon type="link" style={{ marginRight: '5px' }} />
          账号绑定
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => this.toHref('/personalCenter/safetyCheck')}
        >
          <Icon type="check-circle" style={{ marginRight: '5px' }} />
          安全验证
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => this.toHref('/personalCenter/console')}
        >
          <Icon type="check-circle" style={{ marginRight: '5px' }} />
          控制台
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="5" onClick={() => this.doLogout()}>
          <Icon type="logout" style={{ marginRight: '5px' }} />
          退出
        </Menu.Item>
      </Menu>
    );
  }

  dropdownSetting() {
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => this.toHref('/personalCenter/')}>
          <Icon type="user" style={{ marginRight: '5px' }} />
          个人信息
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={() => this.toHref('/personalCenter/changePassword')}
        >
          <Icon type="sync" style={{ marginRight: '5px' }} />
          密码变更
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => this.toHref('/personalCenter/binding')}
        >
          <Icon type="link" style={{ marginRight: '5px' }} />
          账号绑定
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={() => this.doLogout()}>
          <Icon type="logout" style={{ marginRight: '5px' }} />
          退出
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Header>
        <div className="f-left">
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.onClick}
          />
        </div>
        <div className="f-right">
          <ul className="head-nav-list">
            <li>
              <Dropdown overlay={this.dropdownMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#/">
                  {/* <Icon type="user" />Administrator<Icon type="down" /> */}
                  <img
                    src="https://avatars2.githubusercontent.com/u/11366654?s=64&v=4"
                    alt="user"
                    className="user-avator"
                  />
                  Administrator
                  <Icon type="down" />
                </a>
              </Dropdown>
            </li>
            <li>
              <a
                href="#full"
                onClick={e => {
                  e.preventDefault();
                  this.fullscreenTrigger();
                  return false;
                }}
              >
                <Icon type={this.state.fullscreen ? 'shrink' : 'arrows-alt'} />
              </a>
            </li>
            <li>
              <Dropdown overlay={this.dropdownSetting()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#/">
                  <Icon type="setting" />
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            {/* <Menu.Item key="8">
              <a
                href="https://ant.design/docs/react/introduce-cn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="ant-design" style={{ marginRight: '5px' }} />
                Antd
              </a>
            </Menu.Item>
            <Menu.Item key="9">
              <a
                href="https://motion.ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="ant-design" style={{ marginRight: '5px' }} />
                Motion
              </a>
            </Menu.Item>
            <Menu.Item key="10">
              <a
                href="https://pro.ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="ant-design" style={{ marginRight: '5px' }} /> Design
                Pro
              </a>
            </Menu.Item> */}
          </Menu>
        </div>
      </Header>
    );
  }
}
