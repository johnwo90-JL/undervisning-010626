# Fagplan NodeJS + ExpressJS

## Oversikt

Under følger en overordnet oversikt over fokusområder pr. uke, samt overordnede læringsmål.

| Uke | Fokusområde                                       | Læringsmål                                                                                              |
| --- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | **`express`, prosjektstruktur og testbar kode**   | **Forstå hvordan man strukturerer et Express-prosjekt og tester isolert.**                              |
|     |                                                   | - Bygge og teste en enkel *Express-router* i en strukturert kodebase                                    |
|     |                                                   | - Prosjektorganisering, effektiv navigasjon av kodebase, m.m.                                           |
|     |                                                   | - Forståelse for hvorfor og hvordan man tester, hvordan skrive testbar kode                             |
|     |                                                   | - *Handler* vs. *Middleware*                                                                            |
|     |                                                   |                                                                                                         |
| 2   | **API-design, validering og autentisering**       | **Bygge robuste API-endepunkter. Forståelse for tjenestelag og REST(ful)-prinsipper og -konvensjoner.** |
|     |                                                   | - Inndatagrensesnitt, inndatavalidering(`Zod`), valideringsskjema og -strategier                        |
|     |                                                   | - *Middleware* for validering, og testing av validerte endepunkter                                      |
|     |                                                   | - REST-prinsipper og -konvensjoner, *"resource, not function"*, DTO (*view*)                            |
|     |                                                   | - Statuskoder og feilmeldinger                                                                          |
|     |                                                   | - Autentiseringsstrategier (JWT, BASIC), bruk av flere autentiseringsstrategier                         |
|     |                                                   | - Bruk av `bcrypt`, JWT-anatomi                                                                         |
|     |                                                   |                                                                                                         |
| 3   | **Databaser, datamodellering og autorisasjon**    | **Datamodellering, relasjoner, koble DB til API og rollebasert tilgangsstyring.**                       |
|     |                                                   | - Oppsett av `sqlite` og `sequelize`                                                                    |
|     |                                                   | - Miljøkonfigurasjon                                                                                    |
|     |                                                   | - Relasjoner, transaksjoner, validering via DB-driver, modellspesifikke-metoder                         |
|     |                                                   | - RBAC, med tilhørende *middleware*, *claims* i JWT, beskytte endepunkter                               |
|     |                                                   |                                                                                                         |
| 4   | **Testing, sikkerhet, dokumentasjon og `Docker`** | **Forstå krav til sikkerhet, testing og distribusjon av moderne backend.**                              |
|     |                                                   | - Sikkerhetsfunksjonalitet, logging basert på miljø                                                     |
|     |                                                   | - Integrasjonstesting, bruk av `setup`, `teardown`, `beforeAll`, `afterAll`                             |
|     |                                                   | - Generere *OpenAPI*-spesifikasjon fra `express`-app og `zod`-valideringsskjema                         |
|     |                                                   | - Bruk av prossessbehandler (`pm2`) og konteinerisering med *Docker*                                    |
|     |                                                   | - *"Staging"* vs. *"Production"*, utrulling av serverprogramvare                                        |

---

## Uke 1: Express og strukturert kode

**Læringsmål:** Forstå hvordan man strukturerer et Express-prosjekt, skriver moduler og tester funksjonell logikk isolert.

### Dag 1 – Introduksjon og prosjektoppsett

* Opprette Express-basert server applikasjon
* Prosjektstruktur: `src/`, `routes/`, `controllers/`, `utils/`
* GET-endepunkt med manuell testing

**Oppgave:** Lag et nytt GET-endepunkt.

---

### Dag 2 – ESModules og enhetstesting

* Innføring i `vitest`
* Skrive testbar verktøykode (`utils`)
* Organisering av testkode

**Oppgave:** Isoler og test en hjelpefunksjon med `vitest`.

---

### Dag 3 – Middleware og integrasjonstesting

* Egendefinerte middlewares (logger, 404, error handler)
* Bruke `supertest` for HTTP-testing
* Teststrategi for endepunkter og tilbakemeldinger

**Oppgave:** Utvid prosjektet med 2 endepunkter og test disse med `supertest`.

---

## Uke 2: API-struktur, validering og autentisering

**Læringsmål:** Bygge robuste API-endepunkter med vlidering og sikkerhet. Utvikle forståelse for tjenestelag, ansvarsseparasjon og REST-prinsipper.

### Dag 1 – Zod-basert validering

* Skjemaer for `params`, `query` og `body`
* Middleware for feilhåndtering og validasjonsfeil
* Grunnleggende valideringsstrategier

**Oppgave:** Legg til validering for minst én ny rute i prosjektet.

---

### Dag 2 – REST-konvensjoner og tjenestelag

* Struktur for controller/service
* DTO: hva API-et eksponerer, i.e. *view*.
* Statuskoder og feilmeldinger
* Testing av validerte endepunkter

**Oppgave:** Implementer CRUD for en ressurs, med tilhørende validering og tjenestelag.

---

### Dag 3 – Autentisering (JWT, BASIC) og passordhashing (bcrypt)

* Registrering og innlogging
* Hashing med `bcrypt`
* *Token*-generering og middleware for verifisering av *token*
* Teste sikker tilgang

**Oppgave:** Beskytt en ny rute med autentisering og test den med `supertest`.

---

## Uke 3: Databaser og databasedrevet utvikling

**Læringsmål:** Modellere data og relasjoner, koble database til API og beskytte sensitive operasjoner.

### Dag 1 – Sequelize, migrasjoner og modeller

* Oppsett av `sqlite` via `sequelize`
* Konfigurasjon for flere miljø
* Migrering og oppretting av tabeller

**Oppgave:** Opprett en ny modell med tilhørende migrasjoner.

---

### Dag 2 – CRUD-operasjoner og relasjoner

* Bruk av `hasMany` og `belongsTo`
* Transaksjoner, relasjoner og dataflyt
* Validering før databaselagring

**Oppgave:** Implementer CRUD for ny relasjonell modell og test minst én rute.

---

### Dag 3 – Rollebasert autorisasjon

* Brukerroller og tilgangskontroll
* Tilføying av claims i JWT
* Middleware for `verifyRoles`
* Tilgangsbeskyttede endepunkter

**Oppgave:** Legg til én rute med rollebeskyttelse og test med/uten token.

---

## Uke 4: Produksjonsforberedelser og dokumentasjon

**Læringsmål:** Forstå krav til sikkerhet, testing og distribusjon av moderne backend.

### Dag 1 – Sikkerhet og miljøstyring

* Helmet, rate limiting, miljøkonfigurasjon
* Logging og beskyttelse mot lekkasje
* Miljøspesifikke API-innstillinger

**Oppgave:** Legg til miljøvariabler og sikkerhetslag i prosjektet.

---

### Dag 2 – Testing med `setup`/`teardown`

* Egen testdatabase
* `vitest` hooks (`beforeEach`, `afterAll`)
* Autentiserte testscenarier

**Oppgave:** Skriv en full CRUD-test med `setup`/`teardown` for `sqlite`-testdatabase.

---

### Dag 3 – Swagger og Docker

* Generering av OpenAPI (via `zod-to-openapi`)
* Dockerfile, `npm start` og `npm test` i container
* Endelig kodegjennomgang og tilrettelegging for deploy

**Oppgave:** Eksponer Swagger-dokumentasjon og bygg prosjektet i Docker-container.

---

## Tilleggsressurser og fordypning

* Websockets
* CI/CD via GitHub Actions
* Ekstraoppgaver:
  * Dashboard API
  * Testdekingsrapporter

---

## Dekning mot kompetansemål IUV03-01

Kilde for kompetansemål: Udir, **Vg3 IT-utviklerfaget (IUV03-01)**, «Kompetansemål og vurdering».

**Status:**

* `Dekkes`: tydelig behandlet med læringsmål/oppgave
* `Delvis`: berøres, men ikke tydelig nok for full måloppnåelse
* `Ikke dekket`: mangler eksplisitt innhold/aktivitet

| #      | Kompetansemål (IUV03-01)                                                                                               | Treff i planen                                                                  | Status        |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------- |
| **1**  | Planlegge, utvikle og dokumentere løsninger med innebygd personvern og sikkerhet                                       | Uke 2 (autentisering), Uke 4 dag 1 (sikkerhet), Uke 4 dag 3 (dokumentasjon)     | *Delvis*      |
| **2**  | Planlegge, utvikle og dokumentere løsninger som er energieffektive og bærekraftige                                     | Ingen eksplisitte punkter                                                       | *Ikke dekket* |
| **3**  | Videreutvikle en løsning for å ivareta brukernes behov                                                                 | Iterativ utvikling gjennom ukeoppgaver og utvidelse av API                      | *Delvis*      |
| **4**  | Planlegge, utvikle, sette opp og dokumentere systemer for datainnsamling, analyse og visualisering                     | API + database er dekket, analyse/visualisering er ikke eksplisitt              | *Delvis*      |
| **5**  | Planlegge, utvikle, sette opp og dokumentere integrasjoner mellom ulike systemer og databaser                          | Uke 3 (databasekobling, relasjoner, CRUD)                                       | *Delvis*      |
| **6**  | Utvikle og bruke dokumentasjon og veiledninger                                                                         | Uke 4 dag 3 (OpenAPI/Swagger), samt god kommentering                            | *Dekkes*      |
| **7**  | Veilede brukere i ulike oppgaver                                                                                       | Ingen eksplisitte læringsaktiviteter                                            | *Ikke dekket* |
| **8**  | Håndtere påloggingsopplysninger på en sikker og forsvarlig måte                                                        | Uke 2 dag 3 (bcrypt, JWT, innlogging), Uke 4 dag 1 (sikkerhet)                  | *Dekkes*      |
| **9**  | Utvikle og tilpasse brukergrensesnitt som ivaretar krav til universell utforming                                       | Backend-plan uten UI-fokus                                                      | *Ikke dekket* |
| **10** | Velge og bruke relevante rammeverk og moduler til utvikling                                                            | `express`, `zod`, `sequelize`, `vitest`, `supertest`, Docker                    | *Dekkes*      |
| **11** | Beskrive konsekvenser av teknisk gjeld i løsninger                                                                     | Berøres indirekte via struktur og testbar kode                                  | *Delvis*      |
| **12** | Beskrive krav ulike løsninger stiller til infrastruktur, og muligheter/begrensninger                                   | Uke 4 dag 3 (staging/production, Docker, pm2)                                   | *Delvis*      |
| **13** | Gjøre rede for og anvende regelverk for personvern, opphavsrett og informasjonssikkerhet                               | Informasjonssikkerhet berøres, personvern/opphavsrett-regelverk er ikke tydelig | *Delvis*      |
| **14** | Bruke utviklingsstrategier og samarbeide med andre utviklere                                                           | Prosjektstruktur/testing støtter praksis, samarbeid ikke eksplisitt             | *Delvis*      |
| **15** | Feilsøke kode og rette feil i algoritmer og kode                                                                       | Uke 1 og 4 gjennom testing og feilretting                                       | *Dekkes*      |
| **16** | Utforske prosesser knyttet til testing og feilsøking i utvikling av løsninger                                          | Uke 1, 2 og 4 med enhetstest/integrasjonstest/testoppsett                       | *Dekkes*      |
| **17** | Behandle bedriftsinterne opplysninger på en sikker og etisk forsvarlig måte                                            | Sikkerhet er med, men intern informasjonsforvaltning/etikk er ikke eksplisitt   | *Delvis*      |
| **18** | Utforske konseptene maskinlæring og kunstig intelligens                                                                | Ingen eksplisitte punkter                                                       | *Ikke dekket* |
| **19** | Utforske og vurdere eksisterende og nye teknologier og bransjerelevante kodespråk                                      | Node/Express-økosystem dekkes, systematisk teknologivurdering mangler           | *Delvis*      |
| **20** | Reflektere over og beskrive hvordan teknologi kan misbrukes og påvirke samfunnet negativt                              | Sikkerhet behandles, samfunnsrefleksjon ikke eksplisitt                         | *Delvis*      |
| **21** | Gjøre rede for krav/forventninger til likeverdig og inkluderende yrkesfellesskap, og plikter/rettigheter i lærebedrift | Ingen eksplisitte punkter                                                       | *Ikke dekket* |

### Dekningsrapport (oppsummert)

Totalt antall kompetansemål: **21**

| Kategori      | Antall | %      |
| ------------- | ------ | ------ |
| `Dekkes`      | **5**  | 23,9 % |
| `Delvis`      | **11** | 52,2 % |
| `Ikke dekket` | **5**  | 23,9 % |