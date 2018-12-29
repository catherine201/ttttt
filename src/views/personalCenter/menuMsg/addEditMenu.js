import React from 'react';
import { Form, Input, Row, Col } from 'antd';
import styles from './index.less';

class AddEditMenu extends React.Component {
  state = {
    data: {}
  };

  // name: '控制台4',
  // remark: '客服',
  // sort: 0,
  // target: 'http://baidu.com',
  // icon_url: 'http://aliyun.com',
  // parent_id: '555'
  componentDidMount() {
    this.setState({
      data: this.props.sendData
    });
  }

  onChangeValue = (e, val) => {
    console.log(e, val);
    this.state.data[val] = e.target.value;
    this.setState({ data: this.state.data });
  };

  render() {
    const { data } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    return (
      <div className={`menuMsg_modal_wrapper ${styles.menuMsg_modal_wrapper}`}>
        {/* layout="horizontal" */}
        <Form
          className={`menuMsg_modal_Form ${styles.menuMsg_modal_Form}`}
          layout="horizontal"
        >
          <Row>
            <Col span={12}>
              <Form.Item label="名称" {...formItemLayout}>
                <Input
                  placeholder="请输入分组名称"
                  value={data.name}
                  onChange={e => {
                    this.onChangeValue(e, 'name');
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="描述" {...formItemLayout}>
                <Input
                  placeholder="请输入描述"
                  value={data.remark}
                  onChange={e => {
                    this.onChangeValue(e, 'remark');
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="排序" {...formItemLayout}>
                <Input
                  placeholder="请输入排序"
                  value={data.sort}
                  onChange={e => {
                    this.onChangeValue(e, 'sort');
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="父菜单id" {...formItemLayout}>
                <Input
                  placeholder="请输入父菜单id"
                  value={data.parent_id}
                  onChange={e => {
                    this.onChangeValue(e, 'parent_id');
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="跳转地址" {...formItemLayout}>
                <Input
                  placeholder="请输入跳转地址"
                  className="doubleWidth"
                  value={data.target}
                  onChange={e => {
                    this.onChangeValue(e, 'target');
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="图标地址" {...formItemLayout}>
                <Input
                  placeholder="请输入图标地址"
                  className="doubleWidth"
                  value={data.icon_url}
                  onChange={e => {
                    this.onChangeValue(e, 'icon_url');
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default AddEditMenu;
