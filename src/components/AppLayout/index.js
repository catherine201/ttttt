import React, { Component } from 'react';
import { Layout, BackTop, Icon } from 'antd';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import router from '../../routes';
import AppHeader from '../AppHeader';
import AppSider from '../AppSider';
import AppFooter from '../AppFooter';
import PersonAside from '../personalCenter/aside';
import './app_lay_out.less';

const { Content, Footer } = Layout;

const NotAuth = () => (
  // message.warning('请登录后再操作');
  <Redirect to="/login" />
);
class App extends Component {
  state = {
    collapsed: false,
    collapseName: true
  };

  componentDidMount() {
    // 如果觉得窗口太小把collapsed放开
    // this.setState({
    //   collapsed:
    //     this.props.route.name === 'personalCenter-view' ||
    //     document.body.clientWidth < 450
    // });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  setCollapse = () => {
    this.setState({
      collapseName: !this.state.collapseName
    });
  };

  render() {
    const user = sessionStorage.getItem('user');
    if (!user) {
      // message.warning('请登录后再操作')
      // return <Redirect to="/login" />
      return <NotAuth />;
    }
    return (
      <Layout className="app-layout">
        <BackTop />
        <AppSider collapsed={this.state.collapsed} {...this.props} />
        <Layout>
          <AppHeader
            onClick={this.toggle}
            collapsed={this.state.collapsed}
            {...this.props}
          />
          <Content>
            {this.props.route.name === 'personalCenter-view' ? (
              <div className="app_layout_left_side">
                <Icon
                  type="menu-fold"
                  className={
                    this.state.collapseName
                      ? `menu-fold-left ${
                          !this.state.collapsed ? 'collap' : ''
                        }`
                      : `menu-fold-right ${
                          !this.state.collapsed ? 'collap' : ''
                        }`
                  }
                  onClick={this.setCollapse}
                />
                <PersonAside {...this.props} isShow={this.state.collapseName} />
              </div>
            ) : (
              false
            )}
            <router.view name={this.props.route.name} key="xx" />
          </Content>
          <Footer>
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

// const mapStateToProps = state => ({
//   topMenu: state.menu.topMenu
// });
export default App;
// export default connect(mapStateToProps)(App);
