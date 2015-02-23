var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("build", function(cb)
{
	return runSequence("clean", ["html", "scripts", "styles", "public"], "nw-build", cb);
});
