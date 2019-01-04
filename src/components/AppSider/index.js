import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

const logoImg = require('../../assets/images/logo.png');

// const { SubMenu } = Menu;
const { Sider } = Layout;

class AppSider extends React.Component {
  state = {
    // limit: 100,
    // menu: []
  };

  componentDidMount() {
    // const obj = {
    //   url: `${JSON.parse(sessionStorage.getItem('user'))._id}/menus`,
    //   query: {
    //     limit: this.state.limit,
    //     offset: 0
    //   }
    // };
    // this.queryUser(obj);
  }

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
    let items = [];
    items = menus.map(menu => (
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
      <Menu.Item key={menu._id}>
        <p
          onClick={() => {
            this.toHref(menu._id);
          }}
        >
          {/* {menu.icon_url ? <img src={menu.icon_url} alt="" /> : ''} */}
          <Icon type="appstore" />
          <span className="nav-text">{menu.name}</span>
          {/* {!this.props.collapsed ? (
            <span className="nav-text">{menu.name}</span>
          ) : (
            ''
          )} */}
        </p>
      </Menu.Item>
    ));
    return items;
  };

  toHref(target) {
    console.log(target);
    console.log(this);
    this.props.history.push(`/admin/console/${target}`);
  }

  render() {
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
export default connect(mapStateToProps)(AppSider);
