const { FuseBox, SassPlugin, CSSPlugin, WebIndexPlugin, EnvPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, context, bumpVersion } = require("fuse-box/sparky");

//load all fusebox stuff, not showing here
const { TypeChecker } = require('fuse-box-typechecker');



task("publish", async context => {
    // await context.clean(); 
    await context.publish();
});

task("watch", async context => {
    // await context.clean(); 
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
                // this.isProduction && WebIndexPlugin(),
                this.isProduction && QuantumPlugin({
                    css: true,
                    uglify: { es6: true },
                    bakeApiIntoBundle: "bundle",
                }),
                WebIndexPlugin({
                    template: "public/templates/index-template.html",
                    path: "dist/",
                    target: "../index.html",
                    // cssPath: "css/"
                }),
            ]

            return FuseBox.init({
                homeDir: "src",
                target: "browser@es5",
                useTypescriptCompiler: true,
                output: "public/dist/$name.js",
                sourceMaps: !this.isProduction,
                dynamicImportsEnabled: true,
                log: {
                    showBundledFiles: false, // Don't list all the bundled files every time we bundle
                    clearTerminalOnBundle: false, // Clear the terminal window every time we bundle
                },
                plugins,
                hash: this.isProduction,
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
                .dest("dist/")
                .exec();
        }

        publish() {
            this.isProduction = true;
            const fuse = this.getConfig();
            this.clean();

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
            const fuse = this.getConfig();
            this.isProduction = false;

            fuse.dev({
                root: "public/",
                fallback: "index.html",
                port: 4444,
                httpServer: true,
            });

            this.clean().then((res) => {
                fuse
                    .bundle("server/server_bundle")
                    .instructions(" > [server/index.tsx]")
                    .watch("server/**")
                    .completed(proc => proc.start());

                fuse
                    .bundle("client/bundle")
                    .instructions(" > client/index.tsx")
                    .hmr()
                    .watch("client/**")
                    .completed((e) => {
                        runTypeChecker();
                    });
                return fuse.run();
            });


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
