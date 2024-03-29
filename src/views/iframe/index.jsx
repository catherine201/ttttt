import React from 'react';
// import PropTypes from 'prop-types';
import './iframe.less';
import store from '../../store';

const arr = store.getState().menu.ownMenuArr;

function Test(props) {
  console.log(props.match.params.id);
  const id = props.match.params.id;
  let srcAddr = arr.filter(item => item._id === id)[0].target;
  switch (true) {
    case srcAddr.startsWith('http://dash-update.tbnb.io'):
      srcAddr = `${srcAddr}?id=703fc6949ad96cd3fe08f5ac16e3adc3&token=${
        JSON.parse(sessionStorage.getItem('user')).access_token
      }&openid=${JSON.parse(sessionStorage.getItem('user')).openid}`;
      break;
    case srcAddr.startsWith('http://dash-art.tbnb.io'):
      srcAddr = `${srcAddr}?id=79ae03d05626dcc0c5c207e0cdc682b6&token=${
        JSON.parse(sessionStorage.getItem('user')).access_token
      }&openid=${JSON.parse(sessionStorage.getItem('user')).openid}`;
      break;
    case srcAddr.startsWith('http://dash-otc.tbnb.io'):
      srcAddr = `${srcAddr}?id=9752da7278fd6c3495c8b4fdb29a8a29&token=${
        JSON.parse(sessionStorage.getItem('user')).access_token
      }&openid=${JSON.parse(sessionStorage.getItem('user')).openid}`;
      break;
    default:
      break;
  }
  console.log(srcAddr);
  // const arr = props.route.path.split('/');
  // const name = arr[arr.length - 1];
  // console.log(name);
  // const srcAddr = function() {
  //   switch (name) {
  //     case 'baidu':
  //       return 'https://www.baidu.com';
  //     case 'aliyun':
  //       return 'https://www.aliyun.com/';
  //     default:
  //       return 'https://www.baidu.com';
  //   }
  // };
  return (
    <div className="iframe">
      <iframe
        title="hh"
        name="myiframe"
        id="myIframe"
        src={srcAddr}
        frameBorder="0"
        align="left"
        scrolling="no"
      >
        <p>你的浏览器不支持iframe标签</p>
      </iframe>
    </div>
  );
}

// Test.propTypes = {
//   test: PropTypes.string.isRequired
// };
export default Test;
