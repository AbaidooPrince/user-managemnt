const required = (property) => {
  if (property) {
    return v => !!v || `${property} is required`
  }
}
const validEmail = () => {
  const regex = /.+@.+\..+/
  // eslint-disable-next-line no-mixed-operators
  return v => v && regex.test(v) || 'Please enter a valid email'
}
const maxLength = (propertyType, maxLength) => {
  // eslint-disable-next-line no-mixed-operators
  return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
}

const minLength = (propertyType, minLength) => {
  // eslint-disable-next-line no-mixed-operators
  return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
}
const passwordMatch = (password) => {
  // eslint-disable-next-line no-mixed-operators
  return v => v && v === password || 'Passwords do no match'
}
export default {
  validEmail,
  required,
  maxLength,
  minLength,
  passwordMatch
}
