import React from 'react';
import { Table, Input, Button, Icon, Divider, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import AddEditGroup from './addEditGroup';
import ReviseControl from './reviseControl';
import styles from './index.less';

export default class Console extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      searchText: '', // table里面的search
      groupNameInput: '', // 头部的查询
      groupDescInput: '',
      pagination: {},
      showModal: 0, // 0 表示不显示modal 1 表示显示 新增分组  2 表示显示 编辑分组 3 表示显示修改组权限
      data: [
        {
          key: '1',
          name: '客服组',
          description: '客服',
          menu_ids: ['A模块', 'B模块', 'C模块', 'D模块', 'E模块']
        },
        {
          key: '2',
          name: '技术组',
          description: '技术',
          menu_ids: ['A模块', 'B模块', 'C模块', 'D模块', 'E模块']
        },
        {
          key: '3',
          name: '人事组',
          description: '人事',
          menu_ids: ['A模块', 'B模块', 'C模块', 'D模块', 'E模块']
        },
        {
          key: '4',
          name: '会计组',
          description: '会计',
          menu_ids: ['A模块', 'B模块', 'C模块', 'D模块', 'E模块']
        }
      ],
      sendData: {}, // 发送给新增编辑组件的值
      originalSendData: {}, // 发送给新增编辑组件的最初值
      editSendData: {} // 发送给修改权限组件的值
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const pagination = { ...this.state.pagination };
    pagination.total = 20;
    this.setState({
      pagination
    });
  }

  moDalTitle = () => {
    switch (this.state.showModal) {
      case 1:
        return '新增分组';
      case 2:
        return '编辑分组';
      case 3:
        return '修改组权限';
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

  handleOk = e => {
    console.log(e);
    switch (this.state.showModal) {
      case 1: // 新增
        console.log(this.state.sendData);
        break;
      case 2: // 修改  这里需要先调用修改权限的再修改名称
        console.log(this.state.sendData);
        break;
      // case 3: // 修改权限
      //   console.log(this.state.sendData);
      //   break;
      default:
        break;
    }
    const num = this.state.showModal === 3 ? 2 : 0;
    this.setState({
      showModal: num
    });
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

  deleteHandle = () => {
    this.$modal.confirm({
      title: '你确定删除么？',
      content: '',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        // sessionStorage.removeItem('user');
        // this.props.history.push('/login');
      }
    });
  };

  render() {
    const { sendData, editSendData } = this.state;
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
        ...this.getColumnSearchProps('desc')
      },
      {
        title: '权限模块',
        dataIndex: 'menu_ids',
        key: 'menu_ids',
        width: '20%',
        render: tags => (
          <span>
            {tags.map(tag => (
              <span color="blue" key={tag}>
                {tag}
              </span>
            ))}
          </span>
        ),
        ...this.getColumnSearchProps('control')
      },
      {
        title: '操作',
        render: text => (
          <div className={`action ${styles.action}`}>
            <Button type="primary" onClick={e => this.toShowModal(e, 2, text)}>
              编辑
            </Button>
            <Button type="danger" onClick={e => this.deleteHandle(e)}>
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

        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
        />
        <Modal
          className="groupMsg_modal"
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
            />
          )}
          {this.state.showModal === 3 && (
            <ReviseControl controlData={editSendData} />
          )}
        </Modal>
      </div>
    );
  }
}
