import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`services\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`services_meta_meta_image_idx\` ON \`services\` (\`meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`cover_image_id\` integer,
  	\`description\` text,
  	\`duration\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_services\`("id", "name", "generate_slug", "slug", "cover_image_id", "description", "duration", "updated_at", "created_at") SELECT "id", "name", "generate_slug", "slug", "cover_image_id", "description", "duration", "updated_at", "created_at" FROM \`services\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`ALTER TABLE \`__new_services\` RENAME TO \`services\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_cover_image_idx\` ON \`services\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`enable_fullscreen_sections\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "generate_slug", "slug", "enable_fullscreen_sections", "updated_at", "created_at") SELECT "id", "title", "generate_slug", "slug", "enable_fullscreen_sections", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
}
