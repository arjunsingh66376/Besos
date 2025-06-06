// summarizeProducts.js

import { buds } from './Buds';
import { mouse } from './Mouse';
import { laptop } from './Laptop';
import { smartwatch } from './Smartwatch';
import { television } from './Television';

function summarizeItem(item) {
  return `${item.name} (${item.brandname}) - ₹${item.price}: ${item.details.slice(0, 100)}...`;
}

function createCategoryPrompt(name, items) {
  return `\n\nCategory: ${name}\n` + items.map((item, i) => `${i + 1}. ${summarizeItem(item)}`).join('\n');
}

export const systemPrompt = `
You are a smart voice-enabled shopping assistant.

Use the following catalog to suggest and compare products for users.
Show matching products with brand and price info.

${createCategoryPrompt("Buds", buds)}
${createCategoryPrompt("Mouse", mouse)}
${createCategoryPrompt("Laptops", laptop)}
${createCategoryPrompt("Watches", smartwatch)}
${createCategoryPrompt("Television", television)}
`.trim();
