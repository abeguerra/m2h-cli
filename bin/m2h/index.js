#!/usr/bin/env node
import { program, Option } from "commander";
import { convertFileToHTML, convertStringToHTML } from "./procedure.js";

program
    .addOption(new Option("-md , --markdown <string>", "string of markdown to be transformed to HTML").conflicts("fileIn"))
    .option("-fin , --file-in <string>", "path to the file containing the markdown to be transformed to HTML")
    .option("-fout , --file-out <string>", "path to the file that should be created")
    .description("CLI to convert markdown to HTML.");

program.parse();

const { fileIn, fileOut, markdown } = program.opts();

if (!markdown && !fileIn) {
    console.log("error: option '-md , --markdown <string>' or option '-fin , --file-in <string>' must be specified");
}

if (!fileIn != !fileOut) {
    console.log("error: option '-fin , --file-in <string>' and option '-fout , --file-out <string>' must be provided together");
}

if (markdown) {
    // TODO - handle errors
    const html =  convertStringToHTML(markdown);
    console.log(html);
}

if (fileIn && fileOut) {
    try {
        const res = await convertFileToHTML(fileIn, fileOut);
        console.log(res);
    } catch(err) {
        console.log(err.message);
    }
}
