// function draw_one_frame(cur_frac) {
//   // note: to clear the screen draw a rectangle
//   // that is width x height - like this
//   noStroke();
//   fill(10);
//   rect(0, 0, width, height);

//   // note: all shape sizes, line widths, etc. should be a
//   // function of width and height
//   let rect_width = height / 10.0;
//   let half_width = rect_width / 2;

//   // note: animation should progress depending on the 
//   // value of cur_frac which goes from 0 to 1, and it
//   // should loop seamlessly
//   let cur_x = map(cur_frac, 0, 1, 0, width) - half_width;

//   fill(200);
//   // draw the rect moving across the screen
//   rect(cur_x, 0, rect_width, height);
//   // a second version (offscreen) for when it loops back around
//   rect(cur_x+width, 0, rect_width, height);
//   rect(cur_x-width, 0, rect_width, height);

//   // note: you can draw optional things depending on "debugView"
//   if (debugView) {
//     // we'll draw our "keyframes"
//     noFill();
//     stroke(255, 0, 0);
//     strokeWeight(height/100);
//     // here we "plug in" the values when cur_frac is 0
//     rect(-half_width, 0, rect_width, height);
//     rect( width - half_width, 0, rect_width, height);
//     rect(-width - half_width, 0, rect_width, height);
//   }
// }

var numPoolLines = 20;
var poolLineVertices = 30;
var glistenAmount = 20;

function draw_one_frame(cur_frac) {	

	colorMode(HSB, 300);

	// draw background using a rect
	strokeWeight(0);
	fill(160, 150, 300);
	rect(0, 0, width, height);

	let poolLinesYScroll = map(cur_frac, 0, 1, 0, height/(numPoolLines-1));
	let glistenYScroll = map(cur_frac, 0, 1, 0, height/glistenAmount);

	// scrolls effects slowly for subtle vertical movement
	push();	
	translate(0, poolLinesYScroll); 

	// pool line chromatic aberration

	// red shift
	push();
	translate(width/2, height/2);
	scale(1.01);
	translate(-width/2, -height/2);
	stroke(300, 200, 300, 50);
	drawPoolLines(cur_frac);
	pop();

	// green shift
	push();
	translate(width/2, height/2);
	scale(0.99);
	translate(-width/2, -height/2);
	stroke(100, 300, 300, 50);
	drawPoolLines(cur_frac);
	pop();
	
	// white pool lines
	stroke(0, 0, 300, 200);
	drawPoolLines(cur_frac);

	pop();

	// water glistening effect
	push();
	waterGlisten(glistenYScroll);	
	pop();
}

function drawPoolLines(cur_frac) {	
	let scrollOffset = 0 - (height/numPoolLines);
	for (let j = 0; j < numPoolLines; j++) {	
		
		strokeWeight(width/200);
		noFill();

		// rows

		beginShape();
		for (let i = -1; i <= poolLineVertices+1; i++) {	
			let curveHeight = getPoolLineNoiseValue(cur_frac, i*(width/numPoolLines), j*(height/numPoolLines), width);
			curveVertex(i*(width/poolLineVertices), curveHeight + j*((height + Math.abs(scrollOffset))/numPoolLines) + (0.5*height/numPoolLines) + scrollOffset);
		}
		endShape();

		// columns

		beginShape();
		for (let i = -1; i <= poolLineVertices+1; i++) {	
			let curveHeight = getPoolLineNoiseValue(cur_frac, i*(width/numPoolLines), j*(height/numPoolLines), height);
			curveVertex(curveHeight + j*(width/numPoolLines) + (0.5*width/numPoolLines), i*((height + Math.abs(scrollOffset))/poolLineVertices) + scrollOffset);
		}
		endShape();
	}
}

function getPoolLineNoiseValue(cur_frac, posX, posY, resolutionValue) {

	let animScroll = map(cur_frac, 0.5, 1, resolutionValue, 0);
	let endSmoothing = 2*(0.5 - Math.abs(cur_frac - 0.5)); // reduces wiggle range towards the start and end for smoothing	

	if (resolutionValue == width) return getNoiseValue(posX + animScroll, posY, 1, "animatedNoise", -5*endSmoothing, 5*endSmoothing, width/numPoolLines*10);
	if (resolutionValue == height) return getNoiseValue(posX, posY + animScroll, 1, "animatedNoise", -5*endSmoothing, 5*endSmoothing, width/numPoolLines*10);
	
}

function waterGlisten(yScroll) {

	push();

	for (let i = 0; i < glistenAmount; i++) {
		for (let j = 0; j < glistenAmount; j++) {

			let noiseValue = getNoiseValue(i*width/glistenAmount, (j*height/glistenAmount) + yScroll, 1, "glistenNoise", -1, 1, width/glistenAmount);			
			strokeWeight(width/100 * (noiseValue));
			stroke(300, 0, 300, 300 * noiseValue);
			point((i*width/glistenAmount) + (width/glistenAmount * noiseValue/2), j*height/glistenAmount + (height/glistenAmount * noiseValue/2) + yScroll);
		}
	}

	pop();
}
