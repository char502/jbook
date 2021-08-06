import * as esbuild from 'esbuild-wasm';

import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (enteredInput: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // The regular expression ensures that in onLoad function is only going 
      // to be used when the file that we're trying to find/file trying to load
      // matches that regular expression (i.e. it's exact name has to be index.js)
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: enteredInput
        };
      });

    build.onLoad({ filter: /.*/ }, async (args: any) => {
      // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }




      })



      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
        // args.path is the full path to the file that are attempting to fetch
        const { data, request } = await axios.get(args.path);

        // this will look for .css at the very end of the string
        // const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      })


      
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        
        // args.path is the full path to the file that are attempting to fetch
        const { data, request } = await axios.get(args.path);


        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  };
};
