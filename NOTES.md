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
