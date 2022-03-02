# yarn-plugin-http-proxy

This is a yarn plug in that will run `global-agent\bootstrap` during script execution.

This allows yarn to run dependency `postinstall` scripts which download binaries in a corporate environment.

## Install:
To install run `yarn plugin import https://github.com/arontsang/yarn-plugin-http-proxy/releases/latest/download/index.cjs`.

## Usage:
To install a package run `HTTP_PROXY=${PROXY_ADDRESS} HTTPS_PROXY=${PROXY_ADDRESS} yarn add ${PACKAGE_NAME}`
