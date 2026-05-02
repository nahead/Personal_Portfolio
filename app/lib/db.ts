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
  const setClauses: string[] = [];
  const values: any[] = [id];
  let paramIndex = 2;

  if (project.title !== undefined) {
    setClauses.push(`title = $${paramIndex++}`);
    values.push(project.title);
  }
  if (project.tagline !== undefined) {
    setClauses.push(`tagline = $${paramIndex++}`);
    values.push(project.tagline);
  }
  if (project.description !== undefined) {
    setClauses.push(`description = $${paramIndex++}`);
    values.push(project.description);
  }
  if (project.long_description !== undefined) {
    setClauses.push(`long_description = $${paramIndex++}`);
    values.push(project.long_description);
  }
  if (project.tech !== undefined) {
    setClauses.push(`tech = $${paramIndex++}`);
    values.push(project.tech);
  }
  if (project.status !== undefined) {
    setClauses.push(`status = $${paramIndex++}`);
    values.push(project.status);
  }
  if (project.status_color !== undefined) {
    setClauses.push(`status_color = $${paramIndex++}`);
    values.push(project.status_color);
  }
  if (project.gradient !== undefined) {
    setClauses.push(`gradient = $${paramIndex++}`);
    values.push(project.gradient);
  }
  if (project.icon !== undefined) {
    setClauses.push(`icon = $${paramIndex++}`);
    values.push(project.icon);
  }
  if (project.metrics !== undefined) {
    setClauses.push(`metrics = $${paramIndex++}`);
    values.push(JSON.stringify(project.metrics));
  }
  if (project.github_url !== undefined) {
    setClauses.push(`github_url = $${paramIndex++}`);
    values.push(project.github_url);
  }
  if (project.live_url !== undefined) {
    setClauses.push(`live_url = $${paramIndex++}`);
    values.push(project.live_url);
  }

  setClauses.push('updated_at = NOW()');

  const query = `
    UPDATE projects
    SET ${setClauses.join(', ')}
    WHERE id = $1
    RETURNING *
  `;

  const result = await sql(query, values);
  return result[0] as Project;
}

// Delete project
export async function deleteProject(id: number) {
  await sql`
    DELETE FROM projects WHERE id = ${id}
  `;
}
