import fs from "fs";
import readline from "readline";

import { transformHeader, transformLink, transformParagraph } from "./transformer.js";

export const convertStringToHTML = (markdown) => {
    const emptyLineMatch = markdown.match(/^\s*$/);
    if (emptyLineMatch) {
        return markdown;
    }

    markdown = transformLink(markdown);
    
    const headerMatch = markdown.match(/^(\#{1,6})\s/);
    if (headerMatch) {
        return transformHeader(markdown, headerMatch[1].length);
    }
    
    return transformParagraph(markdown);
};

export const convertFileToHTML = (markdownFile, htmlFile) => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(markdownFile)
        });
        const writeStream = fs.createWriteStream(htmlFile, { flags: 'w' });

        let prevLine = "";
        let lineCount = 1;
        const linesToDelete = [];

        rl.on("line", (line) => {
            let html = convertStringToHTML(line);
            if (prevLine.endsWith("</p>") && html.startsWith("<p>")) {
                html = prevLine.replace("</p>", "") + "<br>" + html.replace("<p>", "");
                linesToDelete.push(lineCount - 1);
            }
            writeStream.write(html + "\n");
            prevLine = html;
            lineCount += 1;
        });

        rl.on("close", async () => {
            writeStream.end();
            try {
                const res = await deleteDupes(htmlFile, linesToDelete);
                resolve(res);
            } catch (err) {
                reject(error);
            }
        });

        rl.on("error", (err) => {
            reject(err);
        });
    });
};

const deleteDupes = (htmlFile, linesToDelete) => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(htmlFile)
        });
        const tempFile = `${htmlFile}.temp`;
        const writeStream = fs.createWriteStream(tempFile);

        let lineCount = 1;

        rl.on("line", (line) => {
            if (!linesToDelete.includes(lineCount)) {
                writeStream.write(line + '\n');
            }
            lineCount += 1;
        });

        rl.on("close", () => {
            fs.rename(tempFile, htmlFile, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`${htmlFile} successfully created`);
                }
            });
        });

        rl.on("error", (err) => {
            reject(err.message);
        });
    });
}