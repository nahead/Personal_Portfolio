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
  // Get current project first
  const current = await getProject(id);
  if (!current) {
    throw new Error('Project not found');
  }

  // Merge with updates (use current values if not provided)
  const updated = {
    title: project.title ?? current.title,
    tagline: project.tagline ?? current.tagline,
    description: project.description ?? current.description,
    long_description: project.long_description ?? current.long_description,
    tech: project.tech ?? current.tech,
    status: project.status ?? current.status,
    status_color: project.status_color ?? current.status_color,
    gradient: project.gradient ?? current.gradient,
    icon: project.icon ?? current.icon,
    metrics: project.metrics ?? current.metrics,
    github_url: project.github_url !== undefined ? project.github_url : current.github_url,
    live_url: project.live_url !== undefined ? project.live_url : current.live_url,
  };

  // Update with all fields using template literal
  const result = await sql`
    UPDATE projects
    SET
      title = ${updated.title},
      tagline = ${updated.tagline},
      description = ${updated.description},
      long_description = ${updated.long_description},
      tech = ${updated.tech},
      status = ${updated.status},
      status_color = ${updated.status_color},
      gradient = ${updated.gradient},
      icon = ${updated.icon},
      metrics = ${JSON.stringify(updated.metrics)},
      github_url = ${updated.github_url},
      live_url = ${updated.live_url},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return result[0] as Project;
}

// Delete project
export async function deleteProject(id: number) {
  await sql`
    DELETE FROM projects WHERE id = ${id}
  `;
}
