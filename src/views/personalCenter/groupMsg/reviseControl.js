import React from 'react';
// import { Form, Input, Tooltip, Icon } from 'antd';
// import { Divider } from 'antd';
import { Input, Table, Tag, Tooltip } from 'antd';
import styles from './index.less';

const Search = Input.Search;
class ResiveControl extends React.Component {
  state = {
    tags: [],
    data: [
      {
        id: '控制台1',
        module: '控制台1'
      },
      {
        id: '控制台2',
        module: '控制台2'
      },
      {
        id: '控制台3',
        module: '控制台3'
      },
      {
        id: '控制台4',
        module: '控制台4'
      },
      {
        id: 'A模块',
        module: 'A模块'
      },
      {
        id: 'B模块',
        module: 'B模块'
      },
      {
        id: 'C模块',
        module: 'C模块'
      },
      {
        id: 'D模块',
        module: 'D模块'
      }
    ]
  };

  componentDidMount() {
    this.setState({
      tags: this.props.controlData
    });
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  render() {
    const { tags, data } = this.state;
    const columns = [
      {
        title: '菜单',
        dataIndex: 'module'
      }
    ];
    const rowSelection = {
      selectedRowKeys: tags,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
        // 先在tag里面把data 里面的数据删除，再把最新的selectedRows 添加进去
        const tags = this.state.tags;
        data.forEach(item => {
          if (tags.indexOf(item.module) !== -1) {
            tags.splice(tags.indexOf(item.module), 1);
          }
        });
        selectedRows.forEach(item => {
          // tags = [...tags, item.module];
          tags.push(item.module);
        });
        this.setState({
          tags
        });
      },
      getCheckboxProps: record => ({
        module: record.module
      })
    };
    return (
      <div
        className={`reviseControl_modal_wrapper ${
          styles.reviseControl_modal_wrapper
        }`}
      >
        <div
          className={`reviseControl_modal_left ${
            styles.reviseControl_modal_left
          }`}
        >
          <h2>添加权限模块</h2>
          <Search
            placeholder="请输入您要添加的模块"
            onSearch={value => console.log(value)}
            enterButton
          />
          <Table
            rowKey={record => record.id}
            className={styles.search_tab}
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.data}
            pagination={false}
            scroll={{ y: 240 }}
          />
          <div className="text-right">
            {/* <Button
              type="primary"
              onClick={() => {
                this.addHandle(templateSelectedRows);
              }}
            >
              添加
            </Button> */}
          </div>
          {/* <Divider dashed /> */}
        </div>
        {/* <Divider type="vertical" /> */}
        <div
          className={`reviseControl_modal_right ${
            styles.reviseControl_modal_right
          }`}
        >
          <h2>已有权限模块</h2>
          {tags &&
            tags.map(tag => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable
                  afterClose={() => this.handleClose(tag)}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
        </div>
      </div>
    );
  }
}

export default ResiveControl;
