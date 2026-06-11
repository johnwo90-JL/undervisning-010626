const username = "bruker";
const password = "passord";

const rawPayload = `${username}:${password}`;

console.log("Bruker fyller inn brukernavn/passord: ", rawPayload);

const base64payload = btoa(rawPayload);
const base64payload2 = Buffer.from(rawPayload, "utf8").toString("base64");

console.log("\"Payload\" enkodes til base64: ", base64payload);

console.log("Klienten sender enkodet \"payload\" til server");

const decodedPayload = atob(base64payload);
const decodedPayload2 = Buffer.from(rawPayload, "base64").toString("utf8");

console.log("Server dekoder \"payload\":", decodedPayload);
// console.log("Server dekoder \"payload\":", decodedPayload2);

console.log("Sjekker om passord/brukernavn er gyldig,")
console.log("sender respons");

console.log(atob("eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0"));