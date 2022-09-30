const pluralize = (input, quantity = 0, override = '') => {
  if (!input) {
    throw new Error('Function "pluralize()" called with no text input.');
  } else if (quantity === 1) {
    return input;
  } else if (override) {
    return override;
  }

  return `${input}s`;
};

export const StringUtils = {
  pluralize,
}