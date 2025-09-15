/**
 * Generate a random name using 2–3 syllables
 * @returns Capitalized random name string
 */
export function generateName(): string {
  const syllables = ['ra', 'vi', 'an', 'ka', 'me', 'sa', 'ni', 'ro', 'ti', 'la', 'de', 'yu', 'ar'];
  let name = '';

  // Randomly choose 2 or 3 syllables
  const length = Math.floor(Math.random() * 2) + 2; // 2 or 3
  for (let i = 0; i < length; i++) {
    name += syllables[Math.floor(Math.random() * syllables.length)];
  }

  // Capitalize the first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Generate a strong random password
 * Includes at least 1 uppercase, 1 lowercase, 1 number, 1 special character
 * @param length Total length of the password (default: 12)
 * @returns Random password string
 */
export function generatePassword(length: number = 12): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+[]{}';

  // Pick at least one character from each type
  let password =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    special[Math.floor(Math.random() * special.length)];

  const allChars = upper + lower + numbers + special;

  // Fill the rest of the password randomly
  while (password.length < length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password;
}

/**
 * Generate a random age between min and max
 * @param min Minimum age (default: 18)
 * @param max Maximum age (default: 100)
 * @returns Random age number
 */
export function generateAge(min: number = 18, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random 10-digit phone number as string
 * @returns Phone number string
 */
export function generatePhoneNumber(): string {
  let phone = '';
  for (let i = 0; i < 10; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

/**
 * Generate a random gender
 * @returns 'Male' or 'Female'
 */
export function generateGender(): string {
  const genders = ['Male', 'Female']; // Can be extended to include Other, Prefer not to say
  return genders[Math.floor(Math.random() * genders.length)];
}

/**
 * Generate a random address
 * Format: <street number> <street>, <city>, <state> <zip>
 * @returns Random address string
 */
export function generateAddress(): string {
  const streets = ['Main St', 'High St', 'Park Ave', 'Broadway', 'Maple St', 'Oak St'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco', 'Boston'];
  const states = ['NY', 'CA', 'IL', 'TX', 'MA', 'FL'];

  const streetNumber = Math.floor(Math.random() * 9999) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zip = Math.floor(10000 + Math.random() * 90000); // 5-digit zip

  return `${streetNumber} ${street}, ${city}, ${state} ${zip}`;
}
