import { readdir, readFile } from 'fs/promises';
import { statSync } from 'fs';
import { createPluginError } from './errors';

// .spout/core/plugins
// ../../internal/plugins

const listInternalFiles = (dir = './.spout/internal/plugins') => readdir(dir)
    .then(i => i.map(file => file));
const isDir = (file: string, dir = './.spout/internal/plugins') => statSync(`${dir}/${file}`).isDirectory();

const listInternalPlugins = () => listInternalFiles().then(files => files.filter(i => isDir(i)));

export const loadPlugin = async (file: string, internal: boolean) => {
    console.log(`[SPOUT] Plugin Loader - Loading${internal ? ' internal' : ''} plugin at ${file}`);
    const text = await readFile(`./.spout/internal/plugins/${file}/config.json`, "utf-8")
    console.log(`You.png [${text}]`);
    const config = JSON.parse(text);
    // Corman TODO: fix dis kthx
    try {
        require(`../../../internal/plugins/map/index`);
    } catch (e) {
        createPluginError(`../../../internal/plugins/${file}/`, e, internal);
    }
}

export const loadInternalPlugins = async () => {
    for (const file of await listInternalPlugins()) {
        loadPlugin(file, true);
    }
};