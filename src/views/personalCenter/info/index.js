import React from 'react';
import { Upload, Divider, Avatar, Button, Input } from 'antd';
// import PropTypes from 'prop-types';
import styles from './info.less';
import createApi from '../../../api/info';

const reqwest = require('reqwest');

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

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
      nickName: JSON.parse(sessionStorage.getItem('user')).nickname,
      imageUrl: '',
      uploadUrl: ''
      // 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      // srcImg: null
    };
    this.reviseNickName = this.reviseNickName.bind(this);
  }

  onChangeNickName = e => {
    this.setState({ nickName: e.target.value });
  };

  reviseNickName = () => {
    console.log(this.state.nickName);
    const obj = {
      url: `${JSON.parse(sessionStorage.getItem('user')).openid}/nickname`,
      query: {
        access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
        nickname: this.state.nickName
      }
    };
    this.handleReviseNickName(obj);
  };

  handleReviseNickName = async obj => {
    const res = await createApi.reviseUserInfo(obj);
    if (res) {
      console.log(res);
      const userInfo = JSON.parse(sessionStorage.getItem('user'));
      userInfo.nickname = this.state.nickName;
      sessionStorage.setItem('user', JSON.stringify(userInfo));
    }
  };

  // handleChange = info => {
  //   if (info.file.status === 'uploading') {
  //     // this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl
  //         // loading: false
  //       })
  //     );
  //   }
  // };

  // beforeUpload = file => {
  //   const isJPG = file.type === 'image/jpeg';
  //   if (!isJPG) {
  //     this.$msg.error('You can only upload JPG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     this.$msg.error('Image must smaller than 2MB!');
  //   }
  //   return isJPG && isLt2M;
  // };
  handleUpload = file => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    console.log(this.state.uploadUrl);
    // You can use any AJAX library you like
    reqwest({
      url: window.location.host.includes('localhost')
        ? this.state.uploadUrl.replace(
            'http://wwwblockchain.oss-cn-shenzhen.aliyuncs.com',
            '/oss'
          )
        : this.state.uploadUrl,
      method: 'put',
      // contentType: 'application/x-www-form-urlencoded',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Disposition': 'attachment'
      },
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          imageUrl: this.state.uploadUrl.split('?')[0]
        });
        this.$msg.success('upload successfully.');
      },
      error: () => {
        this.$msg.error('upload failed.');
      }
    });
  };

  uploadFile = async (obj, file) => {
    // this.setState({
    //   showApp: true
    // });
    const res = await createApi.uploadFile(obj);
    console.log(res);
    if (res && res.error_code === 1) {
      this.setState(
        {
          uploadUrl: res.data.url
        },
        () => {
          console.log(file);
          this.handleUpload(file);
        }
      );
    }
  };

  beforeUpload = file => {
    const obj = {
      query: {
        // openid: JSON.parse(sessionStorage.getItem('user')).openid,
        access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
        // name: `${parseInt(100 * Math.random())}${file.name}`,
        name: `backup_management_${file.name}`,
        method_name: 'put'
      },
      url: `${JSON.parse(sessionStorage.getItem('user')).openid}/signature`
    };
    this.uploadFile(obj, file);
    return false;
  };

  render() {
    return (
      <div className={styles.info_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>个人信息</h2>
        <Divider />
        <div className={styles.top_info}>
          <div className={styles.top_info_left}>
            {this.state.imageUrl}
            {this.state.imageUrl ? (
              <img
                src={this.state.imageUrl}
                className={styles.Avatar}
                alt="头像"
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
              // onChange={this.handleChange}
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
                {JSON.parse(sessionStorage.getItem('user')).openid}
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
            <Button type="primary" onClick={this.reviseNickName}>
              修改
            </Button>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}
