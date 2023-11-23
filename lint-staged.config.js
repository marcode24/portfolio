export default {
  '*.{js,jsx,ts,tsx,astro}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run build-types',
};
