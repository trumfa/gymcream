import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const STORE_PATHS = [
  path.resolve(process.cwd(), 'cms_store.json'),
  path.resolve(os.tmpdir(), 'cms_store.json')
];

let memoryStore: Record<string, any> = {};

export function loadCmsStore(): Record<string, any> {
  for (const storePath of STORE_PATHS) {
    try {
      if (fs.existsSync(storePath)) {
        const content = fs.readFileSync(storePath, 'utf-8');
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed === 'object') {
          memoryStore = { ...memoryStore, ...parsed };
        }
      }
    } catch (e) {
      console.warn(`[CMS Store] Read warning for ${storePath}:`, e);
    }
  }
  return memoryStore;
}

export function saveCmsStore(newData: Record<string, any>): Record<string, any> {
  memoryStore = { ...memoryStore, ...newData, updatedAt: new Date().toISOString() };
  const jsonString = JSON.stringify(memoryStore, null, 2);

  for (const storePath of STORE_PATHS) {
    try {
      fs.writeFileSync(storePath, jsonString, 'utf-8');
    } catch (e) {
      console.warn(`[CMS Store] Write warning for ${storePath}:`, e);
    }
  }

  return memoryStore;
}
