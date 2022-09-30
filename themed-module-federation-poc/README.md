# Themes Modules Federation POC
This is a demo of two independent repos sharing components between each other using [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/).

## Installation
```
cd payeq-repo
npm install
npm start
```

Visit: http://localhost:5150/

```
cd oppeq-repo
npm install
npm start
```

Visit: http://localhost:2112/

## Features
- [x] Shared core libraries such as React and React DOM

## Challanges & TODOs
- [ ] Support CSP nonces (Our gateway setup)
- [ ] Support TS Types when consuming exposed components
- [ ] Have to use local React for TS types till TS Types is supported
- [ ] Support utility libraries
- [ ] Support NPM packages and versioning

## Trade offs
* Had to eject in order to use a recent version of React & PostCSS
* Shared components using TailwindCSS must @apply ALL styles in a CSS file. No inline Tailwind styles!