const utils = require('./utils');
import Star from './star';

const FIREWORK_ACCELERATION = 0.97;
const FIREWORK_BRIGHTNESS_MIN = 50;
const FIREWORK_BRIGHTNESS_MAX = 70;
const FIREWORK_SPEED = 10;
const FIREWORK_TRAIL_LENGTH = 1;

const FIREWORK_DECAY_MIN = 0.015;
const FIREWORK_DECAY_MAX = 0.03;
const FIREWORK_CLEANUP = 0.3;
const NUM_SPARKS = 20;

const PADDING_X = 80;
const PADDING_Y = 80;

const HUE_STEP_INCREASE = 0.1;

// Dedicated to Mrs. Voula Steinberg - thank you for the Trigonometry education
class Firework {
    constructor(canvas, ctx, show, color) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.show = show;
        this.color = color;

        this.stageWidth = this.canvas.width - PADDING_X;
        this.stageHeight = this.canvas.height - PADDING_Y;
        
        this.destinationX = utils.randomIntFromRange(PADDING_X, this.stageWidth - PADDING_X);
        this.destinationY = utils.randomIntFromRange(PADDING_Y, this.stageHeight - PADDING_Y);
        this.blastRadius = utils.randomIntFromRange(40, 3 * PADDING_Y);
        this.x = this.destinationX;
        this.y = this.canvas.height;
        this.distanceToGo = this.canvas.height - this.destinationY;
        this.distanceTraveled = 0;

        this.trail = [];
        this.trailLength = FIREWORK_TRAIL_LENGTH;
        while (this.trailLength--) {
            this.trail.push([this.x, this.y]);
        }

        this.numSparks = NUM_SPARKS;
        this.sparks = [];
        
        this.acceleration = FIREWORK_ACCELERATION;
        this.speed = FIREWORK_SPEED;
        
        this.brightness = utils.random(FIREWORK_BRIGHTNESS_MIN, FIREWORK_BRIGHTNESS_MAX);
        // Ayanote: tie this to random selection from team colors of the season
        // this.hue = 120;
        
        this.createStars = this.createStars.bind(this);
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
    }
    
    update() {
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        this.speed *= this.acceleration;
        this.color += HUE_STEP_INCREASE;
        
        if (this.y <= this.destinationY) {
            this.createStars();
            if (this.sparks.length <= 0) {
                this.show.removeFirework();
            }
        } else {
            this.y -= this.speed;
        }
    }
    
    draw() {
        this.ctx.beginPath();
        let trailEndX = this.trail[this.trail.length - 1][0];
        let trailEndY = this.trail[this.trail.length - 1][1];
        this.ctx.moveTo(trailEndX, trailEndY)
        this.ctx.lineTo(this.x, this.y)
        // this.ctx.lineTo(this.destinationX, this.destinationY);
        this.ctx.strokeStyle = this.color;
        // this.ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
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
        for (let i = this.numSparks; i > 0; i--) {
            const spark = new Star(this.destinationX, this.destinationY, this.ctx, this.blastRadius, this, this.show);
            this.show.sparks.push(spark)
        }
    }
}

export default Firework;