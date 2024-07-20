module.exports = function(grunt) {
    var config = require('./.screeps.json')
    grunt.loadNpmTasks('grunt-screeps');

    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var branch = grunt.option('branch') || config.branch;
    var ptr = grunt.option('ptr') || config.ptr;


    grunt.initConfig({
        screeps: {
            options: {
               email: email,
               password: password,
               branch: branch,
               ptr: ptr,
               //server: 'season' 
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}