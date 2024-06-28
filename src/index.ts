import fs from "fs/promises";
import { path, replaceAsync, replaceScriptRegex } from "./util.js";

/*
import meow from "meow";
import inquirer from "inquirer";
import cliProgress from "cli-progress";
import axios from "axios";

const cli = meow({
  importMeta: import.meta,
  flags: {},
});

async function fetchData(args: string[]) {
  return await fetch(`https://os.click/en/${args.join(":")}`, {
    headers: { "X-Inertia": "true" },
  }).then((res) => res.json());
}

const { windows }: { windows: string } = await inquirer.prompt([
  {
    type: "list",
    message: "Select Windows",
    name: "windows",
    choices: [
      {
        name: "Windows 11",
        value: "Windows_11",
      },
      {
        name: "Windows 10",
        value: "Windows_10",
      },
    ],
  },
]);

const osVersionResult = await fetchData(["Windows", windows]);

const { version }: { version: string } = await inquirer.prompt([
  {
    type: "list",
    message: "Select Windows Version",
    name: "version",
    choices: osVersionResult.props.searchResults.OsVersion.items.map((v) => ({
      name: `${v.name} (${v.codename})`,
      value: v.name,
    })),
  },
]);

const osBuildResult = await fetchData(["Windows", windows, version]);
const latestVersion = Math.max(
  ...osBuildResult.props.searchResults.OsBuild.items.map((v) => v.date.timestamp)
);

const { build }: { build: string } = await inquirer.prompt([
  {
    type: "list",
    message: "Select Windows Build",
    name: "build",
    choices: osBuildResult.props.searchResults.OsBuild.items.map((v) => ({
      name: `${v.name}${v.date.timestamp === latestVersion ? " (latest)" : ""}`,
      value: v.name,
    })),
  },
]);

const osEditionResult = await fetchData(["Windows", windows, version, build]);

const { edition }: { edition: string } = await inquirer.prompt([
  {
    type: "list",
    message: "Select Edition",
    name: "edition",
    choices: osEditionResult.props.searchResults.OsEdition.items.map((v) => ({
      name: v.name,
      value: v.name,
    })),
  },
]);

const osLanguageResult = await fetchData(["Windows", windows, version, build, edition]);

const { language }: { language: string } = await inquirer.prompt([
  {
    type: "list",
    message: "Select Language",
    name: "language",
    choices: osLanguageResult.props.searchResults.OsLanguage.items.map((v) => ({
      name: v.name,
      value: v.id,
    })),
  },
]);

const osArchitectureResult = await fetchData([
  "Windows",
  windows,
  version,
  build,
  edition,
  language,
]);

const { architecture }: { architecture: string } = await inquirer.prompt([
  {
    type: "list",
    message: "Select Architecture",
    name: "architecture",
    choices: osArchitectureResult.props.searchResults.OsArchitecture.items.map((v) => ({
      name: v.displayName,
      value: v.id,
    })),
  },
]);

const osLinkResult = await fetchData([
  "Windows",
  windows,
  version,
  build,
  edition,
  language,
  architecture,
]);

const os = osLinkResult.props.searchResults.OsLink.selected;
const osLink = os.urlSecure;

const sizeGB = os.size ? (os.size / 1024).toFixed(2) : null;

console.log(`Downloading ${sizeGB} GB`);

const { confirm }: { dlx: boolean } = await inquirer.prompt([
  {
    type: "confirm",
    message: "Are you sure you want to continue?",
    name: "confirm",
  },
]);

const progress = new cliProgress.Bar({
  ...cliProgress.Presets.shades_classic,
  hideCursor: true,
});

try {
  const res = await axios.get(os.urlSecure, {
    responseType: "stream",
    headers: {
      Referer: "https://os.click/",
      "Alt-Used": "dl.os.click",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/120.0",
    },
  });
  const stream = res.data;
  console.dir(stream, { depth: 1 });
} catch (error) {
  console.dir(error, { depth: 1 });
}

process.exit();
*/
// Main
console.log("Reading base file...");

const base = await fs.readFile(path("base.xml"), "utf-8");

const result = await replaceAsync(base, replaceScriptRegex, async (substring, scriptName) => {
  const scriptPath = path("scripts", scriptName);
  console.log(`Replacing '${scriptName}' script [${scriptPath}]`);
  const script = await fs.readFile(scriptPath, "utf-8");
  return script;
});

const resultPath = path("dist", "autounattend.xml");
console.log(`Writing result [${resultPath}]`);

await fs.mkdir(path("dist"));
await fs.writeFile(resultPath, result);
