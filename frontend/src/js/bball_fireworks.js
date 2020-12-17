const utils = require('./utils');
import Firework from './firework';

const CANVAS_CLEANUP = 0.3;
const TICKS_MIN = 25;
const TICKS_MAX = 30;

class BballFireworks {
    constructor({ canvas, ctx }) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.fireworks = [];
        this.stars = []
        // controls how many on screen at once
        this.ticksSinceFirework = 20;
        // this.ticksSinceFirework = 50;
        this.removeFirework = this.removeFirework.bind(this);
        this.removeStar = this.removeStar.bind(this);

        this.updateFireworks = this.updateFireworks.bind(this);
        this.launchFirework = this.launchFirework.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.loop = this.loop.bind(this);
    }

    getName() {
        const playerName = document.getElementById("pname");
        // alert(playerName);
    }

    removeFirework() {
        // console.log('remove firework')
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

export default BballFireworks;