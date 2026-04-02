const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Backgrounds (Dark Orange -> Creamy/Light Orange)
    content = content.replace(/#0f0500/g, '#fffcf8');   // Deepest background to very light cream (orange-50)
    content = content.replace(/#180a06/g, '#fff7ed');   // Panels
    content = content.replace(/#25100c/g, '#ffedd5');   // Hover panels
    content = content.replace(/#1e0c08/g, '#fff7ed');   
    content = content.replace(/#1a0f0c/g, '#fffcf8');   
    content = content.replace(/#160d0a/g, '#fffaf5');   
    content = content.replace(/#160a08/g, '#fffaf5');   
    content = content.replace(/bg-\[#0[A-Fa-f0-9]{5}\]/gi, 'bg-orange-50');

    // RGBA backgrounds
    content = content.replace(/rgba\(40, 20, 10,/g, 'rgba(255, 243, 224,');
    content = content.replace(/rgba\(30, 14, 5,/g, 'rgba(255, 250, 245,');
    content = content.replace(/rgba\(28, 12, 5,/g, 'rgba(255, 248, 240,');
    content = content.replace(/rgba\(20, 8, 2,/g, 'rgba(255, 253, 250,');
    
    // Switch dark orange specific overrides to light creamy variants
    content = content.replace(/bg-orange-950\/20/g, 'bg-orange-100');
    content = content.replace(/bg-orange-950\/50/g, 'bg-orange-100/50');
    content = content.replace(/bg-orange-950/g, 'bg-white');

    // Text colors (Light -> Dark for readability on cream backgrounds)
    content = content.replace(/text-orange-50\b(?!0)/g, 'text-orange-950');
    content = content.replace(/text-orange-100\b/g, 'text-orange-900');
    content = content.replace(/text-orange-200\b/g, 'text-orange-800');
    content = content.replace(/text-orange-400\/80/g, 'text-orange-800');
    content = content.replace(/text-orange-400\/60/g, 'text-orange-700');
    content = content.replace(/text-orange-400\/40/g, 'text-orange-600');
    
    // Generic text-white becomes dark on creamy bg, UNLESS it's on a bright primary/orange button
    content = content.replace(/text-white/g, 'text-slate-900');
    // Revert inside primary colored panels/buttons
    content = content.replace(/(bg-orange-[56]00[a-zA-Z0-9\/\s\-]*?)text-slate-900/g, '$1text-white');
    content = content.replace(/text-slate-900(?=\s+bg-orange-[56]00)/g, 'text-white');
    content = content.replace(/(bg-gradient-to-[a-z]+\s+from-orange-400\s+to-orange-600[a-zA-Z0-9\/\s\-]*?)text-slate-900/g, '$1text-white');
    content = content.replace(/(bg-gradient-to-[a-z]+\s+from-orange-500\s+to-orange-600[a-zA-Z0-9\/\s\-]*?)text-slate-900/g, '$1text-white');
    
    // Explicitly revert some icons that got matched with text-white previously
    content = content.replace(/className="h-5 w-5 text-slate-900"/g, 'className="h-5 w-5 text-orange-50"');

    // Borders (Dark -> Light/Orange)
    content = content.replace(/border-orange-500\/20/g, 'border-orange-200');
    content = content.replace(/border-orange-500\/30/g, 'border-orange-300');
    content = content.replace(/border-orange-400\/20/g, 'border-orange-200');
    content = content.replace(/border-white\/(5|10|20)/g, 'border-orange-800/10');
    content = content.replace(/border-white\/\[0\.04\]/g, 'border-orange-800/5');
    content = content.replace(/border-white\/\[0\.06\]/g, 'border-orange-800/10');
    
    // Background overlays that were previously white/[0.04] (transparent white on dark)
    content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-white');
    content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-white');
    content = content.replace(/bg-white\/\[0\.04\]/g, 'bg-white');
    content = content.replace(/bg-white\/5(?!0)/g, 'bg-orange-800/5');
    content = content.replace(/bg-white\/10/g, 'bg-orange-800/10');

    // Now replacing "Secondary color" blue -> creamy secondary
    content = content.replace(/bg-blue-100/g, 'bg-orange-100');
    content = content.replace(/text-blue-700/g, 'text-orange-700');
    content = content.replace(/bg-blue-50(?!0)/g, 'bg-orange-50');
    content = content.replace(/border-blue-100/g, 'border-orange-100');
    content = content.replace(/hover:bg-blue-100/g, 'hover:bg-orange-100');
    
    // If there were any leftover blue or amber (from "secondary blue" replacements earlier)
    content = content.replace(/text-blue-500/g, 'text-amber-600');
    content = content.replace(/text-blue-400/g, 'text-amber-500');
    content = content.replace(/text-blue-300/g, 'text-amber-400');
    content = content.replace(/text-blue-600/g, 'text-amber-600');
    content = content.replace(/bg-blue-400/g, 'bg-amber-400');
    content = content.replace(/bg-blue-500/g, 'bg-amber-500');
    content = content.replace(/bg-blue-600/g, 'bg-amber-600');
    content = content.replace(/from-blue-400/g, 'from-amber-400');
    content = content.replace(/to-blue-500/g, 'to-amber-500');
    content = content.replace(/rgba\(96,165,250/g, 'rgba(253,230,138'); // amber-200ish
    
    // Other touchups
    content = content.replace(/bg-\[\#0c1025\]/g, 'bg-orange-50'); // popups
    content = content.replace(/shadow-black\/50/g, 'shadow-orange-900/10');
    content = content.replace(/shadow-black/g, 'shadow-orange-900/10');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated: " + filePath);
    }
}

function traverse(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    }
}

traverse(path.join(__dirname, 'app', 'login'));
traverse(path.join(__dirname, 'app', '(admin)'));
console.log("Colors transformed to creamy light theme!");
