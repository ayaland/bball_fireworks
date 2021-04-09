const utils = require('./utils');
import Firework from './firework';

const CANVAS_CLEANUP = 0.3;
// tie TICKS_MIN and TICKS_MAX to PPG
const TICKS_MIN = 25;
const TICKS_MAX = 30;

class BballFireworks {
    constructor(canvasContextObject, season) {
        this.canvas = canvasContextObject.canvas;
        this.ctx = canvasContextObject.ctx;
        this.fireworks = [];
        this.stars = []
        this.ticksSinceFirework = 20;
        this.frameId = null;

        this.removeFirework = this.removeFirework.bind(this);
        this.removeStar = this.removeStar.bind(this);
        
        this.launchFirework = this.launchFirework.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.animateSeason = this.animateSeason.bind(this);

        // this.loop = this.loop.bind(this);
        this.start = Date.now();
        
        // this.ctx = this.ctx.bind(this);
        // this.ppg = season[-1]
    }

    getName() {
        const playerName = document.getElementById("pname");
        // alert(playerName);
    }

    removeFirework() {
        this.fireworks.pop();
    }

    launchFirework() {
        if (this.ticksSinceFirework >= utils.randomIntFromRange(TICKS_MIN, TICKS_MAX)) {
            this.fireworks.push(new Firework(this.canvas, this.ctx, this));
            this.ticksSinceFirework = 0;
        
        } else {
        this.ticksSinceFirework++;
        }
    }

    // updateFireworks() {
    //     for (let i = this.fireworks.length - 1; i >= 0; i--) {
    //         console.log('updateFireworks')
    //         this.fireworks[i].draw();
    //         this.fireworks[i].update(i);
    //     }
    // }

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
        // debugger;
        // console.log(this)
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0, ${CANVAS_CLEANUP})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';
    }

    removeStar(x, y) {
        let index;
        for (let i = 0; i <= this.stars.length - 1; i++) {
            let currentStar = this.stars[i];
            if (x === currentStar.x && y === currentStar.y) {
                index = i;
                // this.stars.splice(index, 1)
            }
        }
        this.stars.splice(index, 1) 
    }

    animateSeason(gamesPlayed) {
        let start = Date.now();
        let that = this;
        function loop() {
            if (
                Date.now() - start < (gamesPlayed * 100) 
                // &&
                // (that.fireworks.length > 0)
                ) {
                    that.frameId = requestAnimationFrame(loop);
                    // console.log('animateSeason loop')
                    that.clearCanvas();
                    that.draw();
                    that.updateObjects();
                    that.launchFirework();
                    if (that.fireworks.length == 0) {
                        // console.log('no fireworks')
                    }
                } else {
                    console.log('cancelAnimationFrame')
                    cancelAnimationFrame(that.frameId)
                }
        };
        loop();
    }

    // requestAnimFrame = (() => {
    //     return requestAnimationFrame ||
    //         function (callback) {
    //             setTimeout(callback, 1000 / 60);
    //         };
    // })();

    // requestAnimFrame(loop) {
    //     requestAnimationFrame ||
    //             setTimeout(loop, 1000 / 60);
    // }
}

export default BballFireworks;