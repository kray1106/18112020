"use strict";

let tokenGenerator = require("jsonwebtoken");

// PRIVATE and PUBLIC key
let privateKEY = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJpsr2IItuEH4yjNOL+BKyVSgKBj5VX6KejI0fZzihgwvHQsJi+V
yKhScHHCxSDVg4I/DWCfUGxV82dV0bMzxtsCAwEAAQJAWt5BhYpjMp+Vh9ja37V+
UgPuNHMT7De8mYIyKrdqNzjrdLmUs48VFPhs9gMnDlQpAOwGcg/O6x8acIRCtLtj
4QIhANnCX/6FRs6z4N2eIbwBpvJ796t99moWyXDyyw979tQ/AiEAtYsF2ICfDoiF
bCztSh1GeAfdff3PDN68dFTYl2fDdmUCIQDUAfhv1tZPXLXrTo/NeVZO8v74yhRk
yXaqLtggZTK1BQIfRX7yve5+9RFOAhswuy55y3k3UQPYPxUFD4NrZopSSQIhAL+7
nzeuHWQ3LHCG6B+xzZlfuwXmP0v5j+CHA8SLtH9W
-----END RSA PRIVATE KEY-----`;

let publicKEY = `-----BEGIN RSA PUBLIC KEY-----
MEgCQQCabK9iCLbhB+MozTi/gSslUoCgY+VV+inoyNH2c4oYMLx0LCYvlcioUnBx
wsUg1YOCPw1gn1BsVfNnVdGzM8bbAgMBAAE=
-----END RSA PUBLIC KEY-----`;

let i = "Krayont"; // Issuer
let s = "abc@123.com"; // Subject
let a = ""; // Audience

module.exports.generate = () => {
  // PAYLOAD
  let payload = {
    data: "Data",
  };

  // SIGNING OPTIONS
  let signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "2h",
    algorithm: "RS256",
  };

  return tokenGenerator.sign(payload, privateKEY, signOptions);
};

module.exports.verifyToken = (token) => {
  let verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "2h",
    algorithm: ["RS256"],
  };

  return tokenGenerator.verify(token, publicKEY, verifyOptions);
};
