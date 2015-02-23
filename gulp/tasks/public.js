var gulp = require("gulp");
var paths = require("../paths");

gulp.task("public", function()
{
	return gulp.src(paths.public).pipe(gulp.dest(paths.output));
});
