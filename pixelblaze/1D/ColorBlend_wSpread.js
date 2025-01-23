/*
  Color Blend w/Spread

  Benjam Welker
  
  The Unlicense - https://opensource.org/license/unlicense

  This pattern combines 3 wave patterns (red, blue, and green) of differing speeds
  and direction and spread to form constantly changing color patterns.

  The best results are had when one color is going reverse of the other two, and all are going different speeds.
  
  It also looks a lot better (at least in my opinion) when the spreads are different, but close to each other
  i.e.- not with some of the colors very wide, and another color very small, or vice versa
*/


// the max spread amount (higher is tighter together)
var spreadMax = 50

// speed min max (higher is faster, but harder to be precise)
var speedMax = 50

// --- RED ---

var r_on = 1
export function toggleRed(_v) {
  r_on = _v
}

var rt
export var r_speed = -0.13
export function sliderRedSpeed(_v) {
  // because the slider value gets passed into the time() function,
  // it needs to have large numbers equal slow speeds and small numbers equal fast speeds,
  // so to invert the values, the value is passed through the 1/m function.
  // this gives very large numbers (very slow speeds) near the middle of the slider
  // and very small numbers (very fast speeds) at the edge of the sliders
  // while still keeping 0 in the middle.
  var m = mix(speedMax, -speedMax, _v) // slider output is reversed so directions are intuitive

  r_speed = (m != 0) ? 1/m : 0 // don't divide by 0, although it doesn't really break, it's just bad, you will make kittens cry
}

export var r_spread = 2.7
export function sliderRedSpread(_v) {
  r_spread = mix(spreadMax, 1, _v) // spread output is reversed so slider is more intuitive
}

// --- GREEN ---

var g_on = 1
export function toggleGreen(_v) {
  g_on = _v
}

var gt
export var g_speed = -0.13
export function sliderGreenSpeed(_v) {
  var m = mix(speedMax, -speedMax, _v)
  g_speed = (m != 0) ? 1/m : 0
}

export var g_spread = 4.1
export function sliderGreenSpread(_v) {
  g_spread = mix(spreadMax, 1, _v) // spread output is reversed so slider is more intuitive
}

// --- BLUE ---

var b_on = 1
export function toggleBlue(_v) {
  b_on = _v
}

var bt
export var b_speed = 0.15
export function sliderBlueSpeed(_v) {
  var m = mix(speedMax, -speedMax, _v)
  b_speed = (m != 0) ? 1/m : 0
}

export var b_spread = 1.9
export function sliderBlueSpread(_v) {
  b_spread = mix(spreadMax, 1, _v) // spread output is reversed so slider is more intuitive
}


/***********************************
 * RENDER FUNCTIONS
 ***********************************/

export function beforeRender(delta) {
  rt = time(r_speed) % 1 // modulo with decimals... o_O
  gt = time(g_speed) % 1
  bt = time(b_speed) % 1
}

export function render(index) {
  // do common calculations outside of each color calculation
  // this creates a value between the start of the strip (0) and the
  // end of the strip (1) (via index/pixelCount), then multiplies that
  // by the spread value to give (spread) number of wavelengths between
  // the ends.
  var ipc = (index/pixelCount)
  
  var r_idx = ipc * r_spread
  var g_idx = ipc * g_spread
  var b_idx = ipc * b_spread
    
  // add the time value to induce movement
  var r = wave(r_idx + rt) * r_on // multiply by 1 or 0 to turn the color on or off
  var g = wave(g_idx + gt) * g_on
  var b = wave(b_idx + bt) * b_on

  rgb(_gamma(r), _gamma(g), _gamma(b))
}


/***********************************
 * UTILITY FUNCTIONS
 ***********************************/

/**
 * Map the incoming value x (with range between in_min and in_max) to
 * another value (with range between out_min and out_max)
 */
function _map(x, in_min, in_max, out_min, out_max) {
  var slope = (out_max - out_min) / (in_max - in_min)
  return out_min + slope * (x - in_min);
}

/**
 * Adjust the incoming brightness value by the set Gamma value (2.2)
 * 
 * This prevent colors from being too bright and giving them a nice and
 * easy ramp up to full brightness, instead of going too bright too fast
 * 
 * Change Gamma value to either increase or decrease the ramp smoothness.
 * (Higher Gamma values produce darker color values)
 * 
 * @param v A brightness value between 0 and 1
 */
function _gamma(v) {
  // gamma_value = 2.2
  // return pow(v, gamma_value)

  // alternatively, to increase FPS... (from ~40 to ~60 on my controller)
  return v * v // not quite 2.2, but close enough. multiply by another v for even slower ramp up
}
