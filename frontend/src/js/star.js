const utils = require('./utils');

const SPEED_MIN = 2;
const SPEED_MAX = 8;
const STAR_ACCELERATION = 0.7;
const FRICTION = 0.95;

const STAR_BRIGHTNESS_MIN = 50;
const STAR_BRIGHTNESS_MAX = 80;
const STAR_HUE_VARIANCE = 20;
const TRANSPARENCY = 1;

const STAR_DECAY_MIN = 0.02;
const STAR_DECAY_MAX = 0.04;
const STAR_TRAIL_LENGTH = 5;

// this should have been called Spark but it's too late now I don't want to break everything
class Star {
    constructor(x, y, ctx, r, firework, show) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.ctx = ctx;
        this.firework = firework;
        this.show = show;

        this.destinationX = utils.randomIntFromRange((this.x - this.r), (this.x + this.r));
        this.lengthX = Math.abs(this.x - this.destinationX);
        this.lengthY = (Math.sqrt((this.r**2) - (this.lengthX**2)));
        this.destinationY = this.y + utils.plusOrMinus(this.lengthY);
        
        this.trail = [];
        this.trailLength = STAR_TRAIL_LENGTH;
        while(this.trailLength--) {
            this.trail.push([this.x, this.y])
        }
        this.hue = this.firework.hue;
        this.transparency = TRANSPARENCY;
        this.brightness = utils.random(STAR_BRIGHTNESS_MIN, STAR_BRIGHTNESS_MAX);

        this.speed = utils.randomIntFromRange(SPEED_MIN, SPEED_MAX);
        this.decay = utils.random(STAR_DECAY_MIN, STAR_DECAY_MAX);
    }

    update() {
        this.trail.pop(); // remove last element, like the spark fades out
        this.trail.unshift([this.x, this.y]);
        this.speed *= FRICTION;
        if (this.destinationX <= this.x) {
            this.x -= (this.lengthX / this.r) * this.speed;
            // this if loop checks if we overshot the destinationX
            if (this.destinationX > this.x) {
                while (this.transparency >= this.decay) {
                    this.x -= (this.lengthX / this.r) * this.speed;
                    this.transparency -= this.decay;
                }
            }

        } else {
            this.x += (this.lengthX / this.r) * this.speed;
            if (this.destinationX < this.x) {
                while (this.transparency >= this.decay) {
                    this.x += (this.lengthX / this.r) * this.speed;
                    this.transparency -= this.decay
                }
            }            
        }
        // sparks going down
        if (this.destinationY < this.y) {
            this.y += (this.lengthY / this.r) * this.speed;
        // sparks going up
        } else {
            this.y -= (this.lengthY / this.r) * this.speed;
        }
        // this.destinationY -= STAR_ACCELERATION;
        this.transparency -= this.decay;
        if (this.transparency <= this.decay) {
            // console.log('inside transparency decay')
            this.show.removeSpark(this.x, this.y);
        }
    }

    draw() {
        this.ctx.beginPath();
        let trailEndX = this.trail[this.trail.length - 1][0];
        let trailEndY = this.trail[this.trail.length - 1][1];
        this.ctx.moveTo(trailEndX, trailEndY);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.transparency})`;
        this.ctx.stroke();
    }

}

export default Star;