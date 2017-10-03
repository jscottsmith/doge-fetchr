# Doge Fetchr

This React/Redux app fetches a single random image for each selected dog breed from the [dog.ceo](https://dog.ceo/).

[Demo](https://jscottsmith.github.io/doge-fetchr/dist/)

## Highlights

- React for the view layer, duh 👻
- Webpack for bundling. Babel for ES6+
- Redux to manage `app` and `requests` states.
- Atomic design for component organization: `atoms`, `molecules`, `organisms` and `environments`. 
- `containers` for store connected components.
- All presentation components are organized in folders with their associated styles.
- Styling is done with `scss` using CSS Modules for component name spaced classes and for declaring global styles.
- Created a `<Fetch>` component to handle all requests to the API. This component takes an `endpoint` and on mount dispatches an action to make a fetch request to the API. On success the request and result is returned to the store in the `requests` reducer. If the same request is made later the cached version of the result will be returned. `<Fetch>` then uses a render callback to pass the resulting request data to any wrapped component. See the `<AppContainer>` for example usage.
- Created a `<Select>` component to handle all dropdown UI. It's accessible with `aria` tags and keyboard accessibility (tab, arrow keys, etc.).
- `<BreedSelector/>` handles the user input of selecting breed. After a selection is made it is filtered from the remaining lists.
- Once all dropdowns have selected values, the `<BreedFetcher>` mounts new `<Fetch>` components that display `<Loaders>` for each request being made. Once complete resulting data is displayed in a `<BreedImage>` component.

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
