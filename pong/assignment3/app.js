"use strict";

var gamestage = new createjs.Stage("gamecanvas");

function checkCollision(object1, object2) {
	return !(
		object1.y + object1.spriteSheet._frameHeight < object2.y ||
		object1.y > object2.y + object2.spriteSheet._frameHeight ||
		object1.x > object2.x + object2.spriteSheet._frameWidth  ||
		object1.x + object1.spriteSheet._frameWidth < object2.x
	);
}

var Ball = function(i) {
	this.animations = new createjs.Sprite(new createjs.SpriteSheet({
		"images": ["./ball.png"],
		"frames": {
			"width": 16,
			"height": 16,
			"count": 4
		},
		"animations": {
			"ball": {
				"frames": [0, 3, 2, 1, 0, 0, 0],
				"speed": 0.25
			}
		}
	}), "ball");

	this.animations.x = 32 * i;
	this.animations.y = 32 * i;
	this.xdirection = 1;
	this.ydirection = 1;

	gamestage.addChild(this.animations);

	this.checkCollisions = function() {
		if (this.animations.x < 0) {
			location.reload();
		} else if (this.animations.x + this.animations.spriteSheet._frameWidth > gamestage.canvas.width) {
			//this.xdirection *= -1;
			location.reload();
		}

		if (this.animations.y < 0 ||
			this.animations.y + this.animations.spriteSheet._frameHeight > gamestage.canvas.height) {

			this.ydirection *= -1;
		}

		if (checkCollision(paddle.animations, this.animations)) {
			this.xdirection *= -1;
		}

		if (checkCollision(paddle2.animations, this.animations)) {
			this.xdirection *= -1;
		}
	};

	this.updatePosition = function() {
		this.animations.y += this.ydirection;
		this.animations.x += this.xdirection;
	};

};

var Paddle2 = function() {
	this.animations = new createjs.Sprite(new createjs.SpriteSheet({
		"images": ["./paddle.png"],
		"frames": {
			"width": 8,
			"height": 32,
			"count": 1
		},
		"animations": {
			"paddle": {
				"frames": [0]
			}
		}
	}), "paddle");

	this.animations.x = 282;
	this.animations.y = 32;
	this.downwardmovement = false;
	this.upwardmovement = false;

	gamestage.addChild(this.animations);

	this.updatePosition = function() {
		if (this.downwardmovement) {
			this.animations.y++;
		} else if (this.upwardmovement) {
			this.animations.y--;
		}
	};
};


var Paddle = function() {
	this.animations = new createjs.Sprite(new createjs.SpriteSheet({
		"images": ["./paddle.png"],
		"frames": {
			"width": 8,
			"height": 32,
			"count": 1
		},
		"animations": {
			"paddle": {
				"frames": [0]
			}
		}
	}), "paddle");

	this.animations.x = 10;
	this.animations.y = 32;
	this.downwardmovement = false;
	this.upwardmovement = false;

	gamestage.addChild(this.animations);

	this.updatePosition = function() {
		if (this.downwardmovement) {
			this.animations.y++;
		} else if (this.upwardmovement) {
			this.animations.y--;
		}
	};
};


var balls = [];
for (var i = 0; i < 1; i++) {
	balls[i] = new Ball(i + 1);
}

var paddle = new Paddle();
var paddle2 = new Paddle2();

var frameTick = function() {

	for (var i = 0; i < balls.length; i++) {
		balls[i].checkCollisions();
		balls[i].updatePosition();
	}

	paddle.updatePosition();
    paddle2.updatePosition();

	gamestage.update();
};

document.onkeydown = function(event) {
	if (event.keyCode === 40) {
		paddle.downwardmovement = true;
		paddle.upwardmovement = false;
	} else if (event.keyCode === 38) {
		paddle.downwardmovement = false;
		paddle.upwardmovement = true;
	}
};

document.onkeyup = function(event) {
	if (event.keyCode === 40) {
		paddle.downwardmovement = false;
	} else if (event.keyCode === 38) {
		paddle.upwardmovement = false;
	}
};

var timer;

document.onmousemove = function(event) {
	var mouseY = event.clientY;// - gamestage.canvas.height - paddle2.spritesheet.;
	var height = window.innerHeight/2;

	var paddlePosition = paddle2.animations.y + paddle2.animations.spriteSheet._frameHeight + gamestage.canvas.height; 
	
	console.log(paddlePosition);

	if (mouseY > paddlePosition){
		paddle2.downwardmovement = true;
		paddle2.upwardmovement = false;
		clearTimeout(timer);
		timer = setTimeout(MouseStopped, 100);
	} else if (mouseY < paddlePosition){
		paddle2.downwardmovement = false;
		paddle2.upwardmovement = true;
		clearTimeout(timer);
		timer = setTimeout(MouseStopped, 100);
	}
};

function MouseStopped(){
	paddle2.downwardmovement = false;
	paddle2.upwardmovement = false;
}


createjs.Ticker.addEventListener("tick", frameTick);
createjs.Ticker.setFPS(60);
