'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates'
  });

  var appConfig = {
    app: 'app',
    dist: 'dist',
    test: 'test'
    //, xtend: 'orig-movil_xtend/.tmp'
  };

  grunt.initConfig({

    yeoman: appConfig,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js', '<%= yeoman.xtend %>/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass:server', 'postcss:server']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          //'<%= yeoman.xtend %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          //'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            var middlewares = [
              require('connect-modrewrite')(['!\\.html|\\.js|\\.css|\\.png|\\.jp(e?)g|\\.gif|\\.txt|\\.xml|\\.pdf|\\.woff|\\.ttf|\\.ico|\\.svg\\w+($|\\?) /main.html']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app),
              //connect.static(appConfig.xtend),
              connect().use(function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                next();
              })
            ];
            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    sass: {
      options: {
        includePaths: [
          '<%= yeoman.app %>/bower_components'
        ]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/',
          src: ['*.scss', '*.sass'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: 'last 1 version'
          })
        ]
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        exclude: [
          'bower_components/jquery/',
          'bower_components/bootstrap-sass/'
        ],
        ignorePath: /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [
            [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          ]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        }
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'origmovil',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/origmovil.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/**/*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'index.html',
            '500.html',
            '404.html',
            'fonts/*',
            'locales/*.json',
            'views/**/*.html',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'WEB-INF/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    targethtml: {
      serve: {
        files: {
          'app/main.html': 'app/index.html'
        }
      },
      dist: {
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    jsbeautifier: {
      files: ['Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        '<%= yeoman.app %>/scripts/**/*.html',
        '<%= yeoman.test %>/spec/**/*.js',
        '<%= yeoman.app %>/locales/*.json'
      ],
      options: {
        js: {
          indentSize: 2
        },
        html: {
          indentSize: 2
        },
        json: {
          indentSize: 2
        }
      }
    },

    execute: {
      simple_target_with_args: {
        options: {
          // execute node with additional arguments
          args: ['/dist/scripts/origmovil.js', '>>','']
        },
        src: ['ofuscador.js']
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      // 'jsbeautifier',
      'wiredep',
      'concurrent:server',
      'sass:server',
      'postcss:server',
      'targethtml:serve',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'sass:server',
    'postcss:dist',
    'connect:test'
    //'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    // 'jsbeautifier',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'sass:server',
    'postcss:dist',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    //'cssmin', // Comentado mientras se agrega código
    //'uglify', // Comentado mientras se agrega código
    'copy:dist',
    //'execute',
    //'filerev',
    'usemin',
    'targethtml:dist',
  ]);

  grunt.registerTask('dist', [
    'newer:jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
