import { expect } from "chai";
import "mocha";

import { transformHeader, transformLink, transformParagraph } from "../../bin/m2h/transformer.js";

describe("transformer", () => {
   context("transformHeader", () => {
      it("should transform heading 1", () => {
         const html = transformHeader("# Heading 1", 1);
         expect(html).equals("<h1>Heading 1</h1>"); 
      });
      it("should transform heading 2", () => {
         const html = transformHeader("## Heading 2", 2);
         expect(html).equals("<h2>Heading 2</h2>"); 
      });
      it("should transform heading 3", () => {
         const html = transformHeader("### Heading 3", 3);
         expect(html).equals("<h3>Heading 3</h3>"); 
      });
      it("should transform heading 4", () => {
         const html = transformHeader("#### Heading 4", 4);
         expect(html).equals("<h4>Heading 4</h4>"); 
      });
      it("should transform heading 5", () => {
         const html = transformHeader("##### Heading 5", 5);
         expect(html).equals("<h5>Heading 5</h5>"); 
      });
      it("should transform heading 6", () => {
         const html = transformHeader("###### Heading 6", 6);
         expect(html).equals("<h6>Heading 6</h6>"); 
      });
      it("should not transform heading 7", () => {
         const html = transformHeader("######### Heading 7", 7);
         expect(html).equals("######### Heading 7"); 
      });
   });
   context("transformParagraph", () => {
      it("should transform paragraph", () => {
         const html = transformParagraph("Some random text");
         expect(html).equals("<p>Some random text</p>"); 
      });
      it("should transform invalid heading to paragraph (too many hashtags)", () => {
         const html = transformParagraph("####### Too many hashtags!");
         expect(html).equals("<p>####### Too many hashtags!</p>"); 
      });
      it("should transform invalid heading to paragraph (preceding empty spaces)", () => {
         const html = transformParagraph("   ### Whoa? Empty spaces?");
         expect(html).equals("<p>   ### Whoa? Empty spaces?</p>"); 
      });
   });
   context("transformLink", () => {
      it("should transform markdown with link", () => {
         const html = transformLink("Some random text with a link [Link text](https://www.example.com)");
         expect(html).equals("Some random text with a link <a href=\"https://www.example.com\">Link text</a>"); 
      });
      it("should transform markdown with 2 links", () => {
         const html = transformLink("Some random text with a link [Link text](https://www.example.com) and one more [Link text](https://www.example.com)");
         expect(html).equals("Some random text with a link <a href=\"https://www.example.com\">Link text</a> and one more <a href=\"https://www.example.com\">Link text</a>"); 
      });
   });
});