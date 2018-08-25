'use strict';
const chalk = require('chalk');
const eslint = require('eslint');

module.exports = grunt => {
    grunt.registerMultiTask('eslint', 'Validate files with ESLint', function () {
        const opts = this.options({
            outputFile: false,
            quiet: false,
            maxWarnings: -1,
            failOnError: true,
        });
        console.log("zhouchangping-===============");
        console.log(opts);
        console.log(this.filesSrc);

        if (this.filesSrc.length === 0) {
            grunt.log.writeln(chalk.magenta('Could not find any files to validate'));
            return true;
        }

        const formatter = eslint.CLIEngine.getFormatter(opts.format);

        if (!formatter) {
            grunt.warn(`Could not find formatter ${opts.format}`);
            return false;
        }

        const engine = new eslint.CLIEngine(opts);

        let report;
        try {
            report = engine.executeOnFiles(this.filesSrc);
        } catch (err) {
            grunt.warn(err);
            return false;
        }

        console.log("opts.fix===========");
        console.log(opts.fix);
        if (opts.fix) {
            eslint.CLIEngine.outputFixes(report);
        }

        let results = report.results;
        console.log("results");
        console.log(results);

        if (opts.quiet) {
            results = eslint.CLIEngine.getErrorResults(results);
        }

        console.log("results222222");
        console.log(results);

        const output = formatter(results);

        console.log("output======");
        console.log(output);
        console.log("------output======");

        if (opts.outputFile) {
            grunt.file.write(opts.outputFile, output);
        } else if (output) {
            console.log(output);
        }

        const tooManyWarnings = opts.maxWarnings >= 0 && report.warningCount > opts.maxWarnings;

        if (report.errorCount === 0 && tooManyWarnings) {
            grunt.warn(`ESLint found too many warnings (maximum: ${opts.maxWarnings})`);
        }
        console.log("*******************************");
        console.log(opts.failOnError);
        console.log(report.errorCount);

        return opts.failOnError ? report.errorCount === 0 : 0;
    });
};
