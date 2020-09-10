const utils = require('./utils');
import Star from './star';

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
            const star = new Star(this.destinationX, this.destinationY, this.ctx, this.blastRadius, this, this.show);
            this.show.stars.push(star)
        }
    }
}

export default Firework;