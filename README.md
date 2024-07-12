# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Setting Up Environment Variables

To run this project, you need to set up environment variables. Follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Add the following environment variables to the `.env` file:

REACT_APP_MARVEL_PUBLIC_KEY=your_public_key
REACT_APP_MARVEL_PRIVATE_KEY=your_private_key
REACT_APP_API_URL=http://gateway.marvel.com/v1/public

Replace `your_public_key` and `your_private_key` with your actual Marvel API public and private keys.

## Project Structure and Design (Atomic Design)

This project follows the Atomic Design methodology. Atomic Design is a methodology for creating design systems that decompose the user interface into smaller, reusable components. These components are categorized into five distinct levels:

1. **Atoms**: The basic building blocks of matter, such as buttons, inputs, and labels. These are the smallest components.
2. **Molecules**: Groups of atoms bonded together and functioning as a unit. For example, a form label, input, and button together form a search bar.
3. **Organisms**: Groups of molecules joined together to form a distinct section of an interface, such as a header or a form.
4. **Pages**: Specific instances of templates that show what a UI looks like with real content in place.

### Directory Structure

The directory structure of this project is organized as follows:

src/
|-- assets/ # Static assets like images, icons, etc.
|-- components/ # Reusable components
| |-- atoms/ # Atoms components
| | |-- ATImage/ # Example of an atom: Image component
| |-- molecules/ # Molecules components
| | |-- MLSearchBar/ # Example of a molecule: SearchBar component
| |-- organisms/ # Organisms components
| | |-- ORHeader/ # Example of an organism: Header component
|-- contexts/ # React context for state management
|-- pages/ # Page components
| |-- CharacterListPage/ # Character list page
| |-- CharacterDetailPage/ # Character detail page
| |-- FavoritesPage/ # Favorites page
|-- services/ # API service files
|-- types/ # TypeScript types
|-- tests/ # Test files mirroring the components structure
| |-- components/ # Test files for components
| | |-- atoms/ # Atoms components tests
| | | |-- ATImage.test.tsx # Test file for ATImage component
| | |-- molecules/ # Molecules components tests
| | | |-- MLSearchBar.test.tsx # Test file for MLSearchBar component
| | |-- organisms/ # Organisms components tests
| | | |-- ORHeader.test.tsx # Test file for ORHeader component
| |-- pages/ # Test files for pages
| | |-- CharacterListPage.test.tsx # Test file for CharacterListPage component
| | |-- CharacterDetailPage.test.tsx # Test file for CharacterDetailPage component
| | |-- FavoritesPage.test.tsx # Test file for FavoritesPage component
|-- App.tsx # Main App component
|-- index.tsx # Main entry point
|-- setupTests.ts # Setup for tests
|-- ... # Other configuration files

By organizing the project in this way, we ensure that our components are reusable and maintainable, following best practices in modern front-end development.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.
