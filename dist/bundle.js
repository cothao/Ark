/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Raptor)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Raptor = /*#__PURE__*/function () {
  function Raptor(scene, x, y, platforms) {
    _classCallCheck(this, Raptor);
    this.scene = scene;
    this.isOverlapped = false;
    this.isAlive = true;
    this.health = 10;
    this.tamePercentage = 0;
    scene.anims.create({
      key: "raptorIdle",
      frames: scene.anims.generateFrameNumbers("raptor", {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "raptorRun",
      frames: scene.anims.generateFrameNumbers("raptorRun", {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "raptorBite",
      frames: scene.anims.generateFrameNumbers("raptorBite", {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: "raptorFaint",
      frames: scene.anims.generateFrameNumbers("raptorFaint", {
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    });
    scene.physics.add.sprite(x, y, 'raptor');
    scene.physics.add.collider(this, platforms);
  }
  _createClass(Raptor, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {}
  }]);
  return Raptor;
}(); // export let raptorGuy = this.physics.add.sprite(600, 400, "raptor");

/******/ })()
;
//# sourceMappingURL=bundle.js.map