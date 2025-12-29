import bcrypt from 'bcrypt';

const password = 'ton_mot_de_passe_ici';
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);

console.log("--------------------------------------------------");
console.log("TON HASH :");
console.log(hash);
console.log("--------------------------------------------------");