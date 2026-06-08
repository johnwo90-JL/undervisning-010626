
### Oppgave 040626 -> 080626

- Fullfør implementering av request-ID middleware i [use-request-id.middleware.js](src\middlewares\use-request-id.middleware.js).
- Skriv en test som bekrefter at request-ID tilføyes på `req`-objektet som `req.id`.


## Oppgave 080626 -> 090626

- `POST /users` skal generere en vilkårlig `id` (UUIDv4) for nye brukere som opprettes.
- Forsikre også at det unngås å opprette duplikater basert på e-postadresse.
