/*
 * Requires jQuery.
 * See collection-widget-use.html
 */

var amy = amy || {};

/**
 * @property $wrapperEl
 * @property $listEl
 * @property $addAnotherEl
 * @property templateHTML
 */
amy.CollectionWidget = function(wrapperEl) {
    this.$wrapperEl = $(wrapperEl);
    this.$listEl = this.$wrapperEl.children('.list');
    this.templateHTML = this.$wrapperEl.children('script').text();

    this.$addAnotherEl = this.$wrapperEl.children('.add-another');
    var thisObj = this;
    this.$addAnotherEl.click(function(evt) {
        thisObj.addAnother(evt);
    });
};

amy.CollectionWidget.prototype.addAnother = function(evt) {
    if (evt) {
        evt.preventDefault();
    }

    // Replace '$$' in the template HTML with an indexbased on the
    // current collection's length.
    var newRowHTML = this.templateHTML.replace(/\$\$/g, this.$listEl.children().length);

    newRowHTML = this.preAddAnother(newRowHTML);

    // And finally add it to the list.
    $(newRowHTML).appendTo(this.$listEl[0]);
}

/**
 * Override this if you want to do alter the template HTML.
 */
amy.CollectionWidget.prototype.preAddAnother = function(templateHTML) {
    return templateHTML;
}
