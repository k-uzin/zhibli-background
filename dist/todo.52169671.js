// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/todo.js":[function(require,module,exports) {
var toDoForm = document.querySelector("#todo-form");
var toDoInput = document.querySelector("#todo-form input");
var toDoList = document.querySelector("#todo-list");
var toDoFinish = document.querySelector("#todo-finish");
var toDos = [];
var finishToDos = [];
toDoForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(event) {
  event.preventDefault();
  var newToDo = toDoInput.value; //입력한 값은 변수에 저장하고
  // console.log(newToDo)

  toDoInput.value = ""; //입력한 다음 엔터 누르면 input창은 비움.
  // console.log(newToDo, toDoInput.value);

  var newToDoObj = {
    text: newToDo,
    id: Date.now() //Date.now(): 1970년부터 경과된 ms(밀리 초)를 반환함.

  };
  paintToDo(newToDoObj);
  toDos.push(newToDoObj);
  saveToDos(); // button.addEventListener("mouseenter", function(){
  //   button.innerText="❌";
  // });
  // button.addEventListener("mouseleave", function(){
  //   button.innerText="✖";
  // });
}

;

function paintToDo(newToDoObj) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  var button = document.createElement("button");
  var checkButton = document.createElement("button");
  var lis = document.querySelectorAll("toDoList li");
  li.appendChild(checkButton);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newToDoObj.text;
  li.id = newToDoObj.id;
  button.innerText = "✖";
  checkButton.innerText = "□"; // button.addEventListener("click", deleteTodo);
  // checkButton.addEventListener("click", finishedTodo);

  toDoList.appendChild(li);
  button.addEventListener("click", deleteTodo);
  checkButton.addEventListener("click", finishedTodo);
}

;

function paintFinishToDo(finishObj) {
  var li = document.createElement("li");
  var span = document.createElement("span");
  var button = document.createElement("button");
  var checkButton = document.createElement("button");
  li.appendChild(checkButton);
  li.appendChild(span);
  li.appendChild(button);
  span.innerText = finishObj.text;
  li.id = finishObj.id;
  button.innerText = "✖";
  checkButton.innerText = "☑";
  toDoFinish.appendChild(li); // button.addEventListener("click", deleteFinishToDo);

  button.addEventListener("click", deleteFinishToDo); // checkButton.addEventListener("click", returnToDo);

  checkButton.addEventListener("click", returnToDo);
}

function deleteTodo(event) {
  var li = event.target.parentElement; //클릭된 요소의 부모요소

  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); //filter(): 배열에 있는 아이템을 하나씩 함수에 넣어서 false가 나온 아이템은 버리고,
  //true가 나온 아이템들만 가지고 배열을 '새로' 만듦.

  li.remove();
  saveToDos();
}

;

function deleteFinishToDo(event) {
  var li = event.target.parentElement;
  finishToDos = finishToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  li.remove();
  saveToDos();
}

function finishedTodo(event) {
  var li = event.target.parentElement;
  var span = event.target.nextElementSibling;
  var checkButton = event.target;
  toDoFinish.appendChild(li);
  checkButton.innerText = "☑";
  checkButton.addEventListener("click", returnToDo);
  var finishObj = {
    text: span.innerText,
    id: parseInt(li.id)
  };
  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  }); // finishToDos.push(li);

  finishToDos.push(finishObj);
  saveToDos();
}

function returnToDo(event) {
  var li = event.target.parentElement;
  var span = event.target.nextElementSibling;
  var checkButton = event.target;
  toDoList.appendChild(li);
  checkButton.innerText = "□";
  checkButton.addEventListener("click", finishedTodo);
  var returnObj = {
    text: span.innerText,
    id: parseInt(li.id)
  };
  toDos.push(returnObj);
  finishToDos = finishToDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  saveToDos();
}

function saveToDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos)); //JSON.stringify: 객체데이터이든 배열데이터이든, 자바스크립트 코드를 '문자데이터'로 반환시켜줌.
  //localstorage에 배열데이터를 저장하면 [] 없이 문자모양으로 저장되므로, json.stringify()를 통해 '배열모양'의 '문자데이터'를 저장함.

  localStorage.setItem("finishToDos", JSON.stringify(finishToDos));
}

;
var savedToDos = localStorage.getItem("toDos");
var savedFinishToDos = localStorage.getItem("finishToDos");

if (savedToDos !== null || savedFinishToDos !== null) {
  var parsedToDos = JSON.parse(savedToDos); //JSON.parse(): 문자데이터를 배열데이터로 변환시켜줌.

  var parsedFinishToDos = JSON.parse(savedFinishToDos); //JSON.parse(): 문자데이터를 배열데이터로 변환시켜줌.

  parsedToDos.forEach(paintToDo); //forEach(): 배열에 있는 아이템 각각에 대하여 함수를 실행시킴. 자바스크립트가 배열의 아이템을 하나씩 paintToDo함수의 인자로 넣어서 실행시킴. 

  parsedFinishToDos.forEach(paintFinishToDo);
  toDos = parsedToDos;
  finishToDos = parsedFinishToDos; //새로고침 후 toDos에 값을 저장할 때, 배열이 초기화 되고 빈 배열에 값을 저장하는 것이므로 
  //이전에 있던 값들은 지워진다. 따라서 toDos에 parsedToDos를 할당해주면 이전에 있던 값들은 그대로 있으면서 새로운 값을 추가해 줄 수 있다.
}

console.log;,"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54137" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/todo.js"], null)
//# sourceMappingURL=/todo.52169671.js.maprceMappingURL=/todo.52169671.js.map