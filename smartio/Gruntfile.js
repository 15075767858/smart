/**
 * Created by liuzhencai on 16/6/1.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                //separator: ';'
            },
            allInOne: { //所有JS文件全部合并成一份文件
                src: ['src/js/**/*.js'],
                dest: 'dest/src-concated/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildrelease: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src/js', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest/js', //输出到此目录下
                    ext: '.js' //指定扩展名
                }]
            },
            buildsrc: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest/src-min', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            },
            buildall: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'src', //js目录
                    src: '**/*.js', //所有js文件
                    dest: 'dest', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            }

        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: "src/php/", src: "**", dest: "dest/php"},
                    {expand: true, cwd: "src/img/", src: "**", dest: "dest/img"},
                    {expand: true, cwd: "src/framework/", src: "**", dest: "dest/framework"},
                    {expand: true, cwd: "src/download/", src: "**", dest: "dest/download"},
                    {expand: true, cwd: "src/tpls/", src: "**", dest: "dest/tpls"},
                    {expand: true, cwd: "src/", src: "*.html", dest: "dest/"}
                ]
            },
            html: {
                files:[
                    {expand: true, cwd: "src/", src: "*.html", dest: "dest/"},
                    {expand: true, cwd: "src/js/", src: "*.js", dest: "dest/js/"},
                ]
            }
        },
        /* livereload:{
         options:{
         base:"src"
         },
         files:[
         'dest/!**'
         ]
         },*/
        watch: {
            client: {
                files: ['src/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['sass/*'],
                tasks: ['compass'],
                options: {
                    //livereload:true
                }
            },
            /*javascript: {
                files: ['src/js/!**!/!*.js'],
                tasks: ['concat:allInOne', 'uglify:buildsrc', 'uglify:buildrelease'],
                options: {
                    spawn: true,
                    interrupt: true
                }
            },*/
            html: {
                files: ['src/**'],
                tasks: ['copy:html']
            },

        },

        ftp_push: {
            your_target: {
                options: {
                    //authKey: "serverA",
                    host: "192.168.253.253",
                    dest: "/web_arm/www/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dest/',
                        src: [
                            "**"
                        ]
                    }
                ]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'dest/css',
                    environment: 'production',
                    sourcemap: true
                }
            },
            dev: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-ftp-push');
    grunt.registerTask('live', ['watch']);
    grunt.registerTask('default', [
        'compass',
        'concat',
        'uglify',
        //'ftp_push',
        'copy',
        'watch'
    ]);
};
