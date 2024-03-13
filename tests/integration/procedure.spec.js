import { expect } from "chai";
import "mocha";

import { convertFileToHTML, convertStringToHTML } from "../../bin/m2h/procedure.js"

describe("procedure", () => {
    context("convertStringToHTML", () => {
        it("should transform heading 1", () => {
            const html = convertStringToHTML("# Heading 1", 1);
            expect(html).equals("<h1>Heading 1</h1>"); 
        });
        it("should transform paragraph", () => {
            const html = convertStringToHTML("Some random text");
            expect(html).equals("<p>Some random text</p>"); 
        });
        it("should transform markdown with link", () => {
            const html = convertStringToHTML("Some random text with a link [Link text](https://www.example.com)");
            expect(html).equals("<p>Some random text with a link <a href=\"https://www.example.com\">Link text</a></p>"); 
        });
        it("should ignore empty lines", () => {
            const html = convertStringToHTML("     ");
            expect(html).equals("     "); 
        });
    });
    context("convertFileToHTML", () => {
        it.skip("should transform markdown document", () => {
            const inputFile = "tests/transformations/sample1.txt";
            const outputFile = "tests/transformations/sample1.test.html";
            const expectedFile = "tests/transformations/sample1.html";
            convertFileToHTML(inputFile, outputFile);
            // need to await above call
        });
    });
});