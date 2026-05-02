import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  long_description: string;
  tech: string[];
  status: string;
  status_color: string;
  gradient: string;
  icon: string;
  metrics: Record<string, string>;
  github_url?: string;
  live_url?: string;
  created_at: Date;
  updated_at: Date;
}

// Initialize database table
export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      tagline VARCHAR(500) NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT NOT NULL,
      tech TEXT[] NOT NULL,
      status VARCHAR(50) NOT NULL,
      status_color VARCHAR(20) NOT NULL,
      gradient VARCHAR(100) NOT NULL,
      icon VARCHAR(500) NOT NULL,
      metrics JSONB NOT NULL,
      github_url VARCHAR(500),
      live_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Migrate existing icon column to support URLs
  await sql`
    ALTER TABLE projects
    ALTER COLUMN icon TYPE VARCHAR(500)
  `.catch(() => {
    // Column already migrated or doesn't exist yet
  });
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  const result = await sql`
    SELECT * FROM projects ORDER BY id ASC
  `;
  return result as Project[];
}

// Get single project
export async function getProject(id: number): Promise<Project | null> {
  const result = await sql`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return result[0] as Project || null;
}

// Create project
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const result = await sql`
    INSERT INTO projects (
      title, tagline, description, long_description, tech,
      status, status_color, gradient, icon, metrics, github_url, live_url
    ) VALUES (
      ${project.title}, ${project.tagline}, ${project.description},
      ${project.long_description}, ${project.tech}, ${project.status},
      ${project.status_color}, ${project.gradient}, ${project.icon},
      ${JSON.stringify(project.metrics)}, ${project.github_url || null},
      ${project.live_url || null}
    ) RETURNING *
  `;
  return result[0] as Project;
}

// Update project
export async function updateProject(id: number, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) {
  // Build update object with only provided fields
  const updates: any = {};

  if (project.title !== undefined) updates.title = project.title;
  if (project.tagline !== undefined) updates.tagline = project.tagline;
  if (project.description !== undefined) updates.description = project.description;
  if (project.long_description !== undefined) updates.long_description = project.long_description;
  if (project.tech !== undefined) updates.tech = project.tech;
  if (project.status !== undefined) updates.status = project.status;
  if (project.status_color !== undefined) updates.status_color = project.status_color;
  if (project.gradient !== undefined) updates.gradient = project.gradient;
  if (project.icon !== undefined) updates.icon = project.icon;
  if (project.metrics !== undefined) updates.metrics = JSON.stringify(project.metrics);
  if (project.github_url !== undefined) updates.github_url = project.github_url;
  if (project.live_url !== undefined) updates.live_url = project.live_url;

  // Always update timestamp
  updates.updated_at = new Date();

  // Build SET clause parts
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');

  const values = Object.values(updates);

  // Execute update using neon's sql.unsafe for dynamic queries
  const result = await sql.unsafe(
    `UPDATE projects SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );

  return result[0] as Project;
}

// Delete project
export async function deleteProject(id: number) {
  await sql`
    DELETE FROM projects WHERE id = ${id}
  `;
}
