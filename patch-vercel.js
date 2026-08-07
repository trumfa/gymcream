import fs from 'node:fs';

const filePath = 'node_modules/@astrojs/vercel/dist/serverless/adapter.js';

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace getRuntime function completely so Node 22 builds cleanly and outputs nodejs20.x for Vercel
    content = content.replace(
        /function getRuntime\(process, logger\) \{[\s\S]*?\n\}/,
        `function getRuntime(process, logger) {
    return 'nodejs20.x';
}`
    );

    fs.writeFileSync(filePath, content);
    console.log('[patch-vercel] Successfully patched @astrojs/vercel adapter to always return nodejs20.x');
}
