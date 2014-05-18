module.exports = function( grunt ) {
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-connect" );
    grunt.loadNpmTasks( "grunt-contrib-qunit" );
    grunt.loadNpmTasks( "grunt-sass" );
    grunt.loadNpmTasks("grunt-contrib-watch");


    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8989,
                    base: '/src',
                    livereload: true,
                },
            },
        },
        open: {
            all: {
                path: 'http://localhost:8989/'
            }
        },
        copy: {
        	js:{
        	    expand: true,
            	src: ['js/**/*.js'],
            	cwd: 'src/',
            	dest: 'dist/'	
        	},
        	assets: {
        		expand: true,
            	src: ['assets/*.*'],
            	cwd: 'src/',
            	dest: 'dist/'
        	}
        },
        clean: {
        	dist: {
        		src: ["dist/"]
        	}
        },
		jshint: {
			options: {
				node: true,
				jshintrc: ".jshintrc",
				jshintignore: ".jshintignore"
			},
			files: {
				src : ["src/js/**/*.js"]
			}
		},
        uglify: {
            options: {
              sourceMap: true,
              sourceMapName : "dist/js/sourcemap.map",      
              compress: {
                drop_console: true
              }
            },
            app: {
              files: {
                "dist/all-min.js": ["app.js","dist/js/models/**/*.js","dist/js/viewModels/**/*.js"]
              }
            }
        },
        sass: {                                 // task
            dist: {                             // target
                files: {                        // dictionary of files
                    'dist/css/styles.css': 'src/sass/screen.scss'     // 'destination': 'source'
                }
            }
        },
        watch: {
          js: {
            files: ['src/js/**/*.js'],
            tasks: ['jshint','qunit']
          },

          css: {
            files: ['src/sass/**/*.scss'],
            tasks: ['sass'],
            options: {
              spawn: false,
            },
          },
        },
        qunit : {
            all : ['specs/*.html']
        }
    });

    grunt.registerTask( "watch", [ "watch" ] );
    grunt.registerTask( "tester", [ "jshint", "qunit" ] );
    grunt.registerTask( "prepare", [ "copy", "uglify" ] );
    grunt.registerTask( "default", [ "clean", "tester", "watch", "prepare", "connect" ] );
    
};