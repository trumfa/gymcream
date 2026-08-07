import fs from 'node:fs';

const filePath = 'node_modules/@astrojs/vercel/dist/serverless/adapter.js';

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add Node 22 support
    content = content.replace(
        /const SUPPORTED_NODE_VERSIONS = \{[\s\S]*?\};/,
        `const SUPPORTED_NODE_VERSIONS = {
    18: { status: 'default' },
    20: { status: 'default' },
    22: { status: 'default' }
};`
    );

    // Replace fallback return 'nodejs18.x' with 'nodejs22.x'
    content = content.replaceAll("'nodejs18.x'", "'nodejs22.x'");

    fs.writeFileSync(filePath, content);
    console.log('[patch-vercel] Successfully patched @astrojs/vercel adapter for Node.js 22');
}
