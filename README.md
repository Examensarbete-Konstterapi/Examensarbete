# Jessickas konstterapi

Webbapplikation för Jessickas konstterapi med publik information, bokningsflöde, användarsidor och adminpanel. Projektet är uppdelat i en React/Vite-frontend och en Express/MongoDB-backend.

## Funktioner

- Publika sidor för startsida, om mig, konstterapi, bokning och galleri.
- Registrering och inloggning med JWT.
- Bokning av lediga sessioner för inloggade användare.
- Mina sidor där användare kan se profil, ändra lösenord och hantera bokningar.
- Adminpanel för att hantera kurser/sessioner och se bokningar.
- Rollbaserat skydd för användar- och adminvyer.

## Teknikstack

**Frontend**

- React 19
- TypeScript
- Vite
- React Router
- React Hook Form
- Axios

**Backend**

- Node.js
- Express 5
- TypeScript
- MongoDB med Mongoose
- JWT för autentisering
- bcrypt för lösenordshashning

## Projektstruktur

```text
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── server.ts
├── frontend
│   ├── public
│   └── src
│       ├── api
│       ├── components
│       ├── context
│       ├── pages
│       └── routes
└── README.md
```

## Kom igång

### Förutsättningar

- Node.js
- npm
- MongoDB, lokalt eller via till exempel MongoDB Atlas

### 1. Installera dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Skapa miljövariabler för backend

Skapa en `.env`-fil i `backend`:

```env
PORT=5030
MONGO_URI=din_mongodb_connection_string
JWT_SECRET=din_hemliga_jwt_nyckel
```

Frontenden använder just nu `http://localhost:5030/api` som API-bas i `frontend/src/api/axios.ts`. Om du väljer en annan backend-port behöver du uppdatera den adressen eller ändra `PORT` i backend så att de matchar.

### 3. Starta backend

```bash
cd backend
npm run dev
```

API:t körs då på:

```text
http://localhost:5030
```

### 4. Starta frontend

Öppna en ny terminal:

```bash
cd frontend
npm run dev
```

Vite visar vilken lokal URL appen körs på, vanligtvis:

```text
http://localhost:5173
```

## Scripts

### Backend

```bash
npm run dev
```

Startar Express-servern med `tsx watch`.

### Frontend

```bash
npm run dev
```

Startar utvecklingsservern.

```bash
npm run build
```

Typecheckar och bygger frontend för produktion.

```bash
npm run lint
```

Kör ESLint.

```bash
npm run preview
```

Förhandsvisar produktionsbygget lokalt.

## Frontend-routes

| Route | Beskrivning |
| --- | --- |
| `/` | Startsida |
| `/om-mig` | Information om terapeuten |
| `/konstterapi` | Information om konstterapi |
| `/boka-tid` | Bokningsflöde |
| `/galleri` | Galleri |
| `/priser` | Prissida |
| `/kontakt` | Kontaktsida |
| `/mina-sidor` | Skyddad användarsida |
| `/admin-panel` | Skyddad adminpanel |

## API-routes

Alla routes ligger under `/api`.

### Auth

| Metod | Route | Beskrivning |
| --- | --- | --- |
| `POST` | `/auth/register` | Registrera användare |
| `POST` | `/auth/login` | Logga in användare |

### Användare

| Metod | Route | Behörighet | Beskrivning |
| --- | --- | --- | --- |
| `GET` | `/users` | Admin | Hämta alla användare |
| `GET` | `/users/:id` | Inloggad | Hämta användare |
| `PUT` | `/users/:id` | Inloggad | Uppdatera profil |
| `PUT` | `/users/:id/password` | Inloggad | Uppdatera lösenord |
| `DELETE` | `/users/:id` | Inloggad | Ta bort användare |

### Kurser

| Metod | Route | Behörighet | Beskrivning |
| --- | --- | --- | --- |
| `GET` | `/courses` | Publik | Hämta kurser med sessioner |
| `GET` | `/courses/:id` | Publik | Hämta en kurs |
| `POST` | `/courses` | Admin | Skapa kurs och sessioner |
| `PUT` | `/courses/:id` | Admin | Uppdatera kurs |
| `DELETE` | `/courses/:id` | Admin | Ta bort kurs, sessioner och bokningar |

### Sessioner

| Metod | Route | Behörighet | Beskrivning |
| --- | --- | --- | --- |
| `GET` | `/sessions` | Publik | Hämta sessioner med bokningsstatus |
| `GET` | `/sessions/:id` | Publik | Hämta en session |
| `POST` | `/sessions` | Admin | Skapa session |
| `PUT` | `/sessions/:id` | Admin | Uppdatera session |
| `DELETE` | `/sessions/:id` | Admin | Ta bort session och tillhörande bokningar |

### Bokningar

| Metod | Route | Behörighet | Beskrivning |
| --- | --- | --- | --- |
| `POST` | `/bookings` | Inloggad | Skapa bokning |
| `GET` | `/bookings/my-bookings` | Inloggad | Hämta egna bokningar |
| `DELETE` | `/bookings/:id` | Inloggad/Admin | Ta bort bokning |
| `GET` | `/bookings` | Admin | Hämta alla bokningar |
| `GET` | `/bookings/:id` | Admin | Hämta en bokning |

## Datamodeller

### User

- `firstName`
- `lastName`
- `email`
- `password`
- `role`: `user` eller `admin`

### Course

- `title`
- `description`
- `category`: `individual` eller `group`
- `price`

### Session

- `courseId`
- `date`
- `startTime`
- `maxParticipants`

### Booking

- `sessionId`
- `userId`
- `message`

## Autentisering och roller

Vid inloggning sparas token och användardata i `localStorage`. Axios-interceptorn i `frontend/src/api/axios.ts` skickar med token som `Authorization: Bearer <token>` på API-anrop. Om backend svarar med `401` rensas sessionen och användaren loggas ut.

Backend använder två middleware-funktioner:

- `auth` verifierar JWT och sätter `req.user`.
- `adminOnly` kontrollerar att användaren har rollen `admin`.

## Att tänka på

- För att skapa adminanvändare behöver en användare ha rollen `admin` i databasen.
- `frontend/src/App.tsx` har routes för `/priser` och `/kontakt`, men de är inte aktiva i huvudmenyn just nu.
- Backendens standardport är `5000` om `PORT` saknas, men frontend pekar mot `5030`. Sätt därför `PORT=5030` i `backend/.env` eller uppdatera API-basen i frontenden.
