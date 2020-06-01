#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
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

async function init() {
  console.log(`\r\n${chalk.black.bgBlue(" Create a new panel: ")}\r\n`);

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

  const ANSWERS = await inquirer.prompt(QUESTIONS);

  console.log("");
  console.log(ANSWERS);

  const REALNAME = ANSWERS.extName;
  const SLUG = ANSWERS.extName.split(" ").join("-").toLowerCase();
  const GITHUB_LINK = "Inventsable/CreativePROPanel";

  let SPINNER = ora({
    text: `Downloading template from ${GITHUB_LINK}`,
    spinner: ORA_SPINNER,
  }).start();

  const ROOT = `${path.resolve("./")}/${SLUG}`;

  download(GITHUB_LINK, ROOT, (err) => {
    if (err) console.error(err);

    SPINNER.stopAndPersist({
      symbol: "",
      text: `${chalk.black.bgBlue(" DOWNLOAD COMPLETE ")}`,
    });

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

    const PATHS = [`${ROOT}/CSXS/manifest.xml`, `${ROOT}/.debug`];

    PATHS.forEach((file) => {
      let data = fs.readFileSync(file, "utf-8");
      REPLACEMENTS.forEach((rx) => {
        data = data.replace(rx.find, rx.replace);
      });
      fs.writeFileSync(file, data, { encoding: "utf-8" });
    });
  });
}

init();
