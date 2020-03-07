module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "allow": ["log", "warn", "error"],
      "allow": ["foo_", "_bar"],
      "allowAfterThis": true,
      "allowAfterSuper": true,
      "allowAfterThisConstructor": true,
      "enforceInMethodNames": false
    }
};