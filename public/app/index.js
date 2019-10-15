/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n// var postTemplate = this.httpClient.get(`${this.basePath}/views/post.html`);\r\n\r\nvar postTemplate = `<div>\r\n<h3>{{TITLE}}</h3>\r\n<h5>By: {{NAME}} - <span style=\"color: gray;\"><a href=\"#\"  data-userid=\"{{USERID}}\" class=\"btnEmail\">{{EMAIL}}</a></span></h5>\r\n<p>{{BODY}}</p>\r\n<hr>\r\n</div>\r\n`;\r\n\r\nfunction showPost(){\r\n  fetch(`${API_PATH}/post`, {\r\n    method: 'GET',\r\n    //body: JSON.stringify(data), // data can be `string` or {object}!\r\n    headers:{\r\n      'Content-Type': 'application/json'\r\n    }\r\n  }).then(res => res.json())\r\n  .then(res => {\r\n      var postView = '';\r\n      console.log(res);\r\n      res.forEach(p => {\r\n          postView = postView + postTemplate.replace('{{BODY}}',p.body)\r\n                                            .replace('{{NAME}}',p.userName)\r\n                                            .replace('{{EMAIL}}',p.userEmail)\r\n                                            .replace('{{TITLE}}',p.title)\r\n                                            .replace('{{USERID}}',p.userId);\r\n\r\n                                          });\r\n      document.getElementById(\"app\").innerHTML=postView;\r\n      //var bes = document.getElementsByClassName(\"btnEmail\");\r\n      // for(i=0; i < bes.length;i++)\r\n      // {\r\n      //     bes[i].addEventListener('click',showUserProfile);\r\n      // }\r\n\r\n   })      \r\n  .catch(error => console.error('Error:', error))\r\n  .then(response => console.log('Success:', response));\r\n}\r\n\r\n\r\nfunction logout() {\r\n\r\n    var data;\r\n    fetch(`${API_PATH}/logout`, {\r\n        method: 'DELETE',\r\n        body: JSON.stringify(data), // data can be `string` or {object}!\r\n        headers:{\r\n          'Content-Type': 'application/json'\r\n        }\r\n      }).then(res => res.json())\r\n      .catch(error => console.error('Error:', error))\r\n      .then(response => console.log('Success:', response));\r\n\r\n    // this.httpClient.delete(`${API_PATH}/logout`);\r\n    console.log('1:'+ localStorage.getItem('token'));\r\n    localStorage.removeItem('token');\r\n    console.log('2:'+ localStorage.getItem('token'));\r\n\r\n\r\n\r\n    window.location.href = '/login.html';\r\n  }\r\n  \r\n\r\n  window.onload = function(){\r\n\r\n    var token = localStorage.getItem('token');\r\n    //console.log(token);\r\n    if (token === null || token === undefined){\r\n        window.location.href = 'login.html';\r\n    }  \r\n\r\n    //console.log(postTemplate);\r\n\r\n    document.getElementById(\"btnLogout\").addEventListener('click',function(){logout();}); \r\n    document.getElementById(\"btnShowPost\").addEventListener('click',function(){showPost();}); \r\n  }\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gdmFyIHBvc3RUZW1wbGF0ZSA9IHRoaXMuaHR0cENsaWVudC5nZXQoYCR7dGhpcy5iYXNlUGF0aH0vdmlld3MvcG9zdC5odG1sYCk7XHJcblxyXG52YXIgcG9zdFRlbXBsYXRlID0gYDxkaXY+XHJcbjxoMz57e1RJVExFfX08L2gzPlxyXG48aDU+Qnk6IHt7TkFNRX19IC0gPHNwYW4gc3R5bGU9XCJjb2xvcjogZ3JheTtcIj48YSBocmVmPVwiI1wiICBkYXRhLXVzZXJpZD1cInt7VVNFUklEfX1cIiBjbGFzcz1cImJ0bkVtYWlsXCI+e3tFTUFJTH19PC9hPjwvc3Bhbj48L2g1PlxyXG48cD57e0JPRFl9fTwvcD5cclxuPGhyPlxyXG48L2Rpdj5cclxuYDtcclxuXHJcbmZ1bmN0aW9uIHNob3dQb3N0KCl7XHJcbiAgZmV0Y2goYCR7QVBJX1BBVEh9L3Bvc3RgLCB7XHJcbiAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgLy9ib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gZGF0YSBjYW4gYmUgYHN0cmluZ2Agb3Ige29iamVjdH0hXHJcbiAgICBoZWFkZXJzOntcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfVxyXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgdmFyIHBvc3RWaWV3ID0gJyc7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIHJlcy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgcG9zdFZpZXcgPSBwb3N0VmlldyArIHBvc3RUZW1wbGF0ZS5yZXBsYWNlKCd7e0JPRFl9fScscC5ib2R5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e05BTUV9fScscC51c2VyTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tFTUFJTH19JyxwLnVzZXJFbWFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tUSVRMRX19JyxwLnRpdGxlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e1VTRVJJRH19JyxwLnVzZXJJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikuaW5uZXJIVE1MPXBvc3RWaWV3O1xyXG4gICAgICAvL3ZhciBiZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYnRuRW1haWxcIik7XHJcbiAgICAgIC8vIGZvcihpPTA7IGkgPCBiZXMubGVuZ3RoO2krKylcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgICAgYmVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxzaG93VXNlclByb2ZpbGUpO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICB9KSAgICAgIFxyXG4gIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpXHJcbiAgLnRoZW4ocmVzcG9uc2UgPT4gY29uc29sZS5sb2coJ1N1Y2Nlc3M6JywgcmVzcG9uc2UpKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvZ291dCgpIHtcclxuXHJcbiAgICB2YXIgZGF0YTtcclxuICAgIGZldGNoKGAke0FQSV9QQVRIfS9sb2dvdXRgLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gZGF0YSBjYW4gYmUgYHN0cmluZ2Agb3Ige29iamVjdH0hXHJcbiAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZygnU3VjY2VzczonLCByZXNwb25zZSkpO1xyXG5cclxuICAgIC8vIHRoaXMuaHR0cENsaWVudC5kZWxldGUoYCR7QVBJX1BBVEh9L2xvZ291dGApO1xyXG4gICAgY29uc29sZS5sb2coJzE6JysgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XHJcbiAgICBjb25zb2xlLmxvZygnMjonKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSk7XHJcblxyXG5cclxuXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbG9naW4uaHRtbCc7XHJcbiAgfVxyXG4gIFxyXG5cclxuICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuICAgIC8vY29uc29sZS5sb2codG9rZW4pO1xyXG4gICAgaWYgKHRva2VuID09PSBudWxsIHx8IHRva2VuID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2xvZ2luLmh0bWwnO1xyXG4gICAgfSAgXHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhwb3N0VGVtcGxhdGUpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuTG9nb3V0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe2xvZ291dCgpO30pOyBcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuU2hvd1Bvc3RcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7c2hvd1Bvc3QoKTt9KTsgXHJcbiAgfVxyXG5cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });