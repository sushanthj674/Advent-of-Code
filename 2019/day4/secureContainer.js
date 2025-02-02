const isValidPassword = (password) => {
  const digits = password.toString().split("").map(Number);

  for (let i = 1; i < digits.length; i++) {
    if (digits[i] < digits[i - 1]) return false;
  }

  const digitCount = {};
  for (let digit of digits) {
    digitCount[digit] = (digitCount[digit] || 0) + 1;
  }

  for (let count of Object.values(digitCount)) {
    if (count === 2) return true;
  }

  return false;
};

const countValidPasswords = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    if (isValidPassword(i)) {
      count++;
    }
  }
  return count;
};

console.log(countValidPasswords(234208, 765869));
