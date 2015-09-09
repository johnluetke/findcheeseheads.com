module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-run-grunt');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

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
        shell: {
            install_bootstrap: {
                options: {
                    execOptions: {
                        cwd: 'vendor/twbs/bootstrap/'
                    }
                },
                command: "npm update --verbose"
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

    grunt.registerTask('make_bootstrap', ['shell:install_bootstrap', 'copy:bootstrap_variables', 'run_grunt:bootstrap', 'copy:compiled_bootstrap']);
    grunt.registerTask('default', ['make_bootstrap']);
};
