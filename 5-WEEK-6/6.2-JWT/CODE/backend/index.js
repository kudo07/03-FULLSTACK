const jwt = require('jsonwebtoken');
const jwtPassword = 'dfdsf';
zod = require('zod');
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
  const usernameResponse = emailSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);
  if (!usernameResponse.success || !passwordResponse.success) {
    return null;
  }
  const signature = jwt.sign(
    {
      username,
    },
    jwtPassword
  );
  return signature;
}

const ans = signJwt('wefwef@gmail.com', 'ewfwefwfrwe');
console.log(ans);

function decode(token) {
  const decoded = jwt.decode(token);
  if (decoded) {
    return true;
  } else {
    return false;
  }
}
console.log(decode('fwefwfe'));

// wrap verifyJwt inside the try catch for exceptuon js verify return true or false
function verifyJwt(token) {
  try {
    const verified = jwt.verify(token, jwtPassword);
    if (verified) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
ans = verifyJwt('fwefwef');
console.log(ans);
