import store from '../store';
// 进入全屏
export function requestFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    // elem.msRequestFullscreen() 没有指定元素
    document.body.msRequestFullscreen();
  }
}
// 退出全屏
export function exitFullscreen() {
  const doc = document;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * 从属性路径获取值
 * getValueByPath({err: {info: 'xxx'}}, ['err', 'info']) // xxx
 * @param {object} data 对象
 * @param {array} paths 路径数组；如: ['error', 'info']
 * @return {any} 返回属性路径值，不存在返回undefined
 * */
export const getValueByPath = (data, paths) => {
  function loop(obj, i) {
    if (i < paths.length - 1) {
      if (typeof obj[paths[i]] === 'undefined') {
        return undefined;
      }
      return loop(obj[paths[i]], ++i);
    }
    return obj[paths[i]];
  }
  return loop(data, 0);
};

// id to name
export function idToName(arr, menuArr) {
  console.log(store);
  console.log(arr);
  let str = '';
  arr.forEach((element, index) => {
    const ind = menuArr.findIndex(item => item._id === element);
    if (ind !== -1) {
      console.log(index, menuArr[ind].name);
      str += index ? `,${menuArr[ind].name}` : `${menuArr[ind].name}`;
    }
  });
  console.log(str);
  if (str.startsWith(',')) {
    str = str.substring(1);
  }
  return str;
}

export function init() {
  // Warn if overriding existing method
  if (Array.prototype.equals)
    console.warn(
      "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
    );
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array) return false;
    // compare lengths - can save a lot of time
    if (this.length !== array.length) return false;
    for (let i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] !== array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  };
  // Hide method from for-in loops
  Object.defineProperty(Array.prototype, 'equals', { enumerable: false });
}

// 删除对象属性值为空的键
export function handleObj(obj) {
  Object.keys(obj).map(item => {
    if (!obj[item]) {
      delete obj[item];
    }
  });
  return obj;
}
