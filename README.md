# mail-api (API for sending mail & simple counters)

This repository contains a small Node.js/Express API used to send e-mails and manage a small set of Redis counters.
It's configured using `config` and logs colored messages to the console using `chalk` for better visibility.

---

## English

### Features
- **Mail**: `POST /api/mail/sendEmail` — Send email using Nodemailer.
- **Counters**:
  - `GET /api/counter/get/:name` — Retrieve counter value.
  - `POST /api/counter/set/:name` — Set counter value.
  - `POST /api/counter/increment/:name` — Increment counter value.
- **GuestBook**:
  - `POST /api/guestbook/read` — Retrieve guestbook entries (password protected).
  - `POST /api/guestbook/write` — Add a new entry (password protected).
- **Health**: `GET /api/health/` — Health check endpoint (reports Redis & SMTP state).

### Configuration
Configuration is split into two parts:

- `config/static.config.json` — Default, static values used when no environment variables are set. This file includes server port, API root, mail defaults, log filenames, Redis defaults, and rate limiter routes.
- `.env` — Optional environment variables to override defaults. See `.env.example` for all available keys.

Precedence: environment variables take priority; if a variable is not set, the app falls back to `static.config.json`.

Key areas:
- `port` and `apiRoot`
- `mail` (SMTP host, port, secure, user, pass)
- `allowedIPs` (whitelist used by `middleware/whiteList`, comma-separated)
- `log` (directory and file names)
- `redis` (host, port, password)
- `secretSystem` (password, `redisListKey`)
- `rateLimiter` (enabled, windowSeconds, maxRequests, and per-route settings)
- `SECRET_PASSWORD` (Environment variable for GuestBook access)

### Installation
1. Install dependencies
```bash
npm install
```
2. Create/update your `.env` (based on `.env.example`). Defaults are in `config/static.config.json`.
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

- **General**
  - `GET /api` - Returns name & version of the API.
  - `GET /api/health/` - Health check (Redis & SMTP state).

- **Authentication (`/api/auth`)**
  - `POST /login` - Login with password (returns JWT).
  - `POST /logout` - Logout.

- **Mail (`/api/mail`)**
  - `POST /sendEmail` - Send contact email.
    - Body: `{ name, email, message, subject? }`

- **GuestBook (`/api/guestbook`)**
  - `POST /read` - Get entries (Pagination).
  - `POST /write` - Add entry.
  - `DELETE /delete` - Delete entry (Admin/Password protected).

- **Blog (`/api/blog`)**
  - `POST /all` - Get posts with pagination.
  - `POST /offset` - Get posts with offset/filtering.
  - `GET /:slug` - Get single post.
  - `PUT /:slug` - Update post.
  - `PUT /edit/publish/:slug` - Publish/unpublish post.
  - `DELETE /:slug` - Delete post.
  - `DELETE /cache/delete/:slug` - Clear specific post cache.
  - `DELETE /cache/clear/` - Clear all blog cache.

- **Tags (`/api/tags`)**
  - `GET /` - List all tags.
  - `GET /:slug` - Get tag details.
  - `DELETE /:slug` - Delete tag.

- **Assets (`/api/assets`)**
  - `POST /upload/` - Upload file (Multipart).
  - `DELETE /delete/:folder/:id` - Delete asset.
  - `DELETE /cache/clear/:id` - Clear asset cache.
  - `DELETE /cache/all` - Clear all asset cache.

- **Counters (`/api/counter`)**
  - `GET /get/:name` - Get counter value.
  - `POST /set/:name` - Set counter value.
  - `POST /increment/:name` - Increment counter.

- **Asset Proxy (`/assets/images`)**
  - `GET /proxy/:folder/:id` - Serve asset.
  - `GET /proxy/:public_id/` - Search and serve asset.
  - `GET /proxy/:public_id/size/:w/:h` - Resize and serve.

- **OpenGraph (`/assets/opengraph`)**
  - `GET /get` - Generate OpenGraph image.

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
If you run Redis in a Docker container, ensure that `REDIS_HOST` points to the correct hostname (for Docker networks). The default is `localhost:6379` (see `config/static.config.json`).

---



 