'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MywebappGenerator = module.exports = function MywebappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MywebappGenerator, yeoman.generators.Base);

MywebappGenerator.prototype.askFor = function askFor() {
  this.appPath = 'src';
  this.appTemplates = 'templates';
  this.appStatic = 'static';

  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'appName',
      message: 'What do you want to call your application',
    },
    {
      name: 'appSrcPath',
      message: 'Application folder',
      default: 'src',
    },
    {
      name: 'appTemplatesPath',
      message: 'Application templates folder',
      default: 'templates',
    },
    {
      name: 'appStaticPath',
      message: 'Application Static folder',
      default: 'static',

    },
  ];

  this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appPath = props.appSrcPath;
      this.appTemplates = props.appTemplatesPath;
      this.appStatic = props.appStaticPath;

    cb();
  }.bind(this));

};

MywebappGenerator.prototype.app = function app() {
  this.mkdir(this.appPath);
  this.mkdir(this.appTemplates);

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_gruntfile.coffee', 'gruntfile.coffee');
  this.template('_config.rb', 'config.rb');
  this.copy('readme.md', 'readme.md');
};

MywebappGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

MywebappGenerator.prototype.runtime = function runtime() {
  this.template('bowerrc', '.bowerrc');
  this.template('gitignore', '.gitignore');
};

MywebappGenerator.prototype.bootstrapFiles = function bootstrapFiles() {
  var appPath = this.appPath;
  var appTemplates = this.appTemplates;
  if (true) {
    var cb = this.async();

    this.remote('Sinled', 'boilerplates', 'master', function (err, remote) {
      if (err) {
        return cb(err);
      }
      remote.directory('scss/markup', appPath);
      remote.directory('scss/templates', appTemplates);
      cb();
    });
  }
};