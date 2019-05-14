import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { emnuIcon } from '../../utils/map';

const logoImg = require('../../assets/images/logo.png');

// const { SubMenu } = Menu;
const { Sider } = Layout;

class AppSider extends React.Component {
  state = {
    // limit: 100,
    // menu: []
    id: ''
  };

  componentDidMount() {
    console.log(this.props.location.pathname);
    const arr = this.props.location.pathname.split('/');
    console.log(arr[arr.length - 1]);
    this.setState({
      id: arr[arr.length - 1]
    });
    // const obj = {
    //   url: `${JSON.parse(sessionStorage.getItem('user'))._id}/menus`,
    //   query: {
    //     limit: this.state.limit,
    //     offset: 0
    //   }
    // };
    // this.queryUser(obj);
  }

  // componentWillReceiveProps() {
  //   const arr = this.props.location.pathname.split('/');
  //   console.log(arr[arr.length - 1]);
  //   this.setState({
  //     id: arr[arr.length - 1]
  //   });
  // }

  // queryUser = async obj => {
  //   const res = await createApi.queryUser(obj);
  //   if (res) {
  //     // this.setState({
  //     //   menu: res.datas
  //     // });
  //     this.setState({
  //       menu: res.datas
  //     });
  //     // console.log(pagination.total);
  //   }
  // };

  generateMenu = function(menus) {
    const { id } = this.state;
    let items = [];
    items = menus.map(menu => {
      console.log(menu._id, id);
      console.log(menu._id === id);
      return (
        // if (Array.isArray(menu.submenu)) {
        //   return (
        //     <SubMenu
        //       key={menu.key}
        //       title={
        //         <div>
        //           <Icon type={menu.icon} />
        //           <span>{menu.text}</span>
        //         </div>
        //       }
        //     >
        //       {generateMenu(menu.submenu, true)}
        //     </SubMenu>
        //   );
        // }
        <Menu.Item
          key={menu._id}
          className={
            menu._id === id ? 'appSider-list-item-active' : 'appSider-list-item'
          }
        >
          <p
            onClick={() => {
              this.toHref(menu._id, menu.name);
            }}
          >
            {/* {menu.icon_url ? <img src={menu.icon_url} alt="" /> : ''} */}
            <Icon type={emnuIcon[menu.name] || 'appstore'} />
            <span className="nav-text">{menu.name}</span>
            {/* {!this.props.collapsed ? (
            <span className="nav-text">{menu.name}</span>
          ) : (
            ''
          )} */}
          </p>
        </Menu.Item>
      );
    });
    return items;
  };

  toHref(target, name) {
    console.log(target);
    console.log(name);
    this.setState({
      id: target
    });
    this.props.getTopMenu(name);
    this.props.history.push(`/admin/console/${target}`);
  }

  render() {
    console.log('rePain again');
    const { ownMenuArr } = this.props;
    return (
      <Sider collapsed={this.props.collapsed} trigger={null}>
        <div className="logo-box">
          <img className="logo" src={logoImg} alt="logo" />
          <span className="title">Leeker Labs PlatForm </span>
        </div>
        <div className="menu_wrap">
          <Menu theme="dark" mode="inline">
            {this.generateMenu(ownMenuArr)}
          </Menu>
        </div>
      </Sider>
    );
  }
}

// export default AppSider;
const mapStateToProps = state => ({
  ownMenuArr: state.menu.ownMenuArr
});
const mapDispatchToProps = dispatch => ({
  getTopMenu: dispatch.menu.getTopMenu
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSider);
