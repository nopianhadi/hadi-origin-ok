import type { InsertProject } from "@shared/schema";

/**
 * Maps frontend project data to database field names
 */
export function mapProjectToDatabase(data: Partial<InsertProject>) {
  const mapped: any = {};

  // Map camelCase to snake_case
  if (data.title !== undefined) mapped.title = data.title;
  if (data.description !== undefined) mapped.description = data.description;
  if (data.fullDescription !== undefined) mapped.full_description = data.fullDescription;
  if (data.category !== undefined) mapped.category = data.category;
  if (data.image !== undefined) mapped.image = data.image;
  if (data.images !== undefined) mapped.images = data.images;
  if (data.demoUrl !== undefined) mapped.demo_url = data.demoUrl;
  if (data.githubUrl !== undefined) mapped.github_url = data.githubUrl || null;
  if (data.videoUrl !== undefined) mapped.video_url = data.videoUrl || null;
  if (data.techStack !== undefined) {
    mapped.tech_stack = typeof data.techStack === 'string'
      ? (data.techStack as string).split(',').map(t => t.trim())
      : data.techStack || [];
  }
  if (data.features !== undefined) {
    mapped.features = typeof data.features === 'string'
      ? (data.features as string).split(',').map(f => f.trim())
      : data.features || [];
  }
  if (data.challenges !== undefined) mapped.challenges = data.challenges || null;
  if (data.results !== undefined) mapped.results = data.results || null;
  if (data.featured !== undefined) mapped.featured = data.featured || 0;
  if (data.status !== undefined) mapped.status = data.status || 'active';

  // Remove undefined values
  Object.keys(mapped).forEach(key => {
    if (mapped[key] === undefined) {
      delete mapped[key];
    }
  });

  return mapped;
}

/**
 * Maps database project data to frontend field names
 */
export function mapProjectFromDatabase(data: any) {
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    fullDescription: data.full_description,
    category: data.category,
    image: data.image,
    images: data.images || [],
    demoUrl: data.demo_url,
    githubUrl: data.github_url,
    videoUrl: data.video_url,
    techStack: data.tech_stack || [],
    features: data.features || [],
    challenges: data.challenges,
    results: data.results,
    featured: data.featured || 0,
    status: data.status || 'active',
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}