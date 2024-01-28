export default {
  '*.{js,jsx,astro}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run build-types',
};
