export const transformHeader = (markdown, size) => markdown.replace(/^\#{1,6}\s(.*$)/, `<h${size}>$1</h${size}>`);

export const transformParagraph = (markdown) => `<p>${markdown}</p>`;

export const transformLink = (markdown) => markdown.replace(/\[(.*?)\]\((.*?)\)/g, "<a href=\"$2\">$1</a>");