export function kebabToCamel(str) {
  return str.replace(/-./g, x => x[1].toUpperCase());
}

export function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
