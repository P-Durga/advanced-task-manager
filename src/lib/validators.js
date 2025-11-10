// Input validation utilities

export const validators = {
  required: (value, fieldName = 'Field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      throw new Error(`${fieldName} is required`);
    }
    return true;
  },

  minLength: (value, min, fieldName = 'Field') => {
    if (value.length < min) {
      throw new Error(`${fieldName} must be at least ${min} characters`);
    }
    return true;
  },

  maxLength: (value, max, fieldName = 'Field') => {
    if (value.length > max) {
      throw new Error(`${fieldName} must be less than ${max} characters`);
    }
    return true;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
    return true;
  },

  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      throw new Error('Invalid URL format');
    }
  },
};

export const validateTask = (task) => {
  const errors = {};

  try {
    validators.required(task.title, 'Title');
    validators.minLength(task.title, 3, 'Title');
    validators.maxLength(task.title, 100, 'Title');
  } catch (error) {
    errors.title = error.message;
  }

  if (task.description) {
    try {
      validators.maxLength(task.description, 500, 'Description');
    } catch (error) {
      errors.description = error.message;
    }
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(task.priority)) {
    errors.priority = 'Invalid priority level';
  }

  const validCategories = ['work', 'personal', 'shopping', 'health'];
  if (!validCategories.includes(task.category)) {
    errors.category = 'Invalid category';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};