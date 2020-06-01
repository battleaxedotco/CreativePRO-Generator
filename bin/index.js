#!/usr/bin/env node

// Dependencies and statics (4:31 - 4:42)
const path = require("path");
const fs = require("fs");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");

// Spinner object for loading icon (7:07)
const ORA_SPINNER = {
  interval: 80,
  frames: [
    "   ⠋",
    "   ⠙",
    "   ⠚",
    "   ⠞",
    "   ⠖",
    "   ⠦",
    "   ⠴",
    "   ⠲",
    "   ⠳",
    "   ⠓",
  ],
};

// Our function must be async to work with Inquirer since it returns a Promise/thenable (4:42)
async function init() {
  // Greeting our user (4:50)
  console.log(`\r\n${chalk.black.bgBlue(" Create a new panel: ")}\r\n`);

  // Array to feed into Inquirer, creating the prompts of our CLI tool (5:13 - 6:06)
  // See all properties here: https://www.npmjs.com/package/inquirer#questions
  let QUESTIONS = [
    {
      type: "input",
      name: "extName",
      message: "Name of panel?",
      default: "astronomicon",
    },
    {
      type: "number",
      name: "portNum",
      message: "Base CEF Port (between 1024 and 65534)",
      default: 8888,
      validate: (value) => {
        return /\d{4,5}/.test(value) && value > 1023 && value < 65535
          ? true
          : "Must require a valid port between 1024 and 65534";
      },
    },
  ];

  // Display Inquirer and do not proceed until user has completed all prompts (6:10)
  const ANSWERS = await inquirer.prompt(QUESTIONS);

  // Outputting the result (6:20)
  console.log("");
  console.log(ANSWERS);

  // We need separate version of the name for the Menu display and file path / extension ID (6:30)
  const REALNAME = ANSWERS.extName;
  const SLUG = ANSWERS.extName.split(" ").join("-").toLowerCase();

  // We'll use a static link to a GitHub path. Can also be a private filepath (via fs or fs-extra), GitLab, or BitBucket (6:58)
  const GITHUB_LINK = "battleaxedotco/CreativePROPanel";

  // Creating our loading spinner to display while CLI downloads template (8:20)
  let SPINNER = ora({
    text: `Downloading template from ${GITHUB_LINK}`,
    spinner: ORA_SPINNER,
  }).start();

  // The template's file path will be the current terminal location plus slug name (8:40)
  const ROOT = `${path.resolve("./")}/${SLUG}`;

  // Invoking the download-git-repo package. First param is source, second is filepath destination, third is callback on completion (8:50 - 9:00)
  download(GITHUB_LINK, ROOT, (err) => {
    if (err) console.error(err);

    // Stop the loading icon (9:08)
    SPINNER.stopAndPersist({
      symbol: "",
      text: `${chalk.black.bgBlue(" DOWNLOAD COMPLETE ")}`,
    });

    // Create an Array which will find and replace the placeholder values of our template (9:40 - 10:00)
    const REPLACEMENTS = [
      {
        find: /\$SLUG\$/gm,
        replace: SLUG,
      },
      {
        find: /\$NAME\$/gm,
        replace: REALNAME,
      },
      {
        find: /\$PORT\$/gm,
        replace: ANSWERS.portNum,
      },
    ];

    // Create an Array for the files we want to target for find/replace of placeholder values (10:00 - 10:09)
    const PATHS = [`${ROOT}/CSXS/manifest.xml`, `${ROOT}/.debug`];

    // Iterate through each file and read it's contents (10:12)
    PATHS.forEach((file) => {
      let data = fs.readFileSync(file, "utf-8");
      // Iterate through each placeholder find/replace value, and rewrite the file contents as we go (10:26)
      REPLACEMENTS.forEach((rx) => {
        data = data.replace(rx.find, rx.replace);
      });
      // Rewrite our new data back into the original filepath location (10:43)
      fs.writeFileSync(file, data, { encoding: "utf-8" });
    });
  });
}

init();
