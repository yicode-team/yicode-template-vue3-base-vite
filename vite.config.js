import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Unocss from 'unocss/vite';
import {
    //
    presetUno,
    presetMini,
    presetWind,
    presetAttributify,
    presetIcons,
    presetWebFonts,
    presetTypography
} from 'unocss';

export default defineConfig({
    plugins: [
        //
        vue({
            reactivityTransform: true
        }),
        Pages(),
        Layouts(),
        Icons({}),
        Unocss({
            presets: [
                //
                presetUno(),
                presetMini(),
                presetWind(),
                presetAttributify(),
                presetIcons(),
                presetWebFonts(),
                presetTypography()
            ]
        }),
        AutoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
            imports: ['vue', '@vueuse/core'],
            dirs: ['./src/hooks'],
            vueTemplate: true
        }),
        Components({
            directoryAsNamespace: true,
            resolvers: [
                //
                IconsResolver()
            ]
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/variable.scss" as *;`
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    envDir: './env'
});
