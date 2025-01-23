/* 
  Color twinkle bounce
  
  The wave math in this pattern shows forming a pattern in terms of the
  traditional sin() / cos() functions instead of the unit-friendly wave().

    1 | _                      1 | _ 
      |/ \\                     0_|/_\\____
    0_|___\\_/___              -1 |   \\_/
       0     1                    0     PI2

       wave(x)                    sin(x)

  As the docs on this page explain,

    wave(x) = (1 + sin(x * PI2)) / 2
*/

/**
 * bounceSpeed goes between 1 (slow) and 0.1 (fast)
 */
export var bounceSpeed = 0.5
export function sliderBounceSpeed(v) {
    bounceSpeed = -log(v+0.01)*0.2+0.02
}

/**
 * colorSpeed goes between 1 (slow) and 0.1 (fast)
 */
export var colorSpeed = 0.1
export function sliderColorSpeed(v) {
    colorSpeed = -log(v+0.01)*0.2+0.02
}

/**
 * width goes between 1 (small) to 10 (big)
 */
export var width = 2
export function sliderWidth(v) {
    width = mix(1, 10, v)
}


export function beforeRender(delta) {
  t1 = time(bounceSpeed) * PI2
}

export var wave
export function render(index) {
  wave = sin(t1)

  /*
    Start with hues bouncing back and forth. To do this, the phase shift 
    oscillates. Hue values from here are in 0..2. As a reminder, hsv() will 
    \"wrap\" the values outside of 0..1 for us.
  */
  h = 1 + sin(index / width + 5 * wave)
  
  // We'll also shift the hues over time, slower than the bouncing. Try 
  // commenting this out to see the hues move in lockstep.
  h += time(colorSpeed)
  /*
    You might have noticed that timers are typically defined in the
    beforeRender() function and therefore set between frames. Is it inefficient
    to call time() in render()? Can time() progress between individual pixels'
    calls to render()? The answer is no to both. time() is memoized, meaning it
    returns a fast, consistent result for all calls within render() for a given
    frame.
  */

  // Using the same period as the hue bounce, we'll set brightness `v`alues
  // to zero to create space between pulses.
  v = (1 + sin(index / width + 5 * wave)) * 2
  
  v = v * v * v * v // Gamma correction
  hsv(h, 1, v)
}
