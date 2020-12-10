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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/start.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bball_fireworks.js":
/*!***********************************!*\
  !*** ./src/js/bball_fireworks.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _firework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firework */ "./src/js/firework.js");
const utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");


const CANVAS_CLEANUP = 0.3;
const TICKS_MIN = 25;
const TICKS_MAX = 30;

class BballFireworks {
    constructor({ canvas, ctx }) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.fireworks = [];
        this.stars = []
        this.ticksSinceFirework = 30;
        this.removeFirework = this.removeFirework.bind(this);
        this.removeStar = this.removeStar.bind(this);

        this.updateFireworks = this.updateFireworks.bind(this);
        this.launchFirework = this.launchFirework.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.loop = this.loop.bind(this);
    }

    getName() {
        const playerName = document.getElementById("pname");
        alert(playerName);
    }

    removeFirework() {
        // console.log('remove firework')
        this.fireworks.pop();
    }

    launchFirework() {
        // console.log('Bballfireworks launchFirework')
        if (this.ticksSinceFirework >= utils.randomIntFromRange(TICKS_MIN, TICKS_MAX)) {
            // console.log('if statement')
            this.fireworks.push(new _firework__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this));
            // console.log('firework created')
            // console.log(this.fireworks)
            this.ticksSinceFirework = 0;
        
        } else {
        this.ticksSinceFirework++;
        }
    }

    updateFireworks() {
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            this.fireworks[i].draw();
            this.fireworks[i].update(i);
        }
    }

    allObjects() {
        return [].concat (
            this.fireworks,
            this.stars
        )
    }

    updateObjects() {
        this.allObjects().forEach((object) => {
            object.update();
        })
    }

    draw() {
        this.allObjects().forEach((object) => {
            object.draw()
            }
        )
    }

    clearCanvas() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0, ${CANVAS_CLEANUP})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';
    }

    removeStar(x, y) {
        // const index = this.stars.indexOf(this);
        let index;
        for (let i = 0; i <= this.stars.length - 1; i++) {
            let currentStar = this.stars[i];
            // debugger
            // console.log(currentStar)
            if (x === currentStar.x && y === currentStar.y) {
                index = i;
                // this.stars.splice(index, 1)
            }
        }
        this.stars.splice(index, 1)
        // debugger
    
    }

    loop() {
        requestAnimFrame(loop);
        this.clearCanvas();
        this.draw();
        this.updateObjects();
        // this.updateFireworks();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (BballFireworks);

/***/ }),

/***/ "./src/js/firework.js":
/*!****************************!*\
  !*** ./src/js/firework.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./star */ "./src/js/star.js");
const utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");


// const FIREWORK_ACCELERATION = -0.9;
const FIREWORK_ACCELERATION = 0.97;
const FIREWORK_BRIGHTNESS_MIN = 50;
const FIREWORK_BRIGHTNESS_MAX = 70;
const FIREWORK_SPEED = 20;
const FIREWORK_TRAIL_LENGTH = 2;
// const FIREWORK_TARGET = true;

const FIREWORK_DECAY_MIN = 0.015;
const FIREWORK_DECAY_MAX = 0.03;
const FIREWORK_CLEANUP = 0.3;
const NUM_STARS = 10;

const PADDING_X = 80;
const PADDING_Y = 80;

const HUE_STEP_INCREASE = 1.5;
let COLORS = [];

class Firework {
    constructor(canvas, ctx, show) {
        this.canvas = canvas;
        // console.log('firework constructor')
        this.ctx = ctx;
        this.show = show;
        this.stageWidth = this.canvas.width - PADDING_X;
        this.stageHeight = this.canvas.height - PADDING_Y;
        
        this.destinationX = utils.randomIntFromRange(PADDING_X, this.stageWidth - PADDING_X);
        this.destinationY = utils.randomIntFromRange(PADDING_Y, this.stageHeight - PADDING_Y);
        this.blastRadius = utils.randomIntFromRange(20, 2 * PADDING_Y);
        this.x = this.destinationX;
        this.y = this.canvas.height;
        this.distanceToGo = this.canvas.height - this.destinationY;
        this.distanceTraveled = 0;
        
        this.trail = [];
        this.trailLength = FIREWORK_TRAIL_LENGTH;
        while (this.trailLength--) {
            this.trail.push([this.x, this.y]);
        }
        // console.log(this.trail)
        this.numStars = NUM_STARS;
        this.stars = [];
        
        this.acceleration = FIREWORK_ACCELERATION;
        this.speed = FIREWORK_SPEED;
        
        this.brightness = utils.random(FIREWORK_BRIGHTNESS_MIN, FIREWORK_BRIGHTNESS_MAX);
        this.hue = 120;
        
        this.createStars = this.createStars.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
    }
    
    update() {
        // console.log('Firework update')
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        this.speed *= this.acceleration;
        this.hue += HUE_STEP_INCREASE;
        
        if (this.y <= this.destinationY) {
            // console.log('Firework reached destination');
            this.createStars();
            if (this.stars.length <= 0) {
                this.show.removeFirework();
            }
            // show.removeFirework();
        } else {
            this.y -= this.speed;
        }
    }
    
    draw() {
        // console.log('Firework draw')
        this.ctx.beginPath();
        let trailEndX = this.trail[this.trail.length - 1][0];
        let trailEndY = this.trail[this.trail.length - 1][1];
        this.ctx.moveTo(trailEndX, trailEndY)
        this.ctx.lineTo(this.x, this.y)
        // this.ctx.lineTo(this.destinationX, this.destinationY);
        // this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
        this.ctx.stroke();
        
        // if (FIREWORK_TARGET) {
            // console.log('ds')

            // Begin a new path for end position animation.
            // this.ctx.beginPath();
            // this.ctx.arc(this.destinationX, this.destinationY, this.targetRadius, 0, Math.PI * 2);
            // Draw stroke.
            // this.ctx.stroke();
        // }
        // this.updateStars();
    }
    
    createStars() {
        // console.log('in createStars')
        // while (this.numStars--) {
        //     const star = new Star(this.destinationX, this.destinationY, this.ctx, this.blastRadius, this);
        //     this.stars.push(star)
        // }
        for (let i = this.numStars; i > 0; i--) {
            const star = new _star__WEBPACK_IMPORTED_MODULE_0__["default"](this.destinationX, this.destinationY, this.ctx, this.blastRadius, this, this.show);
            this.show.stars.push(star)
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Firework);

/***/ }),

/***/ "./src/js/star.js":
/*!************************!*\
  !*** ./src/js/star.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

const SPEED_MIN = 1;
const SPEED_MAX = 10;
const STAR_ACCELERATION = 0.7;
const FRICTION = 0.95;

const STAR_BRIGHTNESS_MIN = 50;
const STAR_BRIGHTNESS_MAX = 80;
const STAR_HUE_VARIANCE = 20;
const TRANSPARENCY = 1;

const STAR_DECAY_MIN = 0.02;
const STAR_DECAY_MAX = 0.04;
const STAR_TRAIL_LENGTH = 5;
// const STAR_COUNT = 80;

class Star {
    constructor(x, y, ctx, r, firework, show) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.r = r;
        this.show = show;
        this.firework = firework;
        this.destinationX = utils.randomIntFromRange((this.x - this.r), (this.x + this.r));
        this.lengthX = Math.abs(this.x - this.destinationX);
        this.lengthY = (Math.sqrt((this.r**2) - (this.lengthX**2)));
        this.destinationY = this.y + utils.plusOrMinus(this.lengthY);
        
        this.trail = [];
        this.trailLength = STAR_TRAIL_LENGTH;
        while(this.trailLength--) {
            this.trail.push([this.x, this.y])
            // console.log(this.trail)
        }
        this.hue = this.firework.hue;
        this.transparency = TRANSPARENCY;
        this.brightness = utils.random(STAR_BRIGHTNESS_MIN, STAR_BRIGHTNESS_MAX);

        this.speed = utils.randomIntFromRange(SPEED_MIN, SPEED_MAX);
        this.decay = utils.random(STAR_DECAY_MIN, STAR_DECAY_MAX);
        // console.log(STAR_DECAY_MIN)
        // console.log(STAR_DECAY_MAX)
        // console.log(this.decay)

        // console.log('decay')
        // console.log(this.decay)
    }

    update() {
        // console.log('Star update')
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        // console.log(this.trail)
        this.speed *= FRICTION;
        if (this.destinationX < this.x) {
            this.x -= (this.lengthX / this.r) * this.speed;

        } else {
            this.x += (this.lengthX / this.r) * this.speed;
        }

        if (this.destinationY < this.y) {
            this.y -= (this.lengthY / this.r) * this.speed + STAR_ACCELERATION;
        } else {
            this.y += (this.lengthY / this.r) * this.speed + STAR_ACCELERATION;
        }
        // console.log([this.x, this.y)
        // console.log('this.transparency')
        // console.log(this.transparency)
        this.transparency -= this.decay;
        // console.log('this.transparency')
        // console.log(this.transparency)
        // console.log('this.decay')
        // console.log(this.decay)
        if (this.transparency <= this.decay) {
            // console.log('inside transparency decay')
            this.show.removeStar(this.x, this.y);
        }
    }

    draw() {
        // console.log('Star draw')
        this.ctx.beginPath();
        let trailEndX = this.trail[this.trail.length - 1][0];
        let trailEndY = this.trail[this.trail.length - 1][1];
        this.ctx.moveTo(trailEndX, trailEndY);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.transparency})`;
        this.ctx.stroke();
    }

}

/* harmony default export */ __webpack_exports__["default"] = (Star);

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

const CANVAS_CLEANUP_ALPHA = 0.3;

function randomIntFromRange(min = 0, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function plusOrMinus(x) {
    let sign = Math.random() < 0.5 ? -1 : 1;
    return sign * x;
}

function calculateDistance(x1, x2, y1, y2) {
    let x = x1 - x2;
    let y = y1 - y2;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function cleanCanvas() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${CANVAS_CLEANUP_ALPHA})`;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
}

const saveName = function saveName() {
    console.log('inside utils saveName')
    let savedName = document.getElementById("pName").value;
    // return savedName;
    // puppeteer.launch()
    // console.log(savedName)
    return savedName;
}

// module.exports = randomIntFromRange;
module.exports = saveName;
// exports.random = random;
// exports.plusOrMinus = plusOrMinus;
// exports.saveName = saveName;
// exports.calculateDistance = calculateDistance;
// exports.cleanCanvas = cleanCanvas;
// module.exports = { 
//     randomIntFromRange, 
//     random, 
//     calculateDistance,
//     cleanCanvas,
//     saveName,
// }

/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/*! exports provided: getCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCanvas", function() { return getCanvas; });
// import BballFireworks from './js/bball_fireworks';
const BballFireworks = __webpack_require__(/*! ./js/bball_fireworks */ "./src/js/bball_fireworks.js");
// import utils from './js/utils';
// import saveName from './js/utils';
const saveName = __webpack_require__(/*! ./js/utils */ "./src/js/utils.js")

const getCanvas = () => {
    console.log('start.js')
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 3 / 4;
    // ctx.globalCompositeOperation = 'destination-out';
    // ctx.fillStyle = '/.';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.globalCompositeOperation = 'lighter';
    return { canvas, ctx }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('test')
    const show = new BballFireworks(getCanvas());
    const addFireworkButton = document.querySelector('#addFirework');
    // const addNameField = document.queryCommandValue('#saveName');
    const addNameField = saveName();
    console.log(addNameField);
    debugger;
    // console.log(show);
    // console.log(addFireworkButton);

    addNameField.addEventListener('click', (e) => {
        utils.saveName();
        console.log('inside start saveName')
    })

    addFireworkButton.addEventListener('click', (e) => {
        show.clearCanvas();
        show.draw();
        show.updateObjects();
        show.launchFirework();
    });
})

window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// module.exports({ getCanvas : getCanvas })
// window.onload = show.loop;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map