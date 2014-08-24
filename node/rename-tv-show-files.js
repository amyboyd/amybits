#!/usr/bin/env node

/**
 * Rename files in formats similar to this...
 * 'Ray.Donovan.S01E05.HDTV.x264-ASAP.MP4'
 * ...to this...
 * 'Ray Donovan 1x05.mp4'
 */

/**
 * Change this to whatever show your files are for.
 */
var SHOW_NAME = 'Ray Donovan';

var fs = require('fs'),
	files = fs.readdirSync('.'),
	OLD_NAME_FORMAT = /s0*(\d+)e0*(\d+)/i;

for (var i = 0; i < files.length; i++) {
	var oldName = files[i];

	if (OLD_NAME_FORMAT.test(oldName) === false) {
		continue;
	}

	var season = oldName.match(OLD_NAME_FORMAT)[1],
		episode = oldName.match(OLD_NAME_FORMAT)[2],
		fileExt = oldName.match(/\.([a-z0-9]+)$/i)[1];

	// Pad the episode number with zeros so it is always 2 digits long.
	episode = ('0' + episode).match(/\d{2}$/)[0];

	var newName = SHOW_NAME + ' ' + season + 'x' + episode + '.' + fileExt.toLowerCase();

	if (fs.exists(newName)) {
		console.log('A file already exists called ' + newName + '; skipping ' + oldName);
		continue;
	}

	fs.rename(oldName, newName);
	console.log('Renamed ' + oldName + ' to ' + newName);
}
