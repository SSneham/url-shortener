# URL Shortener

A small URL-shortening API built with Express and PostgreSQL. It creates short links, redirects visitors to the original URL, and records basic click statistics.

## Requirements

- Node.js 18 or later
- A PostgreSQL database

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
   BASE_URL=http://localhost:3000
   ```

3. Run the database migrations:

   ```bash
   npm run migrate
   ```

4. Start the server:

   ```bash
   npm start
   ```

   For development with automatic restarts, use `npm run dev`.

## API

### Create a short URL

`POST /api/shorten`

```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl":"https://example.com"}'
```

### Redirect to the original URL

`GET /:shortCode`

For example, open `http://localhost:3000/abc123`.

### Get link statistics

`GET /api/stats/:shortCode`

```bash
curl http://localhost:3000/api/stats/abc123
```

Statistics include the total number of clicks, daily click counts, and top referrers.
