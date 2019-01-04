import React from 'react';
// import PropTypes from 'prop-types';
import './iframe.less';
import store from '../../store';

const arr = store.getState().menu.ownMenuArr;

function Test(props) {
  console.log(props.match.params.id);
  const id = props.match.params.id;
  const srcAddr = arr.filter(item => item._id === id)[0].target;
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
