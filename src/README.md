#The theme

Example theme starting point with [underscores](https://github.com/Automattic/_s)

You can easily change the theme to something of your own.
I'm using a variation of the _s theme here just to get something going.

The only thing that is required is that the standard 'style.css' is removed (style.css will be generated for build/dist later on).

The 'style' and 'scripts' folders should be kept as they are. Webpack will be looking into these to folders for some Sass and ES6 goodness.

##Webapack

Webpack will output a 'bundle.js' + 'style.css' to the project root. These files are referenced via 'functions.php'.
