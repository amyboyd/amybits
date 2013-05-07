/*
 * Requires jQuery.
 */

function AmyCarousel($items, changeOnClick, changeCallback) {
    var thisCarousel = this;

    thisCarousel.$items = $items;
    thisCarousel.currentIndex = 1;
    thisCarousel.length = $items.size();
    thisCarousel.changeCallback = changeCallback || function($newCurrentItem, $oldCurrentItem, newCurrentIndex) {
        $oldCurrentItem.hide();
        $newCurrentItem.show();
    };
    updateTimeOfLastChange();

    if (changeOnClick) {
        thisCarousel.$items.click(changeByElementsDataAttr);
    }

    function changeByElementsDataAttr(thing) {
        if (typeof thing.target !== 'undefined') {
            // thing is an event.
            thing = thing.target;
        }
        var index = Number(thing.getAttribute('data-index'));
        thisCarousel.changeByIndex(index);
    }

    function updateTimeOfLastChange() {
        thisCarousel.timeOfLastChangeInEpochSeconds = Math.ceil(Date.now() / 1000);
    }

    // All change methods eventually call this.
    thisCarousel.changeByIndex = function(index) {
        if (index == thisCarousel.currentIndex) {
            return;
        }

        var $oldCurrentItem = thisCarousel.$items.filter('[data-index=' + thisCarousel.currentIndex + ']');
        var $newCurrentItem = thisCarousel.$items.filter('[data-index=' + index + ']');
        thisCarousel.changeCallback($newCurrentItem, $oldCurrentItem, index);

        thisCarousel.currentIndex = index;
        updateTimeOfLastChange();
    };

    thisCarousel.next = function() {
        var nextIndex = (thisCarousel.currentIndex == thisCarousel.length
            ? 1
            : thisCarousel.currentIndex + 1);
        thisCarousel.changeByIndex(nextIndex);
    };

    thisCarousel.changeEveryXSeconds = function(seconds) {
        seconds = Number(seconds);
        if (seconds <= 0) {
            throw "Invalid time";
        }

        setInterval(function() {
            var secondsSinceLastChange = Math.ceil(Date.now() / 1000) - thisCarousel.timeOfLastChangeInEpochSeconds;
            if ((secondsSinceLastChange - seconds) > 0) {
                thisCarousel.next();
            }
        }, seconds * 500);
    };
}

// Sample use:

var c = new AmyCarousel($('#carousel li'), false,
    function ($newCurrentItem, $oldCurrentItem, newCurrentIndex) {
        $oldCurrentItem.fadeOut(homepage.CAROUSEL_ANIMATION_SPEED, function() {
            $newCurrentItem.fadeIn(homepage.CAROUSEL_ANIMATION_SPEED);
        });
    }
);
c.next();
c.changeEveryXSeconds(5);
