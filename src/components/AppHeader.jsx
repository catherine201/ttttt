import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Dropdown } from 'antd';
// import { Link } from 'react-router-dom';
import { requestFullScreen, exitFullscreen } from '../utils/index';
// import createApi from '../api/registerAndLogin';

const { Header } = Layout;

class AppHeader extends React.Component {
  state = {
    fullscreen: false
  };

  componentDidMount() {
    this.init();
  }

  logout = async () => {
    sessionStorage.removeItem('user');
    window.sessionStorage.clear();
    this.props.history.push('/login');
    // const res = await createApi.logout();
    // if (res) {
    //   sessionStorage.removeItem('user');
    //   window.sessionStorage.clear();
    //   this.props.history.push('/login');
    // }
  };

  toHref = addr => {
    this.props.history.push(addr);
  };

  init() {
    // !this.props.menuArr.length ? this.props.getMenu() : false;
    // !this.props.groupArr.length ? this.props.getGroup() : false;
  }

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
    this.$modal.confirm({
      title: '你确定退出么？',
      content: '',
      okText: '确定',
      cancelText: '再看一会',
      onOk: () => {
        this.logout();
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
          变更密码
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => this.toHref('/personalCenter/doubleCheck')}
        >
          <Icon type="check-circle" style={{ marginRight: '5px' }} />
          双重认证
        </Menu.Item>
        {JSON.parse(sessionStorage.getItem('user')).type === 'admin' && (
          <Menu.Item
            key="5"
            onClick={() => this.toHref('/personalCenter/user')}
          >
            <Icon type="user" style={{ marginRight: '5px' }} />
            用户管理
          </Menu.Item>
        )}
        {JSON.parse(sessionStorage.getItem('user')).type === 'admin' && (
          <Menu.Item
            key="6"
            onClick={() => this.toHref('/personalCenter/group')}
          >
            <Icon type="team" style={{ marginRight: '5px' }} />
            分组管理
          </Menu.Item>
        )}
        {JSON.parse(sessionStorage.getItem('user')).type === 'admin' && (
          <Menu.Item
            key="7"
            onClick={() => this.toHref('/personalCenter/menu')}
          >
            <Icon type="menu" style={{ marginRight: '5px' }} />
            菜单管理
          </Menu.Item>
        )}
        {JSON.parse(sessionStorage.getItem('user')).type === 'owner' && (
          <Menu.Item
            key="8"
            onClick={() => this.toHref('/personalCenter/setting')}
          >
            <Icon type="setting" style={{ marginRight: '5px' }} />
            发布文章权限管理
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item key="9" onClick={() => this.doLogout()}>
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
    const { avatar, nickName, topMenu } = this.props;
    console.log(topMenu);
    return (
      <Header>
        <div className="f-left color_white">
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.onClick}
          />
          {topMenu}
        </div>
        <div className="f-right">
          <ul className="head-nav-list">
            <li>
              <Dropdown overlay={this.dropdownMenu()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#/">
                  {/* <Icon type="user" />Administrator<Icon type="down" /> */}
                  <img
                    src={
                      avatar ||
                      'https://avatars2.githubusercontent.com/u/11366654?s=64&v=4'
                    }
                    alt="user"
                    className="user-avator"
                  />
                  {nickName ||
                    JSON.parse(window.sessionStorage.getItem('user')).name}
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
            {/* <li>
              <Dropdown overlay={this.dropdownSetting()} trigger={['click']}>
                <a className="ant-dropdown-link" href="#/">
                  <Icon type="setting" />
                </a>
              </Dropdown>
            </li> */}
          </ul>
        </div>
        <div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">{/* <Link to="/admin">Home</Link> */}</Menu.Item>
          </Menu>
        </div>
      </Header>
    );
  }
}

// export default AppHeader;
const mapStateToProps = state => ({
  avatar: state.aside.avatar,
  nickName: state.aside.nickName,
  topMenu: state.menu.topMenu
});

// const mapDispatchToProps = dispatch => ({
//   getMenu: dispatch.menu.getMenu,
//   getGroup: dispatch.menu.getGroup,
//   getInitMenu: dispatch.query.getInitMenu,
//   getInitUser: dispatch.query.getInitUser,
//   getInitGroup: dispatch.query.getInitGroup
// });

export default connect(mapStateToProps)(AppHeader);
