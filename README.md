## Development

```
npm run dev
```

## Production

```
npm run build
```

Once the build is finished, you will find a folder called `dist` at the project's root containing the 'modern' and 'legacy' assets.

Then you could run `npm run serve` to view the app in a browser. Compare IE11 and modern browser.

## Credits

- https://github.com/firsttris/html-webpack-multi-build-plugin - a plugin that enable access to manifest of modern & legacy scripts in 'index.html'
- https://jasonformat.com/modern-script-loading/#option1loaddynamically - good summary of all different approaches to differential serving
- https://calendar.perfplanet.com/2018/doing-differential-serving-in-2019/ - its babel.config.js method was brilliant
- https://github.com/nystudio107/annotated-webpack-4-config - learned structuring webpack configs here
