var gulp = require("gulp");
var gutil = require("gulp-util");
var paths = require("../paths");
var Builder = require("node-webkit-builder");

var nw = new Builder({
    files: paths.output + "**/*",
    platforms: ["win", "osx", "linux"],
	buildDir: paths.builds,
	macIcns: paths.output + "images/icon.icns",
	winIco: paths.output + "images/icon.ico"
});

gulp.task("nw-build", function(cb)
{
	nw.on("log", gutil.log);
	nw.build(cb);
});
