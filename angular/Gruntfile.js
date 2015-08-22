module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    // Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      basePath: '',
      srcPathCss: 'src/scss/',
      srcPathJs: 'src/app/',
      deployPath: 'public/build/assets/',
      copyHtml: 'public/build/html/',
      buildApp: 'public/build/app/',
      deps: []
    },

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

    // Task configuration.
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          '<%= meta.srcPathJs %>app.mdl.js',
          '<%= meta.srcPathJs %>app.ctl.js',
          '<%= meta.srcPathJs %>app.cfg.js',
          '<%= meta.srcPathJs %>routes/**/*.mdl.js',
          '<%= meta.srcPathJs %>routes/**/*.ctl.js',
          '<%= meta.srcPathJs %>routes/**/*.drv.js',
          '<%= meta.srcPathJs %>directives/**/*.mdl.js',
          '<%= meta.srcPathJs %>directives/**/*.drv.js',
          '<%= meta.srcPathJs %>services/**/*.mdl.js',
          '<%= meta.srcPathJs %>services/**/*.svc.js'
        ],
        dest: '<%= meta.buildApp %><%= pkg.name %>.js'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.buildApp %>',
          src: '*.js',
          dest: '<%= meta.buildApp %>'
        }]
      }
    },

    ngconstant: {
      build: {
        options: {
          dest: 'src/app/app.cfg.js',
          name: 'HackerNewCharts.config',
          deps: '<%= meta.deps %>',
          wrap: '(function () {\n\'use strict\'\n\n {%= __ngModule %} })();'
        },
        constants: {
          SCRAPER_API_URL: 'http://hacker-news-charts.herokuapp.com/api'
        }
      },
      test: {
        options: {
          dest: 'src/app/app.cfg.js',
          name: 'HackerNewCharts.config',
          deps: '<%= meta.deps %>',
          wrap: '(function () {\n\'use strict\'\n\n {%= __ngModule %} })();'
        },
        constants: {
          SCRAPER_API_URL: 'http://localhost:8000/api'
        }
      }
    },

    sass: {
      dist: {
        options: {
          bundleExec: true
        },
        files: {
          '<%= meta.deployPath %>css/style.css': '<%= meta.srcPathCss %>style.scss'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          '<%= meta.deployPath %>css/style.min.css': '<%= meta.deployPath %>css/style.css'
        }
      }
    },

    uglify: {
      build: {
        files: {
          '<%= meta.buildApp %><%= pkg.name %>.min.js': [
            '<%= meta.buildApp %><%= pkg.name %>.js'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: [
              'index.html'
            ],
            dest: 'public/',
            flatten: true,
            filter: 'isFile'
          }, {
            dest: '<%= meta.buildApp %>',
            src: [
              '**/routes/**/*.html',
              '**/directives/**/*.html'
            ],
            cwd: '<%= meta.srcPathJs %>',
            expand: true
          }, {
            dest: 'public/build/assets/img/',
            src: [
              '**/*.{jpg,png,gif}'
            ],
            cwd: 'src/img',
            expand: true
          }]
      }
    },

    wiredep: {
      task: {
        src: [
          'public/index.html'   // .html support...
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          '<%= meta.srcPathCss %>**/*.scss',
          '<%= meta.srcPathJs %>**/*.js',
          '<%= meta.srcPathJs %>**/*.html'
        ],
        tasks: [
          'sass',
          'cssmin',
          'ngconstant:test',
          'concat',
          'ngAnnotate',
          'uglify',
          'copy',
          'wiredep'
        ]
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.config.js',
        singleRun: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [
    'sass',
    'cssmin',
    'ngconstant:build',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy',
    'wiredep'
  ]);

  grunt.registerTask('dev', [
    'sass',
    'cssmin',
    'ngconstant:test',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy',
    'wiredep',
    'watch'
  ]);

  grunt.registerTask('test', [
    'sass',
    'cssmin',
    'ngconstant:test',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy',
    'wiredep',
    'karma'
  ]);

  grunt.registerTask('default', 'dev');
  grunt.registerTask('testing', 'test');
  grunt.registerTask('heroku:production', 'build');
};
