"use strict";

module.exports = grunt => {
   grunt.initConfig({
       eslint: {
           options: {
               configFile: "esRules/eslint.json",
               rulePaths: ['esRules/rules'],
               quiet: true
           },
           // validate: ["src/**/*.js", "test/**/*.js"]
           validate: ["src/**/no_eslint_error.js", "test/**/*.js"]
       }
   });

   grunt.loadTasks("esRules/tasks");
   grunt.registerTask("default", ["eslint"])
};