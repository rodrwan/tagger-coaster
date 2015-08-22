module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({

    // Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    // meta: {
    //   basePath: '',
    //   assetsPath: 'src/assets/',
    //   srcPathJs: 'src/app/',
    //   copyHtml: 'build/html/',
    //   buildApp: 'build/app/',
    //   buildAssets: 'build/assets'
    // },

    // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    //         '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //         '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

    // // Task configuration.
    // concat: {
    //   options: {
    //     stripBanners: true,
    //     banner: '<%= meta.banner %>'
    //   },
    //   dist: {
    //     src: [
    //       '<%= meta.srcPathJs %>init.js',
    //       '<%= meta.srcPathJs %>app.js',
    //       '<%= meta.srcPathJs %>routes/**/*.mdl.js',
    //       '<%= meta.srcPathJs %>routes/**/*.ctrl.js',
    //       '<%= meta.srcPathJs %>services/**/*.srv.js',
    //       '<%= meta.srcPathJs %>directives/**/*.drv.js'
    //       ],
    //     dest: '<%= meta.buildApp %><%= pkg.name %>.js'
    //   }
    // },

    // // css

    // cssmin: {
    //   build: {
    //     files: {
    //       '<%= meta.assetsPath %>css/marcalegal.min.css':
    //         '<%= meta.assetsPath %>css/marcalegal.css',
    //       '<%= meta.assetsPath %>css/normalize.min.css':
    //         '<%= meta.assetsPath %>css/normalize.css'
    //     }
    //   }
    // },

    // uglify: {
    //   build: {
    //     files: {
    //       '<%= meta.buildApp %><%= pkg.name %>.min.js': [
    //         '<%= meta.buildApp %><%= pkg.name %>.js'
    //       ]
    //     }
    //   }
    // },

    // copy: {
    //   dist: {
    //     files: [
    //       {
    //         dest: '<%= meta.copyHtml %>',
    //         src: [
    //           '**/routes/**/*.html',
    //           '**/directives/**/*.html'
    //         ],
    //         cwd: '<%= meta.srcPathJs %>',
    //         expand: true
    //       },
    //       {
    //         dest: '<%= meta.buildAssets %>',
    //         src: [
    //           '**/*'
    //         ],
    //         cwd: '<%= meta.assetsPath %>',
    //         expand: true
    //       }
    //     ]
    //   }
    // },

    wiredep: {
      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'index.html'   // .html support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    },

    // watch: {
    //   scripts: {
    //     files: [
    //       '<%= meta.srcPathCss %>**/*.scss',
    //       '<%= meta.srcPathJs %>**/*.js',
    //       '<%= meta.basePath %>index.html'
    //     ],
    //     tasks: [
    //       'cssmin',
    //       'concat',
    //       'ngAnnotate',
    //       'uglify',
    //       'copy'
    //     ]
    //   }
    // },

    // karma: {
    //   unit: {
    //     configFile: 'test/karma.config.js',
    //     singleRun: true
    //   }
    // }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wiredep');
  // grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [
    // 'cssmin',
    // 'concat',
    // 'uglify',
    'wiredep',
    // 'copy'
  ]);

  // Default task.
  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('test', [
    'karma'
  ]);
};
