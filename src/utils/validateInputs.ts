export default function UseValidate(type: string, value: string) {
  if (type === 'email') return checkEmail(value);
  return { status: false, message: '' };
}

function checkEmail(value: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value.length === 0) {
    return { status: false, message: 'Email is required' };
  }
  if (emailRegex.test(value)) {
    return { status: true, message: 'Email is valid' };
  } else {
    return { status: false, message: 'Email is not valid' };
  }
}
