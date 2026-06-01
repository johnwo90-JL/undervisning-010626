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