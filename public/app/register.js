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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\nfunction saludar(){\r\nvar nombre =document.getElementById(\"nombre_persona\").value;\r\n//alert(\"Hola \"+ nombre + \"!\");\r\ndocument.getElementById(\"placeholder\").textContent = \"Hola \" + nombre;\r\n}\r\n*/\r\n\r\nfunction login(){\r\n    var username =document.getElementById(\"username\").value;\r\n    var password =document.getElementById(\"password\").value;\r\n\r\n    if(username==\"\"){\r\n      alert(\"Usuario no puede estar en blanco\");\r\n      document.getElementById(\"username\").focus();\r\n      return;\r\n    }\r\n    if(password==\"\"){\r\n      alert(\"Contraseña no puede estar en blanco\");\r\n      document.getElementById(\"password\").focus();\r\n      return;\r\n    }\r\n\r\n    var data ={\r\n        username: username,\r\n        password:password,\r\n        email:username\r\n    };\r\n    console.log(data);\r\n    \r\n    fetch(`${API_PATH}/login`, {\r\n        method: 'POST',\r\n        body: JSON.stringify(data), // data can be `string` or {object}!\r\n        headers:{\r\n          'Content-Type': 'application/json'\r\n        }\r\n      }).then(res => res.json())\r\n      .then(response => {\r\n        if(response.estatus && response.estatus == \"error\"){\r\n            alert(\"Usuario o Contraseña incorrectos.\");\r\n            document.getElementById(\"password\").focus();\r\n        }else{\r\n            var UserData = {\r\n                \"id\":response.id,\r\n                \"name\":response.name,\r\n                \"email\":response.email,\r\n                \"token\":response.token\r\n            };\r\n            alert(\"Usuario \" + UserData.name + \" logeado correctamente\");\r\n            localStorage.setItem('token', response.token);\r\n            window.location.href =\"index.html\";\r\n        }\r\n       })      \r\n      .catch(error => console.error('Error:', error))\r\n      .then(response => console.log('Success:', response));\r\n}\r\n\r\nfunction isLoged(){\r\n  var token = localStorage.getItem('token');\r\n\r\n  if (token === null || token === undefined){\r\n      return false;\r\n  }\r\n\r\n  return true;\r\n}\r\n\r\nwindow.onload = function(){\r\n  if (isLoged()) {\r\n    window.location.href = 'index.html';\r\n  };\r\n\r\n\r\n  document.getElementById(\"btnLogin\").addEventListener('click',function(){login();});\r\n}\r\n    \r\n/*\r\nwindow.onload = function(){\r\n//document.getElementById(\"btnSaludar\").addEventListener('click',function(){alert(\"Hola Persona\");)});\r\ndocument.getElementById(\"btnSaludar\").addEventListener('click',function(){saludar();});\r\n}\r\n*/\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbG9naW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4uanM/MzUyZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5mdW5jdGlvbiBzYWx1ZGFyKCl7XHJcbnZhciBub21icmUgPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9tYnJlX3BlcnNvbmFcIikudmFsdWU7XHJcbi8vYWxlcnQoXCJIb2xhIFwiKyBub21icmUgKyBcIiFcIik7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2Vob2xkZXJcIikudGV4dENvbnRlbnQgPSBcIkhvbGEgXCIgKyBub21icmU7XHJcbn1cclxuKi9cclxuXHJcbmZ1bmN0aW9uIGxvZ2luKCl7XHJcbiAgICB2YXIgdXNlcm5hbWUgPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIikudmFsdWU7XHJcbiAgICB2YXIgcGFzc3dvcmQgPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XHJcblxyXG4gICAgaWYodXNlcm5hbWU9PVwiXCIpe1xyXG4gICAgICBhbGVydChcIlVzdWFyaW8gbm8gcHVlZGUgZXN0YXIgZW4gYmxhbmNvXCIpO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJuYW1lXCIpLmZvY3VzKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmKHBhc3N3b3JkPT1cIlwiKXtcclxuICAgICAgYWxlcnQoXCJDb250cmFzZcOxYSBubyBwdWVkZSBlc3RhciBlbiBibGFuY29cIik7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikuZm9jdXMoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkYXRhID17XHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgIHBhc3N3b3JkOnBhc3N3b3JkLFxyXG4gICAgICAgIGVtYWlsOnVzZXJuYW1lXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBcclxuICAgIGZldGNoKGAke0FQSV9QQVRIfS9sb2dpbmAsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gZGF0YSBjYW4gYmUgYHN0cmluZ2Agb3Ige29iamVjdH0hXHJcbiAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgaWYocmVzcG9uc2UuZXN0YXR1cyAmJiByZXNwb25zZS5lc3RhdHVzID09IFwiZXJyb3JcIil7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVXN1YXJpbyBvIENvbnRyYXNlw7FhIGluY29ycmVjdG9zLlwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS5mb2N1cygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2YXIgVXNlckRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6cmVzcG9uc2UuaWQsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjpyZXNwb25zZS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgXCJlbWFpbFwiOnJlc3BvbnNlLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOnJlc3BvbnNlLnRva2VuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVXN1YXJpbyBcIiArIFVzZXJEYXRhLm5hbWUgKyBcIiBsb2dlYWRvIGNvcnJlY3RhbWVudGVcIik7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlc3BvbnNlLnRva2VuKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPVwiaW5kZXguaHRtbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgIH0pICAgICAgXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcikpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IGNvbnNvbGUubG9nKCdTdWNjZXNzOicsIHJlc3BvbnNlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTG9nZWQoKXtcclxuICB2YXIgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuXHJcbiAgaWYgKHRva2VuID09PSBudWxsIHx8IHRva2VuID09PSB1bmRlZmluZWQpe1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKGlzTG9nZWQoKSkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaW5kZXguaHRtbCc7XHJcbiAgfTtcclxuXHJcblxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuTG9naW5cIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKCl7bG9naW4oKTt9KTtcclxufVxyXG4gICAgXHJcbi8qXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xyXG4vL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuU2FsdWRhclwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXthbGVydChcIkhvbGEgUGVyc29uYVwiKTspfSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuU2FsdWRhclwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtzYWx1ZGFyKCk7fSk7XHJcbn1cclxuKi9cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/login.js\n");

/***/ })

/******/ });