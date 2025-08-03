const bcrypt = require('bcrypt');

(async () => {
  const plainPassword = "test123";

  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log("🔐 Hashed:", hashed);

//   const match = await bcrypt.compare("test123", hashed);
  const match = await bcrypt.compare(plainPassword, hashed);
  console.log("✅ Do they match?", match);
})();
