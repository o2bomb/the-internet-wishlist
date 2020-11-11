# The Internet Wishlist
A suggestion box for the future of technology

## Things I learned from this project
- In order for a `<a>` element to be able to be focused on (tabbable) it needs to have the `href` attribute set
- A debounce function that is used within a functional component in React will only work if it is wrapped in `React.useCallback()` (see [here](https://stackoverflow.com/a/55616626))
- Using the cors library is not necessary for setting headers on the server. Can be done through Apollo Server options directly (sometimes the cors library stuffs up the cookie setting header as well for some reason)