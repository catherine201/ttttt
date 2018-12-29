import React, { Component } from 'react';
import { message, Layout, BackTop, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
// import QueueAnim from 'rc-queue-anim'
// import {TransitionGroup, CSSTransition} from 'react-transition-group'
import router from '../../routes';
import AppHeader from '../AppHeader';
import AppSider from '../AppSider';
import AppFooter from '../AppFooter';
import PersonAside from '../personalCenter/aside';
import './app_lay_out.less';

// const PersonAside = () => import('./personalCenter/aside');

const { Content, Footer } = Layout;
// const { SubMenu } = Menu;

const NotAuth = () => {
  message.warning('请登录后再操作');
  return <Redirect to="/login" />;
};

class App extends Component {
  state = {
    collapsed: false,
    collapseName: true
  };

  componentDidMount() {
    // console.log(this.props.route.name);
    this.setState({
      collapsed:
        this.props.route.name === 'personalCenter-view' ||
        document.body.clientWidth < 450
    });
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
        <AppSider collapsed={this.state.collapsed} />
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
                      ? 'menu-fold-left'
                      : 'menu-fold-right'
                  }
                  onClick={this.setCollapse}
                />
                <PersonAside {...this.props} isShow={this.state.collapseName} />
              </div>
            ) : (
              false
            )}

            {/* <TransitionGroup> */}
            {/* <CSSTransition appear={true} classNames="fade" timeout={300}> */}
            {/* <QueueAnim> */}
            {/* name="admin-view" key="xx" */}
            <router.view name={this.props.route.name} key="xx" />
            {/* </QueueAnim> */}
            {/* </CSSTransition> */}
            {/* </TransitionGroup> */}
          </Content>
          <Footer>
            <AppFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
