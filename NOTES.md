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
