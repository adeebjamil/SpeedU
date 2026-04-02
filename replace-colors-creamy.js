const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Backgrounds (Dark Orange -> Creamy/Light Orange)
    content = content.replace(/#0f0500/g, '#fffaf5');   // Deepest background to very light cream
    content = content.replace(/#180a06/g, '#fff3e0');   // Panels
    content = content.replace(/#25100c/g, '#ffe0b2');   // Hover panels
    content = content.replace(/#1e0c08/g, '#fff3e0');   
    content = content.replace(/#1a0f0c/g, '#fffaf5');   
    content = content.replace(/#160d0a/g, '#fff8f0');   
    content = content.replace(/#160a08/g, '#fff8f0');   

    content = content.replace(/rgba\(40, 20, 10,/g, 'rgba(255, 243, 224,');
    content = content.replace(/rgba\(30, 14, 5,/g, 'rgba(255, 250, 245,');
    content = content.replace(/rgba\(28, 12, 5,/g, 'rgba(255, 248, 240,');
    content = content.replace(/rgba\(20, 8, 2,/g, 'rgba(255, 253, 250,');
    
    content = content.replace(/bg-orange-950\/20/g, 'bg-orange-50');
    content = content.replace(/bg-orange-950(\/[0-9]+)?/g, 'bg-orange-100$1');

    // Text colors (Light -> Dark for readability on cream backgrounds)
    content = content.replace(/text-orange-50\b(?!0)/g, 'text-orange-950');
    content = content.replace(/text-orange-100\b/g, 'text-orange-900');
    // For text-slate-xxx that I changed to orange-400/80 etc.:
    content = content.replace(/text-orange-400\/80/g, 'text-orange-800');
    content = content.replace(/text-orange-400\/60/g, 'text-orange-700');
    content = content.replace(/text-orange-400\/40/g, 'text-orange-600');
    
    // We want to flip text-white to dark text, EXCEPT when it's inside a primary colored button/badge
    // It's safer to just replace general `text-white` with `text-orange-950` and then fix up buttons.
    // Actually, `text-white` might be heavily used inside buttons. Let's be careful.
    // A better approach: replace `text-white` with `text-orange-950` if it's accompanied by `text-[...`, `font-...` out of buttons.
    // Let's manually replace specific known instances if we can, or just leave `text-white` inside buttons and replace others.
    content = content.replace(/text-white(?!\s+shadow)/g, 'text-orange-950');
    // Revert text-white for known buttons
    content = content.replace(/text-orange-950(\s+bg-orange-[56]00)/g, 'text-white$1');
    content = content.replace(/(bg-orange-[56]00\s+)text-orange-950/g, '$1text-white');
    content = content.replace(/(bg-gradient-to-[a-z]+\s+from-orange-400\s+to-orange-600[a-z0-9\s-]*?)text-orange-950/g, '$1text-white');
    content = content.replace(/(bg-gradient-to-[a-z]+\s+from-orange-500\s+to-orange-600[a-z0-9\s-]*?)text-orange-950/g, '$1text-white');

    // Borders (Dark -> Light/Orange)
    content = content.replace(/border-orange-500\/20/g, 'border-orange-200');
    content = content.replace(/border-orange-500\/30/g, 'border-orange-300');
    content = content.replace(/border-orange-400\/20/g, 'border-orange-200');
    content = content.replace(/border-white\/(5|10|20)/g, 'border-orange-900/10');
    
    // Secondary Color "Creamy" accents where blue was used 
    // The user wants primary = orange, secondary = creamy.
    // Previously we set `blue-400`/`blue-500` to be the secondary color replacing amber.
    // Let's replace the leftover `blue-xxx` (that we made blue) -> `orange-200` or `amber-100` (creamy).
    content = content.replace(/bg-blue-100/g, 'bg-orange-100');
    content = content.replace(/text-blue-700/g, 'text-orange-700');
    content = content.replace(/bg-blue-50(?!0)/g, 'bg-orange-50');
    content = content.replace(/border-blue-100/g, 'border-orange-100');
    content = content.replace(/hover:bg-blue-100/g, 'hover:bg-orange-100');
    content = content.replace(/text-blue-500/g, 'text-amber-600');
    content = content.replace(/text-blue-400/g, 'text-amber-500');
    content = content.replace(/text-blue-300/g, 'text-amber-400');
    content = content.replace(/bg-blue-400/g, 'bg-amber-400');
    content = content.replace(/bg-blue-500/g, 'bg-amber-500');
    content = content.replace(/from-blue-400/g, 'from-amber-400');
    content = content.replace(/to-blue-500/g, 'to-amber-500');
    content = content.replace(/rgba\(96,165,250/g, 'rgba(253,230,138'); // amber-200ish
    
    // Other dark themes:
    content = content.replace(/bg-white\/5/g, 'bg-orange-900/5');
    content = content.replace(/bg-white\/10/g, 'bg-orange-900/10');

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
console.log("Colors transformed to light/creamy theme!");
