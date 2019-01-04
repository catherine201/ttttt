import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Table, Input, Button, Icon, Divider, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import AddEditGroup from './addEditGroup';
import ReviseControl from './reviseControl';
import CheckUser from './checkUser';
import styles from './index.less';
import createApi from '../../../api/groupMsg';
import { idToName } from '../../../utils';

class Console extends React.Component {
  static propTypes = {
    // getMenu: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      searchText: '', // table里面的search
      groupNameInput: '', // 头部的查询
      groupDescInput: '',
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 6
      },
      showModal: 0, // 0 表示不显示modal 1 表示显示 新增分组  2 表示显示 编辑分组 3 表示显示修改组权限
      data: [],
      sendData: {}, // 发送给新增编辑组件的值
      originalSendData: {}, // 发送给新增编辑组件的最初值
      editSendData: {}, // 发送给修改权限组件的值
      limit: 6,
      userInfo: [] // 用户信息
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    !this.props.menuArr.length ? this.props.getMenu() : false;
    !this.props.initGroup.datas ? this.props.getInitGroup() : false;
    // console.log('重新创建');
    // const obj = {
    //   limit: this.state.limit,
    //   offset: 0
    // };
    // this.queryTeams(obj);
  }

  queryTeams = async obj => {
    const res = await createApi.queryTeams(obj);
    if (res && res.datas) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total;
      pagination.total = res.paging.total;
      this.setState({
        pagination,
        data: res.datas
      });
    }
  };

  queryUsers = async obj => {
    const res = await createApi.queryTeams(obj);
    if (res && res.datas) {
      this.setState({
        userInfo: res.datas
      });
    }
  };

  moDalTitle = () => {
    switch (this.state.showModal) {
      case 1:
        return '新增分组';
      case 2:
        return '编辑分组';
      case 3:
        return '修改组权限';
      case 4:
        return '查看用户';
      default:
        return '';
    }
  };

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      limit: 6,
      offset: (pagination.current - 1) * this.state.limit
    };
    this.queryTeams(obj);
    this.setState({
      pagination: pager
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  changeGroupName = e => {
    this.setState({
      groupNameInput: e.target.value
    });
  };

  changeGroupDesc = e => {
    this.setState({
      groupDescInput: e.target.value
    });
  };

  emitEmptyName = () => {
    this.userNameInput.focus();
    this.setState({ groupNameInput: '' });
  };

  emitEmptyDesc = () => {
    this.userDescInput.focus();
    this.setState({ groupDescInput: '' });
  };

  addTeam = async obj => {
    const res = await createApi.addTeam(obj);
    if (res) {
      const obj = {
        limit: this.state.limit,
        offset: this.state.pagination.current
          ? (this.state.pagination.current - 1) * this.state.limit
          : 0
      };
      this.queryTeams(obj);
    }
  };

  revise = async (bool, sendData) => {
    if (!bool) {
      const obj = {
        url: `${sendData._id}/menus`,
        query: {
          menu_ids: sendData.menu_ids
        }
      };
      const res = await createApi.reviseTeam(obj);
      if (res) {
        this.reviseTeam({
          url: sendData._id,
          query: {
            name: sendData.name,
            description: sendData.description
          }
        });
      }
    } else {
      this.reviseTeam({
        url: sendData._id,
        query: {
          name: sendData.name,
          description: sendData.description
        }
      });
    }
  };

  reviseTeam = async obj => {
    const res = await createApi.reviseTeam(obj);
    if (res) {
      const obj = {
        limit: this.state.limit,
        offset: this.state.pagination.current
          ? (this.state.pagination.current - 1) * this.state.limit
          : 0
      };
      this.queryTeams(obj);
    }
  };

  deleteTeam = async obj => {
    const res = await createApi.deleteTeam(obj);
    if (res) {
      const obj = {
        limit: this.state.limit,
        offset: this.state.pagination.current
          ? (this.state.pagination.current - 1) * this.state.limit
          : 0
      };
      this.queryTeams(obj);
    }
  };

  handleOk = e => {
    console.log(e);
    const { sendData } = this.state;
    const num = this.state.showModal === 3 ? 2 : 0;
    switch (this.state.showModal) {
      case 1: // 新增
        this.formRef.props.form.validateFields((err, values) => {
          if (!err) {
            this.addTeam({
              name: values.name,
              description: values.description
            });
            this.setState({
              showModal: num
            });
          }
        });
        break;
      case 2: // 修改  这里需要先调用修改权限的再修改名称
        this.formRef.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            // 是否需要先请求修改权限
            const bool = this.state.sendData.menu_ids.equals(
              this.state.originalSendData.menu_ids
            );
            this.revise(bool, sendData);
            // const num = this.state.showModal === 3 ? 2 : 0;
            this.setState({
              showModal: num
            });
          }
        });
        break;
      case 3: // 修改权限
        this.setState({
          showModal: num
        });
        break;
      default:
        break;
    }
  };

  handleCancel = () => {
    // 修改权限那里如果取消就拿回原来的值
    switch (this.state.showModal) {
      case 3:
        this.setState({
          sendData: {
            name: this.state.originalSendData.name,
            description: this.state.originalSendData.description,
            menu_ids: this.state.originalSendData.menu_ids
          }
        });
        break;
      default:
        break;
    }
    const num = this.state.showModal === 3 ? 2 : 0;
    this.setState({
      showModal: num
    });
  };

  toShowModal = (e, num, data) => {
    switch (num) {
      case 1:
        this.setState({
          sendData: {
            name: '',
            description: '',
            menu_ids: []
          }
        });
        break;
      case 2:
        this.setState({
          originalSendData: JSON.parse(JSON.stringify(data)),
          sendData: JSON.parse(JSON.stringify(data))
        });
        break;
      case 4:
        // console.log(data);
        const obj = {
          url: `${data._id}/accounts`,
          query: {
            limit: 100,
            offset: 0
          }
        };
        this.queryUsers(obj);
        break;
      default:
        break;
    }
    this.setState({
      showModal: num
    });
  };

  handleEdit = (val, data) => {
    this.setState({
      editSendData: data,
      showModal: val
    });
  };

  deleteHandle = (e, data) => {
    this.$modal.confirm({
      title: '你确定删除么？',
      content: '',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        this.deleteTeam({ url: data._id });
      }
    });
  };

  render() {
    const { menuArr, initGroup } = this.props;
    const { sendData, editSendData, userInfo } = this.state;
    const nameSuffix = this.state.groupNameInput ? (
      <Icon type="close-circle" onClick={this.emitEmptyName} />
    ) : null;
    const descSuffix = this.state.groupDescInput ? (
      <Icon type="close-circle" onClick={this.emitEmptyDesc} />
    ) : null;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        ...this.getColumnSearchProps('name')
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '20%',
        ...this.getColumnSearchProps('description')
      },
      {
        title: '权限模块',
        width: '20%',
        render: text => (
          // console.log(text);
          <span>
            {/* {text.menu_ids.map(tag => (
                <span color="blue" key={tag}>
                  {tag}
                </span>
              ))} */}
            {idToName(text.menu_ids, menuArr)}
          </span>
        )
      },
      {
        title: '操作',
        render: text => (
          <div className={`action ${styles.action}`}>
            <Button type="primary" onClick={e => this.toShowModal(e, 2, text)}>
              编辑
            </Button>
            <Button type="primary" onClick={e => this.toShowModal(e, 4, text)}>
              查看用户
            </Button>
            <Button type="danger" onClick={e => this.deleteHandle(e, text)}>
              删除
            </Button>
          </div>
        )
      }
    ];
    return (
      <div className={`groupMsg_wrapper ${styles.groupMsg_wrapper}`}>
        {/* <h2 className={`add_h2 ${styles.h2}`}>分组管理</h2>
        <Divider /> */}
        <div className={`query ${styles.query}`}>
          <h2 className={`main_title ${styles.main_title}`}>筛选条件: </h2>
          <div className={`${styles.query_line}`}>
            <Input
              placeholder="请输入分组名称"
              value={this.state.groupNameInput}
              onChange={e => this.changeGroupName(e)}
              onPressEnter={() => this.searchGroupInfo()}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={nameSuffix}
              ref={node => (this.userNameInput = node)}
            />
            <Input
              placeholder="请输入分组描述"
              value={this.state.groupDescInput}
              onChange={e => this.changeGroupDesc(e)}
              onPressEnter={() => this.searchGroupInfo()}
              prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={descSuffix}
              ref={node => (this.userDescInput = node)}
            />
            <Button type="primary" icon="search">
              查询
            </Button>
          </div>
        </div>
        <Divider />
        <div className={`flex ${styles.result_top}`}>
          <h2>查询结果: </h2>
          <Button type="primary" onClick={e => this.toShowModal(e, 1)}>
            新增
          </Button>
        </div>

        {this.state.isShow && (
          <Table
            columns={columns}
            // dataSource={this.state.data}
            // pagination={this.state.pagination}
            dataSource={
              this.state.data.length ? this.state.data : initGroup.datas
            }
            pagination={
              this.state.pagination.total !== undefined
                ? this.state.pagination
                : initGroup.paging
            }
            onChange={this.handleTableChange}
            rowKey={record => {
              console.log(record._id);
              return record._id;
            }}
          />
        )}
        <Modal
          className={`groupMsg_modal ${
            this.state.showModal === 4 ? 'noFooter' : ''
          }`}
          title={this.moDalTitle()}
          // {this.state.showModal === 3 && width={860}}
          width={this.state.showModal === 3 ? 860 : 540}
          visible={Boolean(this.state.showModal)}
          centered
          okText="确认"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {(this.state.showModal === 1 || this.state.showModal === 2) && (
            <AddEditGroup
              showModal={this.state.showModal}
              handleEdit={this.handleEdit}
              sendData={sendData}
              wrappedComponentRef={form => (this.formRef = form)}
            />
          )}
          {this.state.showModal === 3 && (
            <ReviseControl controlData={editSendData} />
          )}
          {this.state.showModal === 4 && <CheckUser userInfo={userInfo} />}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuArr: state.menu.menuArr,
  initGroup: state.query.initGroup
});

const mapDispatchToProps = dispatch => ({
  getMenu: dispatch.menu.getMenu,
  getInitGroup: dispatch.query.getInitGroup
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
