const utils = require('./utils');
import Firework from './firework';

// --- FUTURE NOTES ---
// can also tie ticksMin to FGA

const CANVAS_CLEANUP = 0.3;

// length of a season's fireworks show in seconds
const SEASON_LENGTH = 5;

// currently there is no easy way to get total # games a non-standard season had
const TICKS_MAX = 82;

class BballFireworks {
    constructor(canvasContextObject) {
        this.canvas = canvasContextObject.canvas;
        this.ctx = canvasContextObject.ctx;
        this.fireworks = [];
        this.sparks = []
        this.stats = [];
        this.ticksSinceFirework = 0;
        this.frameId = null;
        this.teamColors = {};

        this.removeFirework = this.removeFirework.bind(this);
        this.removeSpark = this.removeSpark.bind(this);
        
        this.launchFirework = this.launchFirework.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.animateSeason = this.animateSeason.bind(this);
        this.nextLoop = this.nextLoop.bind(this);

        this.isRunning = false;
        this.i = 0;
    }
    
    launchFirework(gamesPlayed, color) {
        let ticksMin = 100 - gamesPlayed;
        if (this.ticksSinceFirework >= utils.randomIntFromRange(ticksMin, TICKS_MAX)) {
            this.fireworks.push(new Firework(this.canvas, this.ctx, this, color));
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
    
    draw() {
        this.allObjects().forEach((object) => {
            object.draw()
            }
        )
    }

    updateObjects() {
        this.allObjects().forEach((object) => {
            object.update();
        })
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

// Tony note: delay the longest possible time a firework can be alive
// put different font! NBA? Sans, Google fonts can be included with a line

    animateSeason(stats, teamColors) {
        let that = this;
        let start = Date.now();
        
        that.stats = stats;
        that.teamColors = teamColors;

        function loop() {
            if (Date.now() - start < (SEASON_LENGTH * 1000)) {
                let statsObj = that.stats[that.i] || []
                let gamesPlayed = statsObj[2]
                // let gamesPlayed = that.stats[that.i][1]
                let team = that.stats[that.i][1]
                document.getElementById('appMessages').innerHTML = '';
                document.getElementById('displaySeason').innerHTML = that.stats[that.i][0];
                let color = that.teamColors[team][utils.randomIntFromRange(0, that.teamColors[team].length)]

                that.isRunning = true;
                that.frameId = requestAnimationFrame(loop);
                that.clearCanvas();
                that.draw();
                that.updateObjects();
                that.launchFirework(gamesPlayed, color);
            } 

            else if (that.stats[that.i + 1]) {
                that.i++;
                that.isRunning = false;
                // call next anim loop
                that.nextLoop();
            } 

            else {
                if (that.fireworks.length == 0) {
                    console.log('no fireworks')
                    cancelAnimationFrame(that.frameId);
                }
                console.log('fireworks still in queue')
                that.isRunning = false;
                cancelAnimationFrame(that.frameId);
                document.getElementById("displayName").innerHTML = 'Bball Fireworks';
                document.getElementById("displaySeason").innerHTML = '';
                // that.nextLoop();
                // continue;
            };
        };
        loop();
    };

    nextLoop() {
        let that = this;
        if (that.isRunning == false) {
            that.animateSeason(that.stats, that.teamColors)
        };
    };
};

export default BballFireworks;