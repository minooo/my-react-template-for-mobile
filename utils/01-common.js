export const CALL_API = Symbol("Call API");

export const serializeParams = params =>
  Object.entries(params)
    .map(n => `${n[0]}=${n[1]}`)
    .join("&");

export const isMobile = mobile => {
  if (!mobile) {
    return false;
  }
  const m = mobile.replace(/ /g, "");
  return /^1[3|4|5|7|8]\d{9}$/.test(m) ? m : false;
};

export const isIDNumber = id => {
  if (!id) {
    return false;
  }
  const m = id.replace(/ /g, "");
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(m) ? m : false;
};

export const isName = name => {
  if (!name) {
    return false;
  }
  const m = name.replace(/ /g, "");
  return /^[\u4e00-\u9fa5]{2,4}$/.test(m) ? m : false;
};

export const isIOS = () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

export const isAndroid = () => /(Android)/i.test(navigator.userAgent);

export const setTitle = title => {
  document.title = title;
  // eslint-disable-next-line
  if (isIOS() && !window.__wxjs_is_wkwebview) {
    const i = document.createElement("iframe");
    i.src = "/favicon.ico";
    i.style.display = "none";
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 0);
    };
    document.body.appendChild(i);
  }
};

// 对价格的去0处理
export const clipPrice = item => {
  const re = /^\d+.?\d*$/;
  const num = +item;
  const str = num.toFixed(2);

  if (!re.test(item)) {
    console.info(item, "传入的参数为非法数字，请检查！");
  }

  if (str.substr(-1) !== "0") {
    return str;
  } else if (str.substr(-2) === "00") {
    return num.toFixed(0);
  }
  return num.toFixed(1);
};

// 大额数字转万 / 亿
export const clipBigNum = item => {
  const num = +item;
  if (num >= 100000000) {
    const n1 = num / 100000000;
    const n2 = parseInt(n1, 0);
    const s2 = (parseInt(num / 10000000, 0) / 10).toFixed(1);
    if (n1 === n2 || +s2 === n2) {
      return `${n2}亿`;
    }
    return `${s2}亿`;
  }
  if (num >= 10000) {
    const n1 = num / 10000;
    const n2 = parseInt(n1, 0);
    const s2 = (parseInt(num / 1000, 0) / 10).toFixed(1);
    if (n1 === n2 || +s2 === n2) {
      return `${n2}万`;
    }
    return `${s2}万`;
  }
  return item;
};

// 从数组中随机取出若干不同的元素
export const getSomeFromArr = (arr, num) => {
  if (!arr) return null;
  if (arr.length <= num) {
    return arr;
  }
  const oldArr = [...arr];
  const newArr = [];
  function gg(array) {
    newArr.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
  }
  for (let i = 0; i < num; i += 1) {
    gg(oldArr);
  }
  return newArr;
};

// search 转为 obj
export const searchToObj = (path) => {
  const { search } = !path ? window.location : { search: path.slice(path.indexOf("?")) };
  const obj = {};
  if (!search || search.length < 1) return null;
  const arr = search.slice(1).split("&");
  arr.forEach(item => {
    const itemArr = item.split("=");
    const key = itemArr[0];
    const val = itemArr[1];
    obj[key] = val;
  });
  return obj;
};

export const addDefault = (fromArr, toArr) => {
  toArr.forEach(item => {
    const o1 = fromArr.find(x => x.key === item.key);
    item.list.unshift(o1);
  });
  return toArr;
};

// 针对card loan 的 filter数据重构
export const addFilter = (initObj, toArr) => {
  const arr = [];
  toArr.forEach(item => {
    const { key } = item;
    const list = initObj[key];
    const newList = item.list.concat(list);
    arr.push({ ...item, list: newList });
  });
  return arr;
};

export const imgUrl = str => {
  if (!str) return "";
  if (str.indexOf("http") !== -1) {
    return str;
  }
  return `http://jr.duduapp.net${str}`;
};

export const setCookie = (key, value, expiredays = 29) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${key}=${encodeURIComponent(
    value
  )};expires=${exdate.toUTCString()}`;
};

export const getCookie = key => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) return decodeURIComponent(arr[2]);
  return null;
};

export const delCookie = key => {
  const exdate = new Date();
  exdate.setTime(exdate.getTime() - 1);
  const value = getCookie(key);
  if (value)
    document.cookie = `${key}=${encodeURIComponent(
      value
    )};expires=${exdate.toUTCString()}`;
};

export const getUrlLastStr = pathStr => {
  if (!String(pathStr)) return "";
  const parts = pathStr.split("/");
  const param = parts.pop() || parts.pop();
  return param;
};

// 处理 ["11d", "12d", "15m"] 为对应的天数，月数
const arrCompare = (a, b) => {
  const a1 = a.slice(0, -1)
  const a2 = a.substr(-1, 1)
  const b1 = b.slice(0, -1)
  const b2 = b.substr(-1, 1)
  if (a2 === b2) {
    if ((+a1) < (+b1)) {
      return -1;
    }
    if ((+a1) > (+b1)) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }
  if (a2 === "m") return 1
  return -1
}
export const strTostr = str => (str.slice(0, -1) + (str.substr(-1, 1) === "d" ? "天" : "月"))
export const arrToDateString = arr => {
  if (!arr || arr.length === 0) {
    return "不存在";
  }
  const len = arr.length;
  const newArr = arr.sort(arrCompare)
  const first = strTostr(newArr[0]);
  const last = strTostr(newArr[len - 1]);
  if (len === 1) {
    return first;
  }
  return `${first}-${last}`;
};
export const arrToArr = arr => {
  if (!arr || arr.length === 0) return null
  return arr.map(item => item.num + item.type).sort(arrCompare)
}
// 还款相关计算
// 默认返回总还款
// type 1 返回利息和费用
// type 2 返回每个月应还的费用
export const fee = (num, rate, dateStr, type) => {
  const dateStrNum = +dateStr.slice(0, -1);
  const dateStrNni = dateStr.substr(-1, 1) === "d" ? 1 : dateStrNum;
  const totalFee = (+num * +rate * dateStrNni) / 100
  if (type === 1) {
    return clipPrice(totalFee);
  }
  if (type === 2) {
    return clipPrice((+num + totalFee) / dateStrNni)
  }
  return +num + totalFee
}

// 判断当前路由是否激活
export const isActiveLink = (navLink, currentLink) => {
  const index = currentLink.indexOf("?")
  let initStr
  if (index === -1) {
    initStr = currentLink
  } else {
    initStr = currentLink.substr(0, index)
  }
  const keyStr = navLink.substr(1)
  const keyArr = initStr.split("/").slice(1)
  return keyArr.some(item => item === keyStr)
}
