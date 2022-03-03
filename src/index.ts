
import {Plugin} from '@yarnpkg/core';
import {Hooks} from "@yarnpkg/core/lib/Plugin";
import Require = NodeJS.Require;

const EnableGlobalProxyEnvironmentVariable: string = "EnableGlobalProxyEnvironmentVariable"

const quotePathIfNeeded = (path: string) => {
  return /\s/.test(path) ? JSON.stringify(path) : path;
};
interface PluginFactory {
  name: string,
  factory: (require: Require) => Plugin<Hooks>
}

if(globalThis.process != undefined && globalThis.process.env[EnableGlobalProxyEnvironmentVariable]){
  const {bootstrap} = require('global-agent');
  bootstrap();
}

const pluginFactory: PluginFactory = {
  name: "@ArTs/plugin-http-proxy",
  factory: function (){
    return {
      hooks: {
          wrapScriptExecution: async function(executor, project, locator, scriptName, {env}) {
          return async () => {
              let nodeOptions = env.NODE_OPTIONS || ``;
              let pnpRequire = `--require ${quotePathIfNeeded(__filename)}`;
              nodeOptions = nodeOptions ? `${pnpRequire} ${nodeOptions}` : pnpRequire;
              env.NODE_OPTIONS = nodeOptions;

              env[EnableGlobalProxyEnvironmentVariable] = "true";
              env.GLOBAL_AGENT_ENVIRONMENT_VARIABLE_NAMESPACE = "";

              return await executor();
          };
        }
      }
    }
  }
}

module.exports = pluginFactory;