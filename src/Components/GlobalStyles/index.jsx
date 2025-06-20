import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  
  --font-title: "Montserrat", sans-serif;
  --font-primary: "Poppins", sans-serif;
  --font-special: "Playfair Display", serif;

  --color-blue: #0f1b29;
  --color-blue-ligth: #426792;
  --color-golden: #d6b689;
  --degrade-blue: linear-gradient(
    170deg,
    rgba(15, 27, 41, 1) 0%,
    rgba(44, 72, 102, 1) 48%,
    #041120 100%
  );
  --degrade-golden: linear-gradient(
    175deg,
    rgba(235, 152, 38, 1) 0%, 
    rgba(214, 182, 137, 1) 48%, 
    rgba(242, 158, 41, 0.95) 100%
  );
  --degrade-whatsapp: linear-gradient(17deg,rgba(2, 173, 65, 1) 0%, rgba(6, 112, 45, 1) 51%, rgba(37, 211, 102, 0.95) 100%);
}



html {
  line-height: 1.15; 
  -webkit-text-size-adjust: 100%; 
  scroll-behavior: smooth;
}
body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-primary);
  background-color: #f5f5f5;
}
main {
  display: block;
  width: 100%;
}
h1 {
    margin: 0;
}
hr {
  box-sizing: content-box; 
  height: 0; 
  overflow: visible; 
}
a {
  background-color: transparent;
}
ul {
  padding: 0;
  margin: 0;

  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
abbr[title] {
  border-bottom: none; 
  text-decoration: underline; 
  text-decoration: underline dotted; 
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
samp {
  font-family: monospace, monospace; 
  font-size: 1em; 
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
img {
  border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; 
  font-size: 100%; 
  line-height: 1.15; 
  margin: 0; 
}
button,
input { 
  overflow: visible;
}
button,
select { 
  text-transform: none;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}
fieldset {
  padding: 0.35em 0.75em 0.625em;
}
legend {
  box-sizing: border-box; 
  color: inherit; 
  display: table; 
  max-width: 100%; 
  padding: 0; 
  white-space: normal; 
}
progress {
  vertical-align: baseline;
}
textarea {
  overflow: auto;
}
[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; 
  padding: 0; 
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield; 
  outline-offset: -2px; 
}
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button; 
  font: inherit; 
}
details {
  display: block;
}
summary {
  display: list-item;
}
template {
  display: none;
}
[hidden] {
  display: none;
}
`;

export default GlobalStyles;
