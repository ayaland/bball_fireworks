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
        this.removeFirework = this.removeFirework.bind(this);
        this.removeStar = this.removeStar.bind(this);
        
        this.updateFireworks = this.updateFireworks.bind(this);
        this.launchFirework = this.launchFirework.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.animate4Seconds = this.animate4Seconds.bind(this);

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

    // loop(num) {
    //     // console.log(this.start)
    //     // console.log(Date.now())
    //     while (this.start + num > Date.now()) {
    //         debugger;
    //         // console.log('inside while loop')
    //         console.log('dadf')
    //         // window.requestAnimFrame(this.loop(num));
    //         // this.clearCanvas();
    //         this.clearCanvas.call(this);
    //         this.draw();
    //         this.updateObjects();
    //         this.launchFirework();
    //     }
    // }

    animate4Seconds() {
        let start = Date.now();
        let that = this;
        function loop() {
            if (Date.now() - start < 4000) {
                debugger;
                requestAnimFrame(loop);
                that.clearCanvas();
                that.draw();
                that.updateObjects();
                that.launchFirework();
            }
                // this.updateFireworks();
            // }
        };
        loop();
    }
}

export default BballFireworks;