import React from 'react';
import { Upload, Divider, Avatar, Button, Input } from 'antd';
// import PropTypes from 'prop-types';
import styles from './info.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// function beforeUpload(file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }

export default class Info extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      nickName: '冰琉璃2050',
      imageUrl: ''
      // 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      // srcImg: null
    };
  }

  onChangeNickName = e => {
    this.setState({ nickName: e.target.value });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl
          // loading: false
        })
      );
    }
  };

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      this.$msg.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$msg.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  };

  render() {
    return (
      <div className={styles.info_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>个人信息</h2>
        <Divider />
        <div className={styles.top_info}>
          <div className={styles.top_info_left}>
            {this.state.imageUrl ? (
              <Avatar
                src={this.state.imageUrl}
                shape="square"
                className={styles.Avatar}
              />
            ) : (
              <Avatar icon="user" className={styles.Avatar} size={130} />
            )}
            <Upload
              name="avatar"
              // listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              <Button type="primary">
                {this.state.imageUrl ? '修改头像' : '设置头像'}
              </Button>
            </Upload>
          </div>
          <div className={styles.top_info_right}>
            <div>
              <p>个人信息</p>
              <p>
                <span>UID: </span>
                19533333333
              </p>
              <p>
                <span>昵称:</span>
                <Input
                  value={this.state.nickName}
                  onChange={this.onChangeNickName}
                  className={styles.top_info_right_input}
                />
              </p>
            </div>
            <Button type="primary">修改</Button>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}
