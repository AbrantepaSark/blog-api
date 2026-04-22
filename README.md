📘Blog API

A scalable backend API for a social blog posting platform where users can register, authenticate, create posts, interact (likes & comments), and build a social network through follows.

## Database setup

When you start the stack with Docker, Postgres runs the SQL files in `init.sql/` only the first time the database volume is created.

For ongoing schema changes, the API now applies ordered SQL files from `migrations/` on startup and records them in the `schema_migrations` table.

To add a new table later:

1. Create a new file such as `migrations/002_create_comments.sql`
2. Add your `CREATE TABLE ...` SQL
3. Restart the API or rerun `docker compose up`

Use `init.sql/schema.sql` for fresh databases and `migrations/` for incremental changes to existing ones.
