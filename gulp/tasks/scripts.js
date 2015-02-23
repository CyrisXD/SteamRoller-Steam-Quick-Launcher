var gulp = require("gulp");
var paths = require("../paths");

gulp.task("scripts", function(cb)
{
	return gulp.src(paths.scripts).pipe(gulp.dest(paths.output + "js"));
});
