/*
  Color bands
  
  Color bands has a chill vibe that comes from applying slower phase shifts to
  shorter wavelengths.
  
  It's also a good pattern to learn about mixing in just the right amount of
  desaturation (making whites, pinks, mints, etc) as well as modulating your
  colors, white spots, and dark spots independently.
*/
export var h_spread = 2
export function sliderHueSpread(v) {
  h_spread = _map(v, 0, 1, 3, 0) // output values reversed so slider is more intuitive
}

var h_rot
export function toggleHueMovement(v) {
  h_rot = v
}

var h_dir = -1
export function toggleHueDirection(v) {
  h_dir = v ? -1 : 1
}

export var h_speed
export function sliderHueSpeed(v) {
  h_speed = _map(v, 0, 1, 0.99, 0.00001) // output values reversed so slider is more intuitive
}

export var t1_speed = 0.25
export function sliderWhiteSpeed(v) {
  t1_speed = _map(v, 0, 1, 0.99, 0.0001) // output values reversed so slider is more intuitive
}

export var t2_speed = 0.15
export function sliderBlackSpeed(v) {
  t2_speed = _map(v, 0, 1, 0.99, 0.0001) // output values reversed so slider is more intuitive
}


export function beforeRender(delta) {
  t1 = time(t1_speed)
  t2 = time(t2_speed)
  t3 = time(h_speed)
}

export function render(index) {
  h = wave(((index / pixelCount) * h_spread) + (t3 * h_rot * h_dir))
  
  // Create the areas where white is mixed in. Start with a wave.
  s = wave(-index / 3 + t1)
  
  // A little desaturation goes a long way, so it's typical to start from 1 
  // (saturated) and sharply dip to 0 to make white areas.
  s = 1 - s * s * s * s
  
  // Create the slowly moving dark regions
  v = wave(index / 2 + t2) * wave(index / 5 - t2) + wave(index / 7 + t2)
  
  v = v * v * v * v
  hsv(h, s, v)
}


function _map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}




