(function (){
var host=document.domain;
if(!host){
//本地网页不执行
return;}

if(document.getElementById('linkpans')){
//防止重复加载

}
else{

"use strict";
;

var pans= document.createElement('b');		
pans.id='linkpans';
document.body.appendChild(pans);

var clearLink, excludedTags, linkFilter, linkMixInit, linkPack, linkify, observePage, observer, setLink, urlPrefixes, url_regexp, xPath;

url_regexp = /((https?:\/\/|www\.)[\x21-\x7e]+[\w\/]|(\w[\w._-]+\.(com|cn|org|net|info|tv|cc|gov|edu))(\/[\x21-\x7e]*[\w\/])?|ed2k:\/\/[\x21-\x7e]+\|\/|thunder:\/\/[\x21-\x7e]+=)/gi;

urlPrefixes = ['http://', 'https://', 'ftp://', 'thunder://', 'ed2k://'];

clearLink = function (event) {
  var j, len, link, prefix, ref, ref1, url;
  link = (ref = event.originalTarget) != null ? ref : event.target;
  if (!(link != null && link.localName === "a" && ((ref1 = link.className) != null ? ref1.indexOf("textToLink") : void 0) !== -1)) {
    return;
  }
  url = link.getAttribute("href");
  //console.log url
  for (j = 0, len = urlPrefixes.length; j < len; j++) {
    prefix = urlPrefixes[j];
    if (url.indexOf(prefix) === 0) {
      return;
    }
  }
  return link.setAttribute("href", "http://" + url);
};

document.addEventListener("mouseover", clearLink);

setLink = function (candidate) {
  var ref, ref1, ref2, span, text;
  if (candidate == null || ((ref = candidate.parentNode) != null ? (ref1 = ref.className) != null ? typeof ref1.indexOf === "function" ? ref1.indexOf("textToLink") : void 0 : void 0 : void 0) !== -1 || candidate.nodeName === "#cdata-section") {
    return;
  }
  text = candidate.textContent.replace(url_regexp, '<a href="$1" target="_blank" class="textToLink">$1</a>');
  if (((ref2 = candidate.textContent) != null ? ref2.length : void 0) === text.length) {
    return;
  }
  span = document.createElement("span");
  span.innerHTML = text;
  return candidate.parentNode.replaceChild(span, candidate);
};

excludedTags = "a,svg,canvas,applet,input,button,area,pre,embed,frame,frameset,head,iframe,img,option,map,meta,noscript,object,script,style,textarea,code".split(",");

xPath = '//text()[not(ancestor::' + excludedTags.join(') and not(ancestor::') + ')]';

linkPack = function (result, start) {
  var i, j, k, ref, ref1, ref2, ref3, startTime;
  startTime = Date.now();
  while (start + 10000 < result.snapshotLength) {
    for (i = j = ref = start, ref1 = start + 10000; ref <= ref1 ? j <= ref1 : j >= ref1; i = ref <= ref1 ? ++j : --j) {
      setLink(result.snapshotItem(i));
    }
    start += 10000;
    if (Date.now() - startTime > 2500) {
      return;
    }
  }
  for (i = k = ref2 = start, ref3 = result.snapshotLength; ref2 <= ref3 ? k <= ref3 : k >= ref3; i = ref2 <= ref3 ? ++k : --k) {
    setLink(result.snapshotItem(i));
  }
};

linkify = function (node) {
  var result;
  result = document.evaluate(xPath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  return linkPack(result, 0);
};

linkFilter = function (node) {
  var j, len, tag;
  for (j = 0, len = excludedTags.length; j < len; j++) {
    tag = excludedTags[j];
    if (tag === node.parentNode.localName.toLowerCase()) {
      return NodeFilter.FILTER_REJECT;
    }
  }
  return NodeFilter.FILTER_ACCEPT;
};

observePage = function (root) {
  var tW;
  tW = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { //+ NodeFilter.SHOW_ELEMENT,
    acceptNode: linkFilter
  }, false);
  while (tW.nextNode()) {
    setLink(tW.currentNode);
  }
};

observer = new window.MutationObserver(function (mutations) {
  var Node, j, k, len, len1, mutation, ref;
  for (j = 0, len = mutations.length; j < len; j++) {
    mutation = mutations[j];
    if (mutation.type === "childList") {
      ref = mutation.addedNodes;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        Node = ref[k];
        observePage(Node);
      }
    }
  }
});

linkMixInit = function () {
  if (window !== window.top || window.document.title === "") {
    return;
  }
  //console.time('a')
  linkify(document.body);
  //console.timeEnd('a')
  return observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

setTimeout(linkMixInit, 100);
}


})();
//==========via-plugin:31==========
//==========让链接可点击==========
(function() {
/*
 * @name: 让链接可点击
 * @Author: 谷花泰
 * @version: 1.0
 * @description: 不用再复制链接打开这么麻烦了
 * @include: *
 * @createTime: 2019-11-12 13:47:41
 * @updateTime: 2019-11-16 23:04:54
 */
(function () {
  /* 判断是否该执行 */
  /* 网址黑名单制，遇到这些域名不执行 */
  const blackList = ['example.com'];

  const hostname = window.location.hostname;
  const key = encodeURIComponent('谷花泰:让链接可点击:执行判断');
  const isBlack = blackList.some(keyword => {
    if (hostname.match(keyword)) {
      return true;
    };
    return false;
  });

  if (isBlack || window[key]) {
    return;
  };
  window[key] = true;

  class ClickLink {
    constructor() {
      this.init();
    };
    init() {
      document.head.innerHTML += `
        <style>
          .via-link {
            color: #00c !important;
            cursor: pointer;
          }
        </style>
      `;
      this.listenNode();
      document.body.addEventListener('click', (e) => {
        if (Array.from(e.target.classList).includes('via-link')) {
          window.location.href = e.target.dataset.viaLink;
        }
      }, false);
    };
    observe({ targetNode, config = {}, callback = () => { } }) {
      if (!targetNode) {
        return;
      };

      config = Object.assign({
        attributes: true,
        childList: true,
        subtree: true
      }, config);

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    };
    getTextNode(elm) {
      let node;
      const nodes = [];
      const walk = document.createTreeWalker(elm, NodeFilter.SHOW_TEXT, null, false);
      while (node = walk.nextNode()) {
        nodes.push(node);
      };
      return nodes;
    };
    markLink(_elm) {
      const elm = _elm || document.body;
      const textNodes = this.getTextNode(elm);
      const linkReg = /((https?:\/\/|www\.)[\x21-\x7e]+[\w\/]|(\w[\w._-]+\.(com|cn|org|net|info|tv|cc))(\/[\x21-\x7e]*[\w\/])?|ed2k:\/\/[\x21-\x7e]+\|\/|thunder:\/\/[\x21-\x7e]+=)/gi;
      /* const linkReg = /(([\w\d\.]|\:\/\/)+?\.[\w\d\.]+)(\/[\x21-\x7e]*)?/gi; */
      for (let i = 0; i < textNodes.length; i++) {
        const textNode = textNodes[i];
        const parentNodeName = textNode.parentNode.nodeName.toLowerCase();
        if (['script', 'style'].includes(parentNodeName)) {
          continue;
        };
        const linkMatchResult = textNode.textContent.match(linkReg);
        if (!linkMatchResult || linkMatchResult.length === 0) {
          continue;
        };

        let link = linkMatchResult[0];
        if (!(/\:\/\//gi.test(link))) {
          link = 'http://' + link;
        };
        textNode.parentNode.dataset.viaLink = link;
        textNode.parentNode.classList.add('via-link');
      };
    };
    listenNode() {
      let that = this;
      this.observe({
        targetNode: document.documentElement,
        config: {
          attributes: false
        },
        callback(mutations, observe) {
          that.markLink();
        }
      })
    };
  };

  try {
    new ClickLink();
  } catch (err) {
    console.log('让链接可点击：', err);
  };
})();
})();
