const { http, FuseBox, SassPlugin, CSSPlugin, WebIndexPlugin, EnvPlugin, QuantumPlugin, JSONPlugin } = require("fuse-box");
const { src, task, context, bumpVersion } = require("fuse-box/sparky");

//load all fusebox stuff, not showing here
const { TypeChecker } = require('fuse-box-typechecker');



task("publish", async context => {
    await context.clean();
    await context.publish();
});

task("watch", async context => {
    await context.clean();
    await context.watch();
})

context(
    class {
        getConfig() {
            let plugins = [
                [
                    SassPlugin({
                        outputStyle: this.isProduction && "compressed",
                    }),
                    CSSPlugin({
                        outFile: file => "public/css/" + file,
                        inject: file => `css/${file}`,
                    }),

                ],
                JSONPlugin(),
                EnvPlugin(
                    {
                        NODE_ENV: this.isProduction ? "production" : "development",
                        FB_CONFIG: {
                            apiKey: "AIzaSyCBqto9Am0yJYXC3PCen6s0G3krVoW1Pbk",
                            authDomain: "g-net-cf48e.firebaseapp.com",
                            databaseURL: "https://g-net-cf48e.firebaseio.com",
                            projectId: "g-net-cf48e",
                            storageBucket: "g-net-cf48e.appspot.com",
                            messagingSenderId: "964354863726",
                            appId: "1:964354863726:web:a0bcb9fd0cd35fdb9a2c7f",
                            measurementId: "G-BQY9QM4ZZF"
                        }
                    }),
                this.isProduction && QuantumPlugin({
                    css: true,
                    uglify: { es6: true },
                    bakeApiIntoBundle: "bundle",
                }),
                // this.isProduction && WebIndexPlugin({
                //     template: "public/templates/index-template.html",
                //     path: "dist/",
                //     target: "../index.html",
                //     // cssPath: "css/"
                // }),
            ]

            return FuseBox.init({
                homeDir: "src/",
                output: "public/dist/$name.js",
                target: "browser@es5",
                useTypescriptCompiler: true,
                // sourceMaps: !this.isProduction,
                dynamicImportsEnabled: true,
                log: {
                    showBundledFiles: false, // Don't list all the bundled files every time we bundle
                    clearTerminalOnBundle: false, // Clear the terminal window every time we bundle
                },
                plugins,
                hash: this.isProduction,
                natives: {
                    // process: false,
                    // http: false
                },
                allowSyntheticDefaultImports: true,
            });
        }

        async clean() {
            await new Promise((res, rej) => {
                res(src("./public/dist")
                    .clean("public/dist/")
                    .exec());
            })
        }

        async prepareDistFolder() {
            await bumpVersion("package.json", { type: "patch" });
            await src("./package.json")
                .dest("public/")
                .exec();
        }

        publish() {
            this.isProduction = true;
            const fuse = this.getConfig();

            fuse.dev({
                root: "public/",
                fallback: "index.html",
            });

            fuse
                .bundle("bundle")
                .instructions(" > client/index.tsx")
            return fuse.run();
        }

        watch() {
            this.isProduction = false;
            const fuse = this.getConfig();

            fuse.dev({
                port: 4444,
                httpServer: false,
            });

            // fuse
            //     .bundle("vendor/vendor")
            //     .watch()
            //     .hmr()
            //     .instructions(" ~ ./index.tsx")

            // this.clean().then((res) => {
            fuse
                .bundle("server/bundle")
                .watch("server/**")
                .instructions(" > [server/index.tsx]")
                .completed(proc => proc.start());
            fuse
                .bundle("client/app")
                .watch("client/**")
                .hmr()
                .instructions(" > client/index.tsx")
                .completed((e) => {
                    runTypeChecker();
                });

            fuse.run();
            // });
        }
    }
)

// get typechecker 
const typechecker = TypeChecker({
    tsConfig: './tsconfig.json',
    name: 'src/client/',
    basePath: './',
    yellowOnLint: true,
    shortenFilenames: true
});

// create thread
typechecker.startTreadAndWait();


let runTypeChecker = () => {
    // same color..
    console.log(`\x1b[36m%s\x1b[0m`, `app bundled- running type check`);

    //use thread, tell it to typecheck and print result
    typechecker.useThreadAndTypecheck();

}
