module.exports = {
  '{src,test}/**/*.ts': 'prettier --write',
  '{src,apps,libs,test}/**/*.ts': () => 'tsc --project tsconfig.json --noEmit',
  '{src,apps,libs,test}/**/*.ts': ['eslint --fix --color --max-warnings=0'],
}
