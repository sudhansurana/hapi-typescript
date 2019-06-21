const Dotenv = require('dotenv');
const chalk = require('chalk');
const fs = require('fs');
const dbConfig = require("./dbconfig");
let ENTITY_ROOT = 'server';

if (fs.existsSync(`dist/database`)) {
    ENTITY_ROOT = 'dist';
}

console.info(chalk.green.bold(`:::Using Entity Root: ${ENTITY_ROOT}`))

if (!fs.existsSync(`${ENTITY_ROOT}/database`)) {
    console.error(chalk.red.bold(`:::No entities were found inside the entity root. Did you build the project properly?`));
    process.exit(1);
}

console.log(`The current environment is: ${process.env.NODE_ENV}`);
const db = dbConfig[process.env.NODE_ENV];
db["entities"] = [
    `${ENTITY_ROOT}/database/default/entities/**/*.*`
];
db["migrations"] = [
    `${ENTITY_ROOT}/database/default/entities/**/*.*`
];
db["subscribers"] = [
    `${ENTITY_ROOT}/database/default/entities/**/*.*`
];

module.exports = [
    db
]