import React from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Icon, Divider, Modal, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import ReviseControl from './reviseControl';
import styles from './index.less';
import createApi from '../../../api/userMsg';
import { idToName } from '../../../utils';

class Console extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      searchText: '', // table里面的search
      userNameInput: '', // 头部的查询
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 6
      },
      showModal: 0, // 0 表示不显示modal 1 表示显示 新增分组  2 表示显示 编辑分组 3 表示显示修改组权限
      data: [],
      originalSendData: {}, // 发送给编辑组件的最初值
      editSendData: {}, // 发送给修改权限组件的值
      limit: 6, // 一页多少个项
      editId: ''
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    // const obj = {
    //   access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
    //   limit: this.state.limit,
    //   offset: 0
    // };
    // this.queryUser(obj);
    !this.props.groupArr.length ? this.props.getGroup() : false;
    // console.log(this.props);
    // const pagination = { ...this.state.pagination };
    // pagination.total = res.paging.total;
    // console.log(res.paging.total);
    !this.props.initUser.datas ? this.props.getInitUser() : false;
    // pagination.total =
    //   this.props.initUser.paging && this.props.initUser.paging.total;
    // this.setState({
    //   pagination,
    //   data: this.props.initUser.datas
    // });
  }

  queryUser = async obj => {
    const res = await createApi.queryUser(obj);
    if (res) {
      // console.log(res);
      const pagination = { ...this.state.pagination };
      // pagination.total = res.paging.total;
      // console.log(res.paging.total);
      pagination.total = res.paging.total;
      this.setState({
        pagination,
        data: res.datas
      });
      console.log(this.state.data);
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
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
      limit: 6,
      offset: (pagination.current - 1) * this.state.limit
    };
    this.queryUser(obj);
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

  changeUserName = e => {
    this.setState({
      userNameInput: e.target.value
    });
  };

  emitEmptyName = () => {
    this.userNameInput.focus();
    this.setState({ userNameInput: '' });
  };

  reviseTeam = async obj => {
    const res = await createApi.reviseTeam(obj);
    if (res) {
      this.setState({
        showModal: 0
      });
      const obj = {
        access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
        limit: this.state.limit,
        offset: this.state.pagination.current
          ? (this.state.pagination.current - 1) * this.state.limit
          : 0
      };
      this.queryUser(obj);
    }
  };

  handleOk = e => {
    console.log(e);
    const { editSendData, editId } = this.state;
    console.log(editSendData);
    console.log(editId);
    const obj = {
      url: `${editId}/teams`,
      query: {
        team_ids: editSendData
      }
    };
    this.reviseTeam(obj);
  };

  handleCancel = () => {
    // 修改权限那里如果取消就拿回原来的值
    this.setState({
      data: this.state.originalSendData,
      showModal: 0
    });
  };

  handleEdit = (val, data, id) => {
    console.log(id);
    this.setState({
      originalSendData: JSON.parse(JSON.stringify(this.state.data)),
      editSendData: data,
      showModal: val,
      editId: id
    });
  };

  searchUserInfo = () => {};

  render() {
    const { groupArr, initUser } = this.props;
    const { editSendData } = this.state;
    const nameSuffix = this.state.userNameInput ? (
      <Icon type="close-circle" onClick={this.emitEmptyName} />
    ) : null;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '5%',
        ...this.getColumnSearchProps('name')
      },
      // {
      //   title: '电话',
      //   dataIndex: 'phone',
      //   key: 'phone',
      //   ...this.getColumnSearchProps('phone')
      // },
      // {
      //   title: '邮箱',
      //   dataIndex: 'email',
      //   key: 'email',
      //   ...this.getColumnSearchProps('email')
      // },
      // {
      //   title: 'team_ids',
      //   dataIndex: 'team_ids',
      //   key: 'team_ids'
      // },
      {
        title: '分组',
        // dataIndex: 'teams',
        // key: 'teams',
        width: '20%',
        render: text => (
          <span>
            <Tooltip
              placement="topLeft"
              title={text.team_ids && idToName(text.team_ids, groupArr)}
            >
              <span className={`${styles.dotSpan}`}>
                {/* {text.teams && text.teams.join(',')} */}
                {text.team_ids && idToName(text.team_ids, groupArr)}
              </span>
            </Tooltip>
            <Icon
              className={`${styles.Icon}`}
              type="form"
              onClick={() => {
                this.handleEdit(3, text.team_ids, text._id);
              }}
            />
          </span>
        )
      }
      // {
      //   title: '组员',
      //   // dataIndex: 'teams',
      //   // key: 'teams',
      //   width: '20%',
      //   render: text => (
      //     <span>
      //       <Tooltip
      //         placement="topLeft"
      //         title={text.teams && text.teams.join(',')}
      //       >
      //         <span className={`${styles.dotSpan}`}>
      //           {text.teams && text.teams.join(',')}
      //         </span>
      //       </Tooltip>
      //     </span>
      //   )
      // }
    ];
    return (
      <div className={`groupMsg_wrapper ${styles.groupMsg_wrapper}`}>
        {/* <h2 className={`add_h2 ${styles.h2}`}>分组管理</h2>
        <Divider /> */}
        <div className={`query ${styles.query}`}>
          <h2 className={`main_title ${styles.main_title}`}>筛选条件: </h2>
          <div className={`${styles.query_line}`}>
            <Input
              placeholder="请输入用户名称"
              value={this.state.userNameInput}
              onChange={e => this.changeUserName(e)}
              onPressEnter={() => this.searchUserInfo()}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={nameSuffix}
              ref={node => (this.userNameInput = node)}
            />
            <Button type="primary" icon="search">
              查询
            </Button>
          </div>
        </div>
        <Divider />
        <div className={`flex ${styles.result_top}`}>
          <h2>查询结果: </h2>
          {/* <Button type="primary" onClick={e => this.toShowModal(e, 1)}>
            新增
          </Button> */}
        </div>

        <Table
          columns={columns}
          dataSource={this.state.data.length ? this.state.data : initUser.datas}
          pagination={
            this.state.pagination.total !== undefined
              ? this.state.pagination
              : initUser.paging
          }
          onChange={this.handleTableChange}
          rowKey={record => {
            console.log(record.open_id);
            return record.open_id;
          }}
        />
        <Modal
          className="groupMsg_modal"
          title="修改分组"
          // {this.state.showModal === 3 && width={860}}
          width={this.state.showModal === 3 ? 860 : 540}
          visible={Boolean(this.state.showModal)}
          centered
          okText="确认"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.showModal === 3 && (
            <ReviseControl controlData={editSendData} />
          )}
        </Modal>
      </div>
    );
  }
}

// export default Console;
const mapStateToProps = state => ({
  groupArr: state.menu.groupArr,
  initUser: state.query.initUser
});
const mapDispatchToProps = dispatch => ({
  // getMenu: dispatch.menu.getMenu,
  getGroup: dispatch.menu.getGroup,
  getInitUser: dispatch.query.getInitUser
  // getInitGroup: dispatch.query.getInitGroup
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
