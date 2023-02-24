# Recipe API

This is a GraphQL API for a recipe sharing application. The API allows users to create, read, update, and delete recipes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the necessary dependencies for this project, run the following command:

`yarn`

## Usage

To start the development server, run the following command:

`yarn run start:dev`

This will start the server and automatically reload it when changes are made to the code.

To build the application for production, run the following command:

`yarn run build`


This will compile the TypeScript code into JavaScript and output it to the `dist` directory.

## API Reference

The Recipe API has the following GraphQL operations:

- `getRecipes`: Returns a list of all recipes.
- `getRecipe(id: ID!)`: Returns the recipe with the specified ID.
- `createRecipe(input: RecipeInput!)`: Creates a new recipe with the specified input data.
- `updateRecipe(id: ID!, input: RecipeInput!)`: Updates the recipe with the specified ID with the new input data.
- `deleteRecipe(id: ID!)`: Deletes the recipe with the specified ID.

## Contributing

Contributions to this project are welcome. To contribute, please follow these steps:

1. Fork this repository.
2. Create a new branch with your changes.
3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your fork.
5. Submit a pull request to this repository.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
