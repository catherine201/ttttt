import React from 'react';
import { Table, Input, Button, Icon, Divider, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import AddEditMenu from './addEditMenu';
import styles from './index.less';

export default class Console extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      searchText: '', // table里面的search
      menuNameInput: '', // 头部的查询
      menuAddrInput: '',
      pagination: {},
      showModal: 0, // 0 表示不显示modal 1 表示显示 新增菜单  2 表示显示 编辑菜单
      data: [
        {
          key: '1',
          name: '控制台1',
          remark: '客服',
          sort: 0,
          target: 'http://baidu.com',
          icon_url: 'http://aliyun.com',
          parent_id: '555'
        },
        {
          key: '2',
          name: '控制台2',
          remark: '客服',
          sort: 0,
          target: 'http://baidu.com',
          icon_url: 'http://aliyun.com',
          parent_id: '555'
        },
        {
          key: '3',
          name: '控制台3',
          remark: '客服',
          sort: 0,
          target: 'http://baidu.com',
          icon_url: 'http://aliyun.com',
          parent_id: '555'
        },
        {
          key: '4',
          name: '控制台4',
          remark: '客服',
          sort: 0,
          target: 'http://baidu.com',
          icon_url: 'http://aliyun.com',
          parent_id: '555'
        }
      ],
      sendData: {} // 发送给新增编辑组件的值
    };
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
        return '新增菜单';
      case 2:
        return '编辑菜单';
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
    console.log(pagination);
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

  changeMenuName = e => {
    this.setState({
      menuNameInput: e.target.value
    });
  };

  changeAddr = e => {
    this.setState({
      menuAddrInput: e.target.value
    });
  };

  emitEmptyName = () => {
    this.menuNameInput.focus();
    this.setState({ menuNameInput: '' });
  };

  emitEmptyAddr = () => {
    this.menuAddrInput.focus();
    this.setState({ menuAddrInput: '' });
  };

  handleOk = e => {
    console.log(e);
    switch (this.state.showModal) {
      case 1: // 新增 调接口
        console.log(this.state.sendData);
        break;
      case 2: // 修改  调接口
        console.log(this.state.sendData);
        break;
      default:
        break;
    }
    this.setState({
      showModal: 0
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      showModal: 0
    });
  };

  toShowModal = (e, num, data) => {
    console.log(data);
    switch (num) {
      case 1:
        this.setState({
          sendData: {
            name: '',
            remark: '',
            sort: '',
            target: '',
            icon_url: '',
            parent_id: ''
          }
        });
        break;
      case 2:
        this.setState({
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

  handleEdit = val => {
    this.setState({
      showModal: val
    });
  };

  searchMenuInfo = () => {};

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
    const nameSuffix = this.state.menuNameInput ? (
      <Icon type="close-circle" onClick={this.emitEmptyName} />
    ) : null;
    const addrSuffix = this.state.menuAddrInput ? (
      <Icon type="close-circle" onClick={this.emitEmptyAddr} />
    ) : null;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        // width: '20%',
        ...this.getColumnSearchProps('name')
      },
      {
        title: '描述',
        dataIndex: 'remark',
        key: 'remark',
        ...this.getColumnSearchProps('remark')
      },
      {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
        ...this.getColumnSearchProps('sort')
      },
      {
        title: '跳转地址',
        dataIndex: 'target',
        key: 'target',
        ...this.getColumnSearchProps('target')
      },
      {
        title: '图标地址',
        dataIndex: 'icon_url',
        key: 'icon_url',
        ...this.getColumnSearchProps('icon_url')
      },
      {
        title: '父菜单id',
        dataIndex: 'parent_id',
        key: 'parent_id',
        ...this.getColumnSearchProps('parent_id')
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
        // ...this.getColumnSearchProps('address')
      }
    ];
    const { sendData } = this.state;
    return (
      <div className={`menuMsg_wrapper ${styles.menuMsg_wrapper}`}>
        <div className={`query ${styles.query}`}>
          <h2 className={`main_title ${styles.main_title}`}>筛选条件: </h2>
          <div className={`${styles.query_line}`}>
            <Input
              placeholder="请输入菜单名称"
              value={this.state.menuNameInput}
              onChange={e => this.changeMenuName(e)}
              onPressEnter={() => this.searchMenuInfo()}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={nameSuffix}
              ref={node => (this.menuNameInput = node)}
            />
            <Input
              placeholder="请输入跳转地址"
              value={this.state.menuAddrInput}
              onChange={e => this.changeAddr(e)}
              onPressEnter={() => this.searchMenuInfo()}
              prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={addrSuffix}
              ref={node => (this.menuAddrInput = node)}
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
          width={860}
          visible={Boolean(this.state.showModal)}
          centered
          okText="确认"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {(this.state.showModal === 1 || this.state.showModal === 2) && (
            <AddEditMenu showModal={this.state.showModal} sendData={sendData} />
          )}
        </Modal>
      </div>
    );
  }
}
