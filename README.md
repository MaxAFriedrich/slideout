# SideOut

A simple hugo theme for building educational material that could be presented as slides.

## Usage

Make sure to add the following to your `config.towl` file.

```toml
theme = "slideout"

[Params]
  logo = "/img/logo.svg"
  author = "Max Friedrich"

[markup.highlight]
  codeFences = true
  guessSyntax = true
  hl_Lines = ""
  lineNoStart = 1
  lineNos = true
  lineNumbersInTable = true
  tabWidth = 4
  noClasses = false
  pygmentsUseClasses = true
  pygmentsCodefences = true

[markup.goldmark.renderer]
  unsafe = true
```

Then to separate content into slides just add horizontal rules (`---` or `***`) to your document. These will always remain hidden and are just used for the purposes of delineating eliminating the slides.
