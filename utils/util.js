const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/* 
 * isType 函数
 */
function checkNumber(obj){
  if(this.isString(obj)){
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(obj)) {
      return true;
    }
  }
  return false;
}
function isNumber(obj){
  return obj === +obj
}
function isString(obj){
  return obj === obj+''
}
function isBoolean(){
  return obj === !!obj
}
/*
 * 解析类型
*/
function parseCate(parent,child,opt){
    switch(parent){
      case 'shenghuoyongpin': 
        parent = "生活用品";
        switch(child){
          case 'yongdiande' : child = "用电的";break;
          case 'buyongdiande' : child = "不用电的";break;
          case 'yundongyongpin' : child = "运动用品";break;
          case 'daibugongju' : child = "代步工具";break;
          case 'qita' : child = "其他";break;
        }
        break;
      case 'shujixuexi': 
        parent = "书籍学习";
        switch (child) {
          case 'jiaocai': child = "教材"; break;
          case 'qitashuji': child = "其他书籍"; break;
          case 'yueqi': child = "乐器"; break;
          case 'xuexiyongpin': child = "学习用品"; break;
          case 'dianziziliao': child = "电子资料"; break;
          case 'qita': child = "其他"; break;
        }
        break;
      case 'shumachanpin': 
        parent = "数码产品";
        switch (child) {
          case 'shouji/pingban': child = "手机/平板"; break;
          case 'diannao/xianshiqi': child = "电脑/显示器"; break;
          case 'sheyingqicai': child = "摄影器材"; break;
          case 'yinxiang/erji': child = "音响/耳机"; break;
          case 'youxixiangguan': child = "游戏相关"; break;
          case 'qita': child = "其他"; break;
        }
        break;
      case 'fuzhuangxiebao': 
        parent = "服装鞋包";
        switch (child) {
          case 'nvzhuang': child = "女装"; break;
          case 'nvxie': child = "女鞋"; break;
          case 'nvbao': child = "女包"; break;
          case 'nanzhuang': child = "男装"; break;
          case 'nanxie': child = "男鞋"; break;
          case 'nanbao': child = "男包"; break;
          case 'maozi': child = "帽子"; break;
          case 'shipin': child = "饰品"; break;
          case 'qita': child = "其他"; break;
        }
        break;
      case 'haochide': 
        parent = "好吃的";
        child = "";
        break;
      case 'meizhuangmeihu': 
        parent = "美妆美护";
        switch (child) {
          case 'hufu': child = "护肤"; break;
          case 'dizhuang': child = "底妆"; break;
          case 'caizhuang': child = "彩妆"; break;
          case 'kouhong': child = "口红"; break;
          case 'xiangshui': child = "香水"; break;
          case 'zhijiayou': child = "指甲油"; break;
          case 'yiyaobaojian': child = "医疗保健"; break;
          case 'qita': child = "其他"; break;
        }
        break;
      case 'xiaofuwu': 
        parent = "小服务";
        switch (child) {
          case 'sheyingshexianghangpai': child = "摄影摄像航拍"; break;
          case 'changqidaiqukuaidi': child = "长期代取快递"; break;
          case 'keyefudao': child = "课业辅导"; break;
          case 'meizhuangmeijia': child = "美妆美甲"; break;
          case 'shiqudaigou': child = "市区代购"; break;
        }
        break;
      case 'qiugou': 
        parent = "求购";
        switch (child) {
          case 'shenghuoyongpin': child = "生活用品"; break;
          case 'shujixuexi': child = "书籍学习"; break;
          case 'shumachanpin': child = "数码产品"; break;
          case 'fuzhuangxiebao': child = "服装鞋包"; break;
          case 'haochide': child = "好吃的"; break;
          case 'meizhuangmeihu': child = "美妆美护"; break;
          case 'qiubangmang': child = "求帮忙"; break;
        }
        break;
    }
    if(opt >= 1){
      return parent + "-" + child;
    }else{
      return parent;
    }
}
function parseSch(school){
  switch(school){
    case 'quanbuxiaoqu': 
      school = "全部校区" ; break;
    case 'youyixiaoqu' : 
      school = "友谊校区" ;break;
    case  'changanxiaoqu':
      school = "长安校区";break;
  }
  return school;
}
module.exports = {
  formatTime: formatTime,
  checkNumber: checkNumber,
  isNumber : isNumber,
  isString : isString,
  isBoolean : isBoolean,
  parseCate: parseCate,
  parseSch: parseSch
}


