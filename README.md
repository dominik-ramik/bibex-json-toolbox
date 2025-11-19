# About

This project provides JavaScript classes for parsing BibTeX data and formatting citations and bibliographies. The core logic includes:

- `TinyBibReader`: Parses BibTeX strings and extracts citation keys and bibliographic data.
- `TinyBibFormatter`: Formats in-text citations and bibliographies in various styles (e.g., APA) and output formats (plain text, Markdown, HTML).

The library is suitable for integrating citation and bibliography features into web applications or other JavaScript projects.

---

## Installation

You can install this package from npm:

```sh
npm install bibex-json-toolbox
```

---

## Usage Examples

### 1. Parsing BibTeX Data

```js
// Import the classes from the npm package
import { TinyBibReader, TinyBibFormatter } from 'bibex-json-toolbox';

// Example BibTeX string
const bibtex = `
@article{smith2020,
  author = {John Smith and Jane Doe},
  title = {A Study on Something},
  year = {2020},
  journal = {Journal of Examples}
}
@book{doe2021,
  author = {Jane Doe},
  title = {Book Title},
  year = {2021},
  publisher = {Fictional Press}
}
`;

// Parse BibTeX entries
const reader = new TinyBibReader(bibtex);
console.log(reader.citeKeys); // ['smith2020', 'doe2021']
console.log(reader.bibliography['smith2020'].author); // "John Smith and Jane Doe"
```

### 2. Formatting In-Text Citations

```js
// Format a single in-text citation (APA style, plain text)
const formatter = new TinyBibFormatter(reader.bibliography, { style: 'apa', format: 'text' });
const citation = formatter.codeToCitation('[@smith2020]');
console.log(citation); // (Smith & Doe, 2020)
```

### 3. Formatting Multiple Citations

```js
// Multiple citations in one in-text citation
const multiCitation = formatter.codeToCitation('[@smith2020; @doe2021]');
console.log(multiCitation); // (Smith & Doe, 2020; Doe, 2021)
```

### 4. Generating a Bibliography

```js
// Generate a bibliography in APA style (plain text output)
const ref1 = formatter.getFullReference('smith2020');
const ref2 = formatter.getFullReference('doe2021');
console.log(ref1);
// Smith, J., & Doe, J. (2020). A Study on Something. Journal of Examples.
console.log(ref2);
// Doe, J. (2021). Book Title. Fictional Press.
```

### 5. Comprehensive Example

Suppose you have a text  want to insert citations and generate a bibliography in different formats.

```js
import { TinyBibReader, TinyBibFormatter } from 'bibex-json-toolbox';

// Example a text with citation codes
const scholarlyText = `
The importance of recent findings cannot be overstated [see @smith2020, p. 12]. According to @doe2021, the field has advanced rapidly.

Further research is needed, as highlighted by [e.g. @smith2020; @doe2021]. Some authors -@smith2020[pp. 15-16] argue for a different approach.
`;

const bibtex = `
@article{smith2020,
  author = {John Smith and Jane Doe},
  title = {A Study on Something},
  year = {2020},
  journal = {Journal of Examples}
}
@book{doe2021,
  author = {Jane Doe},
  title = {Book Title},
  year = {2021},
  publisher = {Fictional Press}
}
`;

const reader = new TinyBibReader(bibtex);
const bibliography = reader.bibliography;

// Prepare formatter for plain text output.
// You may also use: { format: 'markdown' } or { format: 'html' } for other output styles.
const formatter = new TinyBibFormatter(bibliography, { style: 'apa', format: 'text' });

// Plain text
console.log('--- Plain Text ---');
console.log(formatter.transformInTextCitations(scholarlyText));
console.log('\nReferences:');
for (const key of reader.citeKeys) {
  console.log('-' + formatter.getFullReference(key));
}
```

**Output will look like:**

```
--- Plain Text ---
The importance of recent findings cannot be overstated (Smith & Doe, 2020, p. 12). According to Doe (2021), the field has advanced rapidly.

Further research is needed, as highlighted by (Smith & Doe, 2020; Doe, 2021). Some authors Smith & Doe (2020, pp. 15-16) argue for a different approach.

References:
- Smith, J., & Doe, J. (2020). A Study on Something. Journal of Examples.
- Doe, J. (2021). Book Title. Fictional Press.
```

Markdown and HTML outputs will have citations and references formatted accordingly (with italics or links).

---

## Supported Citation Tag Styles

You can use the following styles of reference `@tags` in your text (see `main.test.js` for examples):

- `@citekey`  
  Narrative citation, e.g. `@smith2020` will be transformed to `Smith et al. (2020)`

- `[@citekey]`  
  Parenthetical citation, e.g. `[@smith2020]` will be transformed to `(Smith et al., 2020)`

- `[@citekey; @otherkey]`  
  Multiple parenthetical citations, e.g. `[@smith2020; @doe2021]` will be transformed to `(Smith et al., 2020; Doe, 2021)`

- `@citekey[suffix]`  
  Narrative citation with suffix, e.g. `@smith2020[p. 12]` will be transformed to `Smith et al. (2020, p. 12)`

- `[@citekey; @otherkey[suffix]]`  
  Multiple citations, each with optional suffix, e.g. `[@smith2020; @doe2021[p. 12]]` will be transformed to `(Smith et al., 2020; Doe, 2021, p. 12)`

- `[prefix @citekey, suffix]`  
  Parenthetical citation with prefix and suffix, e.g. `[e.g. @smith2020, p. 12]` will be transformed to `(e.g. Smith et al., 2020, p. 12)`

- `[-@citekey]`  
  Parenthetical, year only, e.g. `[-@smith2020]` will be transformed to `(2020)`

- `[prefix -@citekey, suffix]`  
  Parenthetical, year only, with prefix/suffix, e.g. `[e.g. -@smith2020, p. 12]` will be transformed to `(e.g. 2020, p. 12)`

- `@citekey [suffix]`  
  Narrative citation with suffix in brackets, e.g. `@smith2020 [p. 12]` will be transformed to `Smith et al. (2020, p. 12)`

---

Author: Dominik M. Ramík