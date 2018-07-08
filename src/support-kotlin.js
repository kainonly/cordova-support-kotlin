const fs = require('fs');
const xml2js = require('xml2js');
let defaultArgs = {
    kotlin_version: '\text.kotlin_version = "latest.integration"\n\t',
    kotlin_android: 'apply plugin: "kotlin-android"',
    classpath: ' \t\tclasspath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"'
};
const configXML = fs.readFileSync('./config.xml').toString();
const gradlePath = './platforms/android/app/build.gradle';
const gradle = fs.readFileSync(gradlePath).toString();
let text = gradle;
const parser = new xml2js.Parser();
parser.parseString(configXML, (error, config) => {
    if (error) return;
    if (!config.widget.hasOwnProperty('platform')) return;
    for (let x of config.widget.platform)
        if (x['$'].name === 'android') {
            if (x['$'].hasOwnProperty('kotlin')) defaultArgs.kotlin_version = `\text.kotlin_version = "${x['$'].kotlin}"\n\t`;
            if (x.hasOwnProperty('apply-plugin')) defaultArgs.apply_plugin = x['apply-plugin'];
            break;
        }
    if (!gradle.match(/ext.kotlin_version/g)) append(defaultArgs.kotlin_version, /buildscript(\s*)\{\s*/g);
    if (!gradle.match(/kotlin-gradle-plugin/g)) append(defaultArgs.classpath, /classpath\s+(['"])[\w.:]+(['"])/g);
    if (!gradle.match(/apply\s+plugin(\s*:\s*)(['"])kotlin-android(['"])/g)) append(defaultArgs.kotlin_android);
    if (defaultArgs.apply_plugin)
        for (let x of defaultArgs.apply_plugin) {
            const reg = new RegExp(`apply\\s+plugin(\\s*:\\s*)(['"])${x}(['"])`, 'g');
            if (!gradle.match(reg)) append(`apply plugin: "${x}"`);
        }
});

function append(edit, reg) {
    if (reg === undefined) reg = /com.android.application['"]/g;
    const pos = text.search(reg);
    const len = text.match(reg)[0].length;
    const header = text.substring(0, pos + len);
    const footer = text.substring(pos + len);
    text = header + '\n' + edit + footer;
}

fs.writeFileSync(gradlePath, text);