module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-run-grunt');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            bootstrap_variables: {
                files: [
                    { src: ['styles/bootstrap-variables.less'], dest: 'vendor/twbs/bootstrap/less/variables.less' }
                ]
            },
        compiled_bootstrap: {
                files: [
                    { src: 'vendor/twbs/bootstrap/dist/css/bootstrap.min.css', dest: 'styles/bootstrap-custom.min.css' }
                ]
            }
        },
        run_grunt: {
            bootstrap: {
                options: {
                    task: ['dist']
                },
                src: ['vendor/twbs/bootstrap/Gruntfile.js']
            }
        },
    });

    grunt.registerTask('make_bootstrap', ['copy:bootstrap_variables', 'run_grunt:bootstrap', 'copy:compiled_bootstrap']);
    grunt.registerTask('default', ['make_bootstrap']);
};
