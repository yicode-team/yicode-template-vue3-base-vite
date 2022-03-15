import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImportVite from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy';
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true,
            refTransform: true
        }),
        AutoImportVite({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            imports: [
                // presets
                'vue',
                'vue-router',
                // custom
                {
                    '@vueuse/core': [
                        // named imports
                        'useMouse', // import { useMouse } from '@vueuse/core',
                        // alias
                        ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
                    ],
                    axios: [
                        // default imports
                        ['default', 'axios'] // import { default as axios } from 'axios',
                    ],
                    '[package-name]': [
                        '[import-names]',
                        // alias
                        ['[from]', '[alias]']
                    ]
                }
            ]
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        Pages()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
