/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {

  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    { // template code
  //   console.log()
  //   // head
  //   ellipseMode(CENTER);
  //   stroke(stroke_color);
  //   fill(this.mainColour);
  //   ellipse(segment_average(positions.chin)[0], 0, 3, 4);
  //   noStroke();


  //   // mouth
  //   fill(this.detailColour);
  //   ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

  //   // eyebrows
  //   fill( this.eyebrowColour);
  //   stroke( this.eyebrowColour);
  //   strokeWeight(0.08);
  //   this.draw_segment(positions.left_eyebrow);
  //   this.draw_segment(positions.right_eyebrow);

  //   // draw the chin segment using points
  //   fill(this.chinColour);
  //   stroke(this.chinColour);
  //   this.draw_segment(positions.chin);

  //   fill(100, 0, 100);
  //   stroke(100, 0, 100);
  //   this.draw_segment(positions.nose_bridge);
  //   this.draw_segment(positions.nose_tip);

  //   strokeWeight(0.03);

  //   fill(this.lipColour);
  //   stroke(this.lipColour);
  //   this.draw_segment(positions.top_lip);
  //   this.draw_segment(positions.bottom_lip);

  //   let left_eye_pos = segment_average(positions.left_eye);
  //   let right_eye_pos = segment_average(positions.right_eye);

  //   // eyes
  //   noStroke();
  //   let curEyeShift = 0.04 * this.eye_shift;
  //   if(this.num_eyes == 2) {
  //     fill(this.detailColour);
  //     ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
  //     ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

  //     // fill(this.mainColour);
  //     // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
  //     // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
  //   }
  //   else {
  //     let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
  //     let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

  //     fill(this.detailColour);
  //     ellipse(eyePosX, eyePosY, 0.45, 0.27);

  //     fill(this.mainColour);
  //     ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
  //   }

  //  // fill(0)
  //  //ellipse(0,0, 0.5,0.5) center point
  //  //rect(-2,-2,4.5,4) sizing debug 
    }
  
  left_eye_pos = positions.chin[0];
  right_eye_pos = positions.chin[positions.chin.length-1];
  this.blobbyFace(positions, left_eye_pos[0], left_eye_pos[1], 1, right_eye_pos[0], right_eye_pos[1], 1, 20, 50, 180, 2);
  
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
    
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.left_eye_openness = map(settings[0], 0, 100, 0, 89.9);
    this.right_eye_openness = map(settings[1], 0, 100, 0, 89.9);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.left_eye_openness, 0, 89.9, 0, 100);
    settings[1] = map(this.right_eye_openness, 0, 89.9, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    return settings;
  }
  


  this.blobbyFace = function (positions, eye1_x, eye1_y, eye1_r, eye2_x, eye2_y, eye2_r, face_hue, pupil_ratio, iris_hue) {
    var head = 
    {
      x: segment_average(positions.chin)[0],
      y: positions.chin[0][1],
      w: dist((positions.chin)[0][0], (positions.chin)[0][1], (positions.chin)[positions.chin.length - 1][0], (positions.chin)[positions.chin.length - 1][1])/2,
      h: dist((positions.chin)[0][0], (positions.chin)[0][1], ((positions.chin)[0][0] + (positions.chin)[positions.chin.length - 1][0])/2, (positions.chin)[8][1])
    };

    // finding the rotation of the head so facial features can be rotated with it, head rotation is based on the position of the eyes - it is not created and then rotated
    var head_tilt = atan2(eye2_y - eye1_y, eye2_x - eye1_x); // I used ChatGPT 3.5 to find this function atan2, the prompt was: "I need to get get the rotation between two points in p5.js"

    push();
    colorMode(HSB);
    ellipseMode(RADIUS);
    rectMode(CENTER);
    strokeWeight(0);
    
    // draw head with black outline
    var outline_offset = ((head.w + eye1_r + eye2_r) /40);
    
  // circular head
    fill(20);

    ellipse(eye1_x, eye1_y, eye1_r + outline_offset);
    ellipse(eye2_x, eye2_y, eye2_r + outline_offset);
    ellipse(head.x, head.y, head.w + outline_offset, head.h +outline_offset);

    fill(face_hue, 60, 95);

    ellipse(head.x, head.y, head.w, head.h); 



    // draw mouth
    push();

    strokeWeight(outline_offset);
    colorMode(HSB, 100);
    fill(face_hue, 0, 100);
    stroke(20);  

    beginShape();

    curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
    curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
    curveVertex(positions.top_lip[7][0], positions.top_lip[7][1]);
    curveVertex(positions.top_lip[8][0], positions.top_lip[8][1]);
    curveVertex(positions.top_lip[9][0], positions.top_lip[9][1]);
    curveVertex(positions.top_lip[10][0], positions.top_lip[10][1]);
    curveVertex(positions.top_lip[11][0], positions.top_lip[11][1]);
    curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]);
    curveVertex(positions.bottom_lip[9][0], positions.bottom_lip[9][1]);
    curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]);
    curveVertex(positions.top_lip[7][0], positions.top_lip[7][1]);
    curveVertex(positions.top_lip[7][0], positions.top_lip[7][1]);

    endShape();
    

    pop();  

    // draw eyes
    this.drawEye(eye1_x, eye1_y, eye1_r, head_tilt, face_hue, pupil_ratio, iris_hue, this.left_eye_openness);
    this.drawEye(eye2_x, eye2_y, eye2_r, head_tilt, face_hue, pupil_ratio, iris_hue, this.right_eye_openness);

    pop();
  }

  this.drawEye = function(eye_x, eye_y, eye_r, rotation, face_hue, pupil_ratio, iris_hue, eye_openness) { 
    var eye_circle_colour = color(face_hue, 50, 100);
    var white_size = eye_r * 0.8; // amount of the eye space that the white takes up
    var iris_size = white_size * 0.8; // amount of the white of the eye that the iris takes up
    var pupil_size = map(pupil_ratio, 0 , 100, 0, iris_size); // mapping pupil size from 0-1 to 0-iris-ratio, changes how much of the iris the pupil takes up

    push();

    translate(eye_x, eye_y);

    // eye circle
    fill(eye_circle_colour);
    ellipse(0, 0, eye_r);

    push();

    rotate(rotation);

    // white
    strokeWeight(0);
    fill(100);
    ellipse(0, 0, white_size);

    // iris
    strokeWeight(0);
    fill(iris_hue, 50, 50);
    ellipse(0, 0, iris_size);

    // pupil
    strokeWeight(0);
    fill(20);
    ellipse(0, 0, pupil_size);

    pop();

    // glint - excluded from eye rotation as it's simulating the reflection of a fixed lightsource 
    strokeWeight(0);
    fill(100);
    ellipse(0-(eye_r/4), 0-(eye_r/4), eye_r*0.2);

    // eyelids

    push();

    rotate(rotation);

    strokeWeight(0);
    fill(eye_circle_colour)
    arc(0, 0, eye_r, eye_r, 180+eye_openness, 360-eye_openness, OPEN);
    arc(0, 0, eye_r, eye_r, 360+eye_openness, 180-eye_openness, OPEN);
    pop();

    pop();  
  }
}
