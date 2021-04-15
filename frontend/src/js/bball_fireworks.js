const utils = require('./utils');
import Firework from './firework';

const CANVAS_CLEANUP = 0.3;
// tie TICKS_MIN and TICKS_MAX to PPG
const TICKS_MIN = 25;
const TICKS_MAX = 30;

class BballFireworks {
    constructor(canvasContextObject) {
        this.canvas = canvasContextObject.canvas;
        this.ctx = canvasContextObject.ctx;
        this.fireworks = [];
        this.sparks = []
        this.seasons = [];
        this.ticksSinceFirework = 20;
        this.frameId = null;

        this.removeFirework = this.removeFirework.bind(this);
        this.removeSpark = this.removeSpark.bind(this);
        
        this.launchFirework = this.launchFirework.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.animateSeason = this.animateSeason.bind(this);
        this.nextLoop = this.nextLoop.bind(this);

        this.start = Date.now();
        this.isRunning = false;
        this.i = 0;
    }

    getName() {
        const playerName = document.getElementById("pname");
        // alert(playerName);
    }
    
    launchFirework() {
        if (this.ticksSinceFirework >= utils.randomIntFromRange(TICKS_MIN, TICKS_MAX)) {
            this.fireworks.push(new Firework(this.canvas, this.ctx, this));
            this.ticksSinceFirework = 0;
            
        } else {
            this.ticksSinceFirework++;
        }
    }
    
    removeFirework() {
        this.fireworks.pop();
    }

    allObjects() {
        return [].concat (
            this.fireworks,
            this.sparks
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

    removeSpark(x, y) {
        let index;
        for (let i = 0; i <= this.sparks.length - 1; i++) {
            let currentSpark = this.sparks[i];
            if (x === currentSpark.x && y === currentSpark.y) {
                index = i;
            }
        }
        this.sparks.splice(index, 1) 
    }

    animateSeason(gamesPlayed) {
        // console.log('animateSeason')
        // console.log(gamesPlayed)

        let that = this;
        let start = Date.now();
        that.season = gamesPlayed;

        function loop(gp=gamesPlayed[0]) {
            if (
                Date.now() - start < (that.season[that.i] * 100) 
                // &&
                // (that.fireworks.length > 0)
                ) {
                    that.isRunning = true;
                    that.frameId = requestAnimationFrame(loop);
                    // console.log('animateSeason loop')
                    that.clearCanvas();
                    that.draw();
                    that.updateObjects();
                    that.launchFirework();

                } else if (that.seasons[that.i + 1] != null) {
                    console.log('else if')
                    that.i++;
                    // console.log(that.i)
                    that.isRunning = false;
                    cancelAnimationFrame(that.frameId);
                    // call next anim loop
                    that.nextLoop(that.seasons[that.i]);
                    // helper(gamesPlayed[i])
                } else {
                    if (that.fireworks.length == 0) {
                        // console.log('no fireworks')
                    }
                    console.log('else')
                    cancelAnimationFrame(that.frameId);
                };
        };
        loop();
    };

    nextLoop(gamesPlayed) {
        let that = this;
        if (that.isRunning == false) {
            // console.log('nextLoop')
            // console.log(gamesPlayed)
            that.animateSeason.loop(gamesPlayed)
            // this.animateSeason(gamesPlayed);
        };
    };
};

export default BballFireworks;