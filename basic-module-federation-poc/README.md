# Modules Federation POC
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

## Challanges & TODOs
- [ ] Support CSP nonces (Our gateway setup)
- [ ] Support TS Types when consuming exposed components
- [ ] Support utility libraries
- [ ] Support NPM packages and versioning
