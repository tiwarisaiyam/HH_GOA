
const FALLBACK_TITLES = [
  "DEPLOYMENT DEMON",
  "DEBUGGING BANDIT",
  "COASTLINE COMMITTER",
  "PARADISE PUSHER",
  "SYNTAX OUTLAW",
  "404 RENEGADE",
  "TRANSFORMER TAMER",
  "PIPELINE PIRATE",
  "CODE GOBLIN",
  "RUNTIME ROGUE TAMER",
  "ISLAND ARCHITECT"
];

function simpleHash(str) {
  let hash = 0;
  if (!str || str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  return Math.abs(hash);
}

export function getRandomTitle(seedString = '') {
  const seed = seedString ? simpleHash(seedString) : Math.floor(Math.random() * 1000);
  const index = seed % FALLBACK_TITLES.length;
  return FALLBACK_TITLES[index];
}

export function generateTitleFromStack(stack) {
  if (!stack || stack.trim() === '') return "BIG BUILDER";

  const lowerStack = stack.toLowerCase();

  if (lowerStack.includes('react') || lowerStack.includes('vue') || lowerStack.includes('ui') || lowerStack.includes('front')) {
    return 'PIXEL PUSHER';
  } else if (lowerStack.includes('python') || lowerStack.includes('ai') || lowerStack.includes('ml') || lowerStack.includes('model') || lowerStack.includes('data')) {
    return 'MODEL WHISPERER';
  } else if (lowerStack.includes('solidity') || lowerStack.includes('web3') || lowerStack.includes('crypto') || lowerStack.includes('chain')) {
    return 'CHAIN ARCHITECT';
  } else if (lowerStack.includes('node') || lowerStack.includes('back') || lowerStack.includes('api') || lowerStack.includes('server')) {
    return 'API ALCHEMIST';
  } else if (lowerStack.includes('devops') || lowerStack.includes('deploy') || lowerStack.includes('infra') || lowerStack.includes('cloud')) {
    return 'DEPLOYMENT COMMANDER';
  } else if (lowerStack.includes('sec') || lowerStack.includes('audit') || lowerStack.includes('bug')) {
    return 'BUG HUNTER';
  }

  return getRandomTitle(lowerStack);
}