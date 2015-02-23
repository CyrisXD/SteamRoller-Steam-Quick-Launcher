var gulp = require("gulp");
var paths = require("../paths");

gulp.task("styles", function()
{
	return gulp.src(paths.styles).pipe(gulp.dest(paths.output + "css"));
});
