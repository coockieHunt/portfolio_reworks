# mail-api (API for sending mail & simple counters)

This repository contains a small Node.js/Express API used to send e-mails and manage a small set of Redis counters.
It's configured using `config` and logs colored messages to the console using `chalk` for better visibility.

---

## English

### Features
- POST /api/sendEmail: Send an email using Nodemailer.
- Basic counters (GET/SET/INCREMENT) under `/api/counter` utilizing Redis for storage of a small set of keys.
- Health check endpoint `/api/status` (reports Redis state).

### Configuration
Local configuration is stored under `config/default.json`. Important fields include:

- `port` — API server port (default 3001).
- `MailTransport` — SMTP details for sending e-mails (user, pass, host, port, secure).
- `allowedIPs` — IPs allowed to access the API (used in `middleware/whiteList.js`).
- `Log` — logging details (directory, limit lines, etc.).
- `redis` — host, port, and optional password for Redis.

Open `config/default.json` and fill in `MailTransport` if you plan to send e-mails.

### Installation
1. Install dependencies
```bash
npm install
```
2. Create/update your configuration in `config/default.json`.
3. Start the app (dev or prod):
```bash
# development (with nodemon)
npm run dev

# production
npm start
```

The app will start on `http://localhost:<port>/api` (default port `3001`).

### Redis keys
Counter keys are defined in `constant/redisKey.js`. Example keys include:
- `GLOBAL_STATUS` → `site:global:call_api`  
- `THEME_RAND` → `site:theme:rand_activate`

Only keys defined in this mapping are allowed for the counter routes.

### Endpoints

- GET /api
  - Returns name & version of the API.

- GET /api/status
  - Returns JSON including a `service.redis` field and HTTP 200/503 depending on `redis` connectivity.

- POST /api/sendEmail
  - Request body JSON `{ to, subject, content }`
  - Returns success true/false. The app writes mail logs to `logs/` directory if configured.

- GET /api/counter/get/:name
  - Returns counter value; `:name` must be one of the keys in `constant/redisKey.js`
  - Response example:
  ```json
  {
    "success": true,
    "counterName": "THEME_RAND",
    "redisKey": "site:theme:rand_activate",
    "counterValue": 3,
    "exist": true
  }
  ```

- POST /api/counter/set/:name
  - Body: `{ "value": 7 }`
  - Sets counter to the provided integer value.

- POST /api/counter/increment/:name
  - Atomically increments a value stored at the associated Redis key. If Redis is not available or not ready, the endpoint returns a 503:
  ```json
  { "success": false, "message": "Redis client is not connected." }
  ```

### Logging & Redis readiness
- The server attempts to connect to Redis on startup. `connectRedis` now returns boolean indicating readiness.
- The app logs informative colored messages using `chalk`:
  - Successful start: green message showing `port` and Redis is ready/false.
  - Redis errors: red messages with stack traces.
  - Counter actions have colored logs for retrieval/set/increment operations.

### Running atop Docker/Redis
If you run Redis in a Docker container, ensure that the `redis.host` points to the correct hostname (for Docker networks). The default is `localhost:6379` in `config/default.json`.

---

## Français (FR)

### Fonctionnalités
- POST /api/sendEmail: envoyer un e-mail via Nodemailer.
- Compteurs simples (GET/SET/INCREMENT) exposés sous `/api/counter` utilisant Redis pour le stockage.
- Endpoint de vérification `GET /api/status` (déclare l'état de Redis).

### Configuration
La configuration locale se trouve dans `config/default.json`.
Champs importants:

- `port` — port HTTP du serveur (par défaut `3001`).
- `MailTransport` — détails SMTP pour l'envoi d'e-mails (utilisateur, password, host, port, secure).
- `allowedIPs` — IPs autorisées à accéder à l'API (géré dans `middleware/whiteList.js`).
- `Log` — détails des logs (dossier, limite de lignes, etc.).
- `redis` — hôte, port et mot de passe pour Redis.

Remplissez `MailTransport` si vous voulez envoyer des e-mails.

### Installation
1. Installez les dépendances
```bash
npm install
```
2. Mettez à jour `config/default.json` avec vos paramètres
3. Lancez l'application :
```bash
# développement (avec nodemon)
npm run dev

# production
npm start
```

L'API sera disponible à `http://localhost:<port>/api` (par défaut `3001`).

### Clés Redis
Les clés autorisées pour les compteurs sont dans `constant/redisKey.js`. Exemples :
- `GLOBAL_STATUS` → `site:global:call_api`  
- `THEME_RAND` → `site:theme:rand_activate`

### Endpoints

- GET /api
  - Retourne le nom et la version de l'API.

- GET /api/status
  - Retourne un JSON contenant `service.redis` et un code HTTP 200 ou 503 selon la connectivité à Redis.

- POST /api/sendEmail
  - Body JSON `{ to, subject, content }`
  - Retourne `success` true/false et écrit des logs mail dans `logs/` si configuré.

- GET /api/counter/get/:name
  - Retourne la valeur du compteur; `:name` doit être parmi les clés de `constant/redisKey.js`

- POST /api/counter/set/:name
  - Body: `{ "value": 7 }` — définit la valeur du compteur.

- POST /api/counter/increment/:name
  - Incrémente atomiquement la valeur. Si Redis n'est pas prêt, l'endpoint retourne 503 :
  ```json
  { "success": false, "message": "Redis client is not connected." }
  ```

### Logs & disponibilité Redis
- Le serveur tente de connecter Redis au démarrage. `connectRedis` renvoie boolean pour indiquer si la connection s'est bien déroulée.
- Les logs en console sont colorés via `chalk` :
  - Démarrage réussi : message vert avec le port et l'état Redis.
  - Erreurs Redis : message rouge avec la stack trace.
  - Actions sur les compteurs : logs colorés pour GET/SET/INCREMENT.

---

If you'd like, I can also:
- Add a `logger` helper to standardize colors/levels across the app.
- Add a small `./tests` script with a few curl checks ensuring endpoints behave when Redis is down/up.

Contributions welcome!

 