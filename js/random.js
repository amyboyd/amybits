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

amy.isElementChildOf = function(potentialChild, potentialParent) {
    if (potentialChild == potentialParent) {
        return true;
    }

    var parent = potentialChild.parentNode;
    if (parent == null) {
        return false;
    }
    else if (parent == potentialParent) {
        return true;
    }
    else {
        return amy.isElementChildOf(parent, potentialParent);
    }
};

amy.arrayUniques = function(arr) {
    arr = arr.sort(function(a, b) {
        return a * 1 - b * 1;
    });
    var ret = [arr[0]];
    // Start loop at 1 as element 0 can never be a duplicate.
    for (var i = 1; i < arr.length; i++) {
        if (arr[i - 1] !== arr[i]) {
            ret.push(arr[i]);
        }
    }
    return ret;
};
