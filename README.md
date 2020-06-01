<a href="https://www.battleaxe.co/">![battleaxe](./logo.png)</a>

# Custom generators, templates, and open source

## Thanks for being awesome and checking out the video.

Today we're going to aim for ruthlessly optimizing that crucial moment between having an idea for a panel and actually being at a point where you can start working on it, no matter what framework, design library, or tooling you need.

Here's the source code the simple CLI generator which downloads a CEP template panel, then reassigns it's values so you can start working on new panels in less than a minute.

## Join at 12:30 PDT on Friday, June 5th for a live Q&A if you need any help

---

## Getting Started

The video is only a 10 minute run-through and general overview. It doesn't give you much time to type, so consider cloning this repo instead of trying to write alongside so that you can easily modify existing code.

```bash
# Clone the repo locally
git clone https://github.com/battleaxedotco/CreativePROPanel.git

# Install dependencies
npm install

# Run the generator
node ./bin/index.js
```

---

## References

- [Original template panel](https://github.com/battleaxedotco/CreativePROPanel)
- [Bombino](https://github.com/Inventsable/bombino) (generator shown at beginning which inspired this talk)
- [Battleaxe's brutalism component library](https://github.com/battleaxedotco/brutalism#-brutalism)
- [Interactive brutalism documentation site shown at end](https://battleaxe.dev/brutalism-docs/#/)
- Open source [starlette color and theme library](https://github.com/Inventsable/starlette)
- Open source [cep-spy app and extension identity utility](https://github.com/Inventsable/cep-spy)

## Links to NPM Packages used:

- [inquirer.js](https://www.npmjs.com/package/inquirer)
- [chalk](https://www.npmjs.com/package/chalk)
- [download-git-repo](https://www.npmjs.com/package/download-git-repo)
- [ora](https://www.npmjs.com/package/ora)

---

## What about publishing?

All done? Next step is simply to modify your package.json's name, then run `npm publish` to create it as a new node module.

From here, your usage would either be:

```bash
# Execute package binary, skip install and invoke it in a single command:
npx [package-name]
```

Or install it globally and invoke it like so:

```bash
# Install:
npm i -g [package-name]

# Invoke as shell command:
adobe
```

---

## I'm done. What now?

- Show us what you made
- Check out brutalism and try your best to break it 🔨 Share your secret
- Continue ruthlessly optimizing your workflow and making awesome things, then share
- Consider expanding the given CLI `QUESTIONS` variable to add new functionality, exploring the included libraries to their potential or including entirely new libraries. How can you make it better? What else do you need for your own team, setup, or workflow?

<br>
<br>
<br>

<a href="https://www.battleaxe.co/"><img align="right"  height="80" src="./logo.png"></a>
