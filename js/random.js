var amy = amy || {};

/**
 * Takes a string like '8px' and returns the integer 8.
 */
amy.pixelsToInt = function(pixels) {
    if (pixels === '' || pixels === '0') {
        return 0;
    }

    if (pixels.constructor == String || isNaN(Number(pixels))) {
        return Number(pixels.replace('px', ''));
    }
    else {
        return pixels;
    }
}
