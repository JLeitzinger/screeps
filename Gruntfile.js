module.exports = function(grunt) {
  var config = require('./.screeps.json');
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var password = grunt.option('password') || config.password;
  var ptr = grunt.option('ptr') ? true : config.ptr;

  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    screeps: {
      options: {
        email: email,
        password: password,
        branch: branch,
        ptr: ptr
      },
      dist: {
        src: ['dist/*.js']
      }
    },

    clean: {
      dist: ['dist']
    },

    copy: {
      screeps: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**',
          dest: 'dist/',
          filter: 'isFile',
          rename: function (dest, src) {
            return dest + src.replace(/\//g, '_');
          }
        }],
      }
    },

    // Define the custom updateRequires task
    updateRequires: {
      files: [{
        expand: true,
        cwd: 'dist/',
        src: '**/*.js',
        dest: 'dist/'
      }]
    }
  });

  // Register the custom task
  grunt.registerTask('updateRequires', 'Update require statements in JavaScript files', function() {
    var files = grunt.file.expand({cwd: 'dist/'}, '**/*.js');
    
    files.forEach(file => {
      var filePath = `dist/${file}`;
      var content = grunt.file.read(filePath);
      var updatedContent = content.replace(/require\('\.\/(.*?)'\)/g, (match, requirePath) => {
        const newPath = requirePath.replace(/\//g, '_');
        grunt.log.writeln(`${newPath}`)
        return `require('./${newPath}')`;
      });
      grunt.file.write(filePath, updatedContent);
      grunt.log.writeln(`Updated require statements in ${filePath}`);
    });
  });

  // Default task
  grunt.registerTask('default', ['clean', 'copy:screeps', 'updateRequires', 'screeps']);
};
