// @ts-check
const gulp = require('gulp');
const bump = require('gulp-bump');
const conventionalChangelog = require('gulp-conventional-changelog');
const fs = require('fs');
const exec = require('child_process').exec;
const promisify = require('util').promisify;
const args = require('./build/args');
const DIR_DOC = './doc';
const FILE_DOC = DIR_DOC + '/CHANGELOG.md';

gulp.task('build', async () => {
  const { stderr: err1, stdout: out1 } = await promisify(exec)('npm run build');
  if (err1) {
    console.log('==== build warning ====');
    console.log(err1);
  }
  console.log('==== build output ====');
  console.log(out1);
});

gulp.task('lint', async () => {
  const { stderr: err2, stdout: out2 } = await promisify(exec)('npm run lint');
  if (err2) {
    console.log('==== lint warning ====');
    console.log(err2);
  }
  console.log('==== lint output ====');
  console.log(out2);
});

gulp.task('changelog', function () {
  return gulp
    .src(FILE_DOC)
    .pipe(conventionalChangelog({
      
    }))
    .pipe(gulp.dest(DIR_DOC));
});

gulp.task('bump-version', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type: args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task(
  'prepare-release',
  gulp.series(
    'build',
    'lint',
    gulp.parallel('bump-version', 'changelog')
  )
);

// gulp.task('prepare-release', function (cb) {
//   // const { stderr: err1, stdout: out1 } = await promisify(exec)('npm run build');
//   // if (err1) {
//   //   console.log('==== build warning ====');
//   //   console.log(err1);
//   // }
//   // console.log('==== build output ====');
//   // console.log(out1);

//   // const { stderr: err2, stdout: out2 } = await promisify(exec)('npm run lint');
//   // if (err2) {
//   //   console.log('==== lint warning ====');
//   //   console.log(err2);
//   // }
//   // console.log('==== lint output ====');
//   // console.log(out2)
//   gulp.series(
//     'build',
//     'lint',
//     // 'bump-version',
//     // 'doc',
//     'changelog',
//     cb
//   );
// });
