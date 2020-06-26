// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();
//--
const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./utils/api.js')
const generateMarkdown = require('./utils/generateMarkdown.js')

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName + '.md', data, error => error ? console.error(error) : console.log(`${fileName + '.md'} generated!`))
}
//const question = [


const init = async _ => {
  let rmObject = {}
  do {
    const { rmUser, rmRepo } = await prompt([
      {
        type: 'input',
        name: 'rmUser',
        message: 'What is your GitHub user name?'
      },
      {
        type: 'input',
        name: 'rmRepo',
        message: 'What is your repository name?'
      }
    ])
    rmObject = await api.getUser(rmUser, rmRepo)
    if (!rmObject) {
      console.error('Repo not found!')
    } else {
      console.log(`${rmObject.fullName} found!`)
    }
  } while (!rmObject)
  
  Object.assign(rmObject, await prompt([
   
    {
      type: 'input',
      name: 'inst',
      message: 'What are the installation instructions?'
    },
    {
      type: 'input',
      name: 'use',
      message: 'What is the usage description?'
    },
   
    {
      type: 'input',
      name: 'con',
      message: 'Who are the contributors?'
    },
    {
      type: 'input',
      name: 'test',
      message: 'What are the tests?'
    },
    {
      type: 'input',
      name: 'qs',
      message: 'Any questions?'
    }
  ]))
  writeToFile(rmObject.title, await generateMarkdown(rmObject))
}

init()








//questions:  name,  description, additional questions, installation usage badges, tests, contributors 

//some stuff that might help later but not now.  Python based 
// # Foobar

// Foobar is a Python library for dealing with word pluralization.

// ## Installation

// Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

// ```bash
// pip install foobar
// ```

// ## Usage

// ```python
// import foobar

// foobar.pluralize('word') # returns 'words'
// foobar.pluralize('goose') # returns 'geese'
// foobar.singularize('phenomena') # returns 'phenomenon'
// ```

// ## Contributing
// Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

// Please make sure to update tests as appropriate.

// ## License
// [MIT](https://choosealicense.com/licenses/mit/)