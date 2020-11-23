# The Internet Wishlist
A suggestion box for the future of technology

## Things I learned from this project
- In order for a `<a>` element to be able to be focused on (tabbable) it needs to have the `href` attribute set
- A debounce function that is used within a functional component in React will only work if it is wrapped in `React.useCallback()` (see [here](https://stackoverflow.com/a/55616626))
- To add a margin-top to only wrapped items within a flexbox, set the margin-top of the container to a negative value equal to the margin-top of the items within the flexbox (see [here](https://stackoverflow.com/a/30891910))
- Using the cors library is not necessary for setting headers on the server. Can be done through Apollo Server options directly (sometimes the cors library stuffs up the cookie setting header as well for some reason)
- The [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined