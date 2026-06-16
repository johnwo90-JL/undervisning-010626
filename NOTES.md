### Node, Versjonering

- Partallsversjon    - LTS
- Oddetallsversjoner - Experimental

### NVM - Node Version Manager

- Bruk hvis hensiktsmessig.


### Handler vs. Endpoint

- Handler   => Selve funksjonen som håndterer forespørselen
- Endpoint  => Eks. `/users?limit=10`

## Routing

- Router har path "/world",
- app binder (bruker, *use*) `rootRouter` til endepunkt `/hello`
- ergo:
    ```
    router      -> `/hello`
        endpoint    -> `/world`
    i.e. endpoint = `/hello/world`
    ```


## Testing


## Middleware

MW er "en handler" som enten utfører validering eller transformasjon av data.

Forespørsel fra klient mot `/users` -> Express -> Router? -> middlewares? -> handler?

MW kan tilegnes endepunkt, router eller app.

Forespørsel fra klient mot `/users` -> Express (m/ middlewares!) -> Router? -> middlewares? -> handler?


## Inndata -> Express

### Forespørsel

- `query`: Eksempel: `https://pokeapi.co/pokedex/123?filter=shiny` har query-string `?filter=shiny`, som er formatert slik:
  - `?` for start av query / queries
  - `key=value` for å definere en verdi
  - `&` som skilletegn
- `params`: Path-parameter; eksempel: `https://pokeapi.co/pokedex/123?filter=shiny` -> `https://pokeapi.co/{:collection,:table}/:pokemonId?filter=shiny` har path-parameter `pokemonId = 123`.
- `body`: Brukes mot endepunkt som håndterer POST / PUT / PATCH. "content-type"-header-felt definerer type data.


## Inndatavalidering

- Forsikre at data som vi får inn er av forventet form.

## REST - Representational State Transfer

- Løst koblet
- API -> DB
- Skalerbar
- Simplistisk
- Overførbarhet
- Utvides lett


## RESTful - Retter seg etter REST arkitekturisk stil

Enhver overføring; dvs. forespørsel og svar, skal inneholde all informasjon som gjør det mulig å repetere forespørselsen.

## SOAP - Simple Object Access Protocol

Hvis du kan, unngå. /POP

## CRUD vs. HTTP Methods

### CRUD

- C - Create
- R - Read
- U - Update (/upsert)
- D - Delete

### HTTP Metoder

- GET       - Read
- POST      - Create 
- PUT       - Create & Update
- PATCH     - Update
- DELETE    - Delete

#### GET

Hent/les data.

Eksempel:

Vi sender følgende data til server:

`GET /users/abcdef0123456789`:
```json
[no body]
```

`Response`:
```json
{
    success: true,
    meta: {
        _self: "http://localhost:3000/users/abcdef0123456789",
        _next: "http://localhost:3000/users/abcdef0123456710",
         _index: "http://localhost:3000/users"
    }
    data: {
        "id": "abcdef0123456789",
        "username": "Foobar",
        "password": null,
        "email": "foo@bar.com"
    }
}
```

#### POST

Opprett ny oppføring av data.

POST oppretter en ny oppføring, *og* oppretter en ny vilkårlig `id` for den nyopprettede oppføringen.

Eksempel:

Vi sender følgende data til server:

`POST /users`:
```json
{
    "username": "Foo",
    "password": null,
    "email": "foo@bar.com"
}
```

`Response`:
```json
{
    success: true,
    _insertedData: {
        "id": "abcdef0123456789",
        "username": "Foo",
        "password": null,
        "email": "foo@bar.com"
    }
}
```

Ved duplikat:

- Skyld **alltid** på klienten! Gi `400`-status / `409`- status.


#### PUT

Upsert data.

UPSERT -> Update or insert.

Update -> Erstatt data i en eksisterende oppføring.
Insert -> Sett inn ny data, *hvis gyldig*.

`PUT /users/abcdef0123456789`:
```json
{
    "username": "Foo",
    "password": null,
    "email": "foo@bar.com"
}
```

`Response`:
```json
{
    success: true,
    _insertedData: {
        "username": "Foo",
        "password": null,
        "email": "foo@bar.com"
    }
}
```

Eksempel 2:

`PUT /users`:
```json
{
    "username": "Foo",
    "password": null,
    "email": "foo@bar.com"
}
```

`Response`:
```json
{
    success: false,
    error: {
        code: 400
        message: "Missing field `id`."
    }
}
```

#### PATCH

Oppdater eksisterende data.

Eksempel:

Vi sender følgende data til server:

`PATCH /users/abcdef0123456789`:
```json
{
    "username": "Foobar",
}
```

`Response`:
```json
{
    success: true,
    _updatedData: {
        "id": "abcdef0123456789",
        "username": "Foobar",
        "password": null,
        "email": "foo@bar.com"
    }
}
```

Hvis et endepunkt / en funksjon, e.l. gir det samme resultatet for den samme inndataen, hva kalles den type endepunkt/funksjon?

*Idempotent.*

#### DELETE

Sletter (eller markerer som slettet) data.

Eksempel:

Vi sender følgende data til server:

`DELETE /users/abcdef0123456789`:
```json
[no body]
```

`Response`:
```json
{
    success: true,
    _deletedData: {
        "id": "abcdef0123456789",
        "username": "Foobar",
        "password": null,
        "email": "foo@bar.com"
    }
}
```

*eller*:

`status 204`

--- 

- HEAD
- OPTIONS
- TRACE

---

## Autentisering og passordhashing

### BASIC (autentisering)

#### Hovedpunkter

- Basic Authentication
- Innebygd i nettlesere
- Simpel

#### Hvordan ser det ut?

BASIC baserer at man sender brukernavn og passord som base64 til server.
Dette ser slik ut i praksis: `${brukernavn}:${passord}` -> base64-enkoder = *payload*

#### Egenskaper

- Flyktig autentisering, dvs. at man må autentisere seg for hver forespørsel man utfører.
- Kan oppgraderes til en vedvarende autentiseringsstrategi (JWT, session-cookie, e.l.).
- Enkelt å implementere.

### JWT

#### Hovedpunkter

- Er en type "token", dvs. noe som holder informasjon, helt eller delvis, som brukes, i dette tilfellet, som grunnlag for å bekrefte at en bruker er innlogget.
- Oppbevares hos klienten (httpOnly-secure-cookie).
- Signert informasjon gjør det nærmest umulig å manipulere informasjonen i "token". *Anti-tampering*

#### Hvordan ser det ut?

[JWT.io](https://www.jwt.io/) har en flott visuell framstilling av JWT-tokens.


## DB relatert

### Biblioteker

- `sqlite3`
- `sequelize`
- `dotenv`