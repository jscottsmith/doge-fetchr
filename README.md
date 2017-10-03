# Doge Fetchr

This React/Redux app fetches a single random image for each selected dog breed from the [dog.ceo](https://dog.ceo/).

[Demo](https://jscottsmith.github.io/doge-fetchr/dist/)

## Highlights

- React for the view layer, duh 👻
- Mobile first responsive layout
- Webpack for bundling. Babel for ES6+
- [Prettier](https://github.com/prettier/prettier) and Eslint for code formatting/linting.  
- Redux to manage `app` and `requests` states.
- [Atomic design](http://bradfrost.com/blog/post/atomic-web-design/) for component organization: `atoms`, `molecules`, `organisms` and `environments`. 
- `containers` for store connected components.
- All presentation components are organized in folders with their associated styles.
- Styling is done with `scss` using CSS Modules for component name spaced classes and for declaring global styles.
- Created a [`<Fetch>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/common/Fetch.js) component to handle all requests to the API. This component takes an `endpoint` and on mount dispatches an action to make a fetch request to the API. On success the request and result is returned to the store in the [`requests`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/reducers/requests.js) reducer. If the same request is made later the cached version of the result will be returned. `<Fetch>` then uses a render callback to pass the resulting request data to any wrapped component. See the [`<AppContainer>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/containers/AppContainer/AppContainer.js) for example usage.
- Created a [`<Select>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/atoms/Select/Select.js) component to handle all dropdown UI. It's accessible with `aria` tags and keyboard accessibility (tab, arrow keys, etc.).
- [`<BreedSelector/>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/organisms/BreedSelector/BreedSelector.js) handles the user input of selecting breed. After a selection is made it is filtered from the remaining lists.
- Once all dropdowns have selected values, the [`<BreedFetcher>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/organisms/BreedFetcher/BreedFetcher.js) mounts new `<Fetch>` components that displays a [`<Loader>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/atoms/Loader/Loader.js) for each request being made. Once complete resulting data is displayed in a [`<BreedImage>`](https://github.com/jscottsmith/doge-fetchr/blob/master/src/components/molecules/BreedImage/BreedImage.js) component.

[API reference](https://dog.ceo/dog-api/)

## Getting Started

Install dependencies:

```
yarn install
```

Run the webpack dev server:

```
yarn start
```

Open a browser @ [localhost:3000](http://localhost:3000/)
