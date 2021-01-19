// @ts-check
const gulp = require('gulp');
const bump = require('gulp-bump');
const conventionalChangelog = require('gulp-conventional-changelog');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const promisify = require('util').promisify;
const DIR_DOC = './doc';
const FILE_DOC = path.resolve(DIR_DOC, 'CHANGELOG.md');
/**@type {{ bump: 'major' | 'minor' | 'patch' | 'prerelease' }}
 // @ts-ignore */
const argv = yargs.argv;
const validBumpTypes = "major|minor|patch|prerelease".split("|");
/**@type  */
const bumpType = (argv.bump || 'patch').toLowerCase();

if(validBumpTypes.indexOf(bumpType) === -1) {
  throw new Error('Unrecognized bump "' + bumpType + '".');
}

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

gulp.task('doc', async () => {
  const { stderr, stdout } = await promisify(exec)('npm run doc');
  if (stderr) {
    console.log('==== doc warning ====');
    console.log(stderr);
  }
  // quite a pain (no API from typeodc) to generate a json string
  // in memory, so just double write
  try {
    const content = fs.readFileSync(DIR_DOC + '/api.json', { encoding: 'utf-8' });
    fs.writeFileSync(path.resolve(DIR_DOC, 'api.json'), JSON.stringify(JSON.parse(content)));
  } finally {}
  console.log('==== doc output ====');
  console.log(stdout);
});

gulp.task('changelog', function () {
  return gulp
    .src(FILE_DOC)
    .pipe(conventionalChangelog({}))
    .pipe(gulp.dest(DIR_DOC));
});

gulp.task('bump-version', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task(
  'prepare-release',
  gulp.series(
    'build',
    'lint',
    gulp.parallel(
      'doc',
      'bump-version',
      'changelog'
    )
  )
);
