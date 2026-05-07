'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id?: number;
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
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<Project>({
    title: '',
    tagline: '',
    description: '',
    long_description: '',
    tech: [],
    status: 'Active',
    status_color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
    icon: '🚀',
    metrics: {},
    github_url: '',
    live_url: '',
  });

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchProjects(token);
    }
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_token', password);
    setIsAuthenticated(true);
    fetchProjects(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setProjects([]);
  };

  const fetchProjects = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProjects(data.projects);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Error fetching projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    setIsLoading(true);
    setError('');

    try {
      const url = '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const body = editingProject
        ? { id: editingProject.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchProjects(token);
        setShowForm(false);
        setEditingProject(null);
        resetForm();
      } else {
        setError('Failed to save project');
      }
    } catch (err) {
      setError('Error saving project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchProjects(token);
      } else {
        setError('Failed to delete project');
      }
    } catch (err) {
      setError('Error deleting project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      github_url: project.github_url || '',
      live_url: project.live_url || '',
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, icon: base64String });
        setUploadingImage(false);
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image');
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      tagline: '',
      description: '',
      long_description: '',
      tech: [],
      status: 'Active',
      status_color: '#3B82F6',
      gradient: 'from-[#3B82F6] to-[#8B5CF6]',
      icon: '🚀',
      metrics: {},
      github_url: '',
      live_url: '',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-8">
            <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">Admin Dashboard</h1>
            <p className="text-[#94A3B8] mb-6">Enter your admin password to continue</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563EB] transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#F1F5F9] mb-2">Admin Dashboard</h1>
            <p className="text-[#94A3B8]">Manage your portfolio projects</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                resetForm();
                setEditingProject(null);
                setShowForm(true);
              }}
              className="px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563EB] transition-colors"
            >
              + Add Project
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-[#1A2333] border border-[#1E3A5F] text-[#F1F5F9] rounded-xl font-semibold hover:border-[#3B82F6] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-[#EF4444]/20 border border-[#EF4444] rounded-xl text-[#EF4444]">
            {error}
          </div>
        )}

        {/* Projects List */}
        {isLoading ? (
          <div className="text-center py-12 text-[#94A3B8]">Loading...</div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {project.icon.startsWith('data:') || project.icon.startsWith('http://') || project.icon.startsWith('https://') ? (
                        <img
                          src={project.icon}
                          alt={project.title}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="text-3xl">{project.icon}</span>
                      )}
                      <h3 className="text-2xl font-bold text-[#F1F5F9]">{project.title}</h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${project.status_color}20`,
                          color: project.status_color,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[#94A3B8] mb-3">{project.tagline}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#0B1120] border border-[#1E3A5F] rounded-lg text-xs text-[#F1F5F9]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-semibold hover:bg-[#2563EB] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id!)}
                      className="px-4 py-2 bg-[#EF4444] text-white rounded-lg text-sm font-semibold hover:bg-[#DC2626] transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-hidden"
              onClick={() => setShowForm(false)}
              onWheel={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
                className="bg-[#1A2333] border border-[#1E3A5F] rounded-2xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto"
                style={{ overscrollBehavior: 'contain' }}
              >
                <h2 className="text-2xl font-bold text-[#F1F5F9] mb-6">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        Icon (Emoji, Image URL, or Upload) *
                      </label>

                      {/* Icon Preview */}
                      {formData.icon && (
                        <div className="mb-3 flex items-center gap-3 p-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl">
                          <div className="flex items-center justify-center w-16 h-16 bg-[#1A2333] rounded-lg">
                            {formData.icon.startsWith('data:') || formData.icon.startsWith('http://') || formData.icon.startsWith('https://') ? (
                              <img
                                src={formData.icon}
                                alt="Icon preview"
                                className="w-12 h-12 object-contain"
                              />
                            ) : (
                              <span className="text-3xl">{formData.icon}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-[#94A3B8]">Current Icon</p>
                            <p className="text-xs text-[#F1F5F9] truncate">
                              {formData.icon.startsWith('data:') ? 'Uploaded Image' : formData.icon}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Text Input */}
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="🚀 or https://example.com/icon.png"
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] mb-2"
                        required
                      />

                      {/* File Upload Button */}
                      <div className="flex items-center gap-2">
                        <label className="flex-1 px-4 py-2 bg-[#1A2333] border border-[#3B82F6] text-[#3B82F6] rounded-lg text-sm font-semibold hover:bg-[#3B82F6]/10 transition-colors cursor-pointer text-center">
                          {uploadingImage ? 'Uploading...' : '📁 Upload from Device'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>

                      <p className="text-xs text-[#94A3B8] mt-2">
                        Enter emoji (🚀), paste image URL, or upload from device (max 2MB)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                      Tagline *
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                      Short Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                      Long Description *
                    </label>
                    <textarea
                      value={formData.long_description}
                      onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                      Tech Stack (comma-separated) *
                    </label>
                    <input
                      type="text"
                      value={formData.tech.join(', ')}
                      onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(',').map(t => t.trim()) })}
                      placeholder="Next.js, TypeScript, Tailwind"
                      className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        Status *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="Live">Live</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Beta">Beta</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        Status Color *
                      </label>
                      <select
                        value={formData.status_color}
                        onChange={(e) => setFormData({ ...formData, status_color: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                        required
                      >
                        <option value="#10B981">🟢 Green (#10B981) - Live/Success</option>
                        <option value="#3B82F6">🔵 Blue (#3B82F6) - Active</option>
                        <option value="#F59E0B">🟠 Orange (#F59E0B) - Beta</option>
                        <option value="#EAB308">🟡 Yellow (#EAB308) - In Progress</option>
                        <option value="#8B5CF6">🟣 Purple (#8B5CF6) - Featured</option>
                        <option value="#EF4444">🔴 Red (#EF4444) - Stopped</option>
                        <option value="#6B7280">⚫ Gray (#6B7280) - Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        Gradient *
                      </label>
                      <input
                        type="text"
                        value={formData.gradient}
                        onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                        placeholder="from-[#3B82F6] to-[#8B5CF6]"
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={formData.github_url || ''}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                        Live URL
                      </label>
                      <input
                        type="url"
                        value={formData.live_url || ''}
                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#F1F5F9] mb-2">
                      Metrics (JSON format)
                    </label>
                    <textarea
                      value={JSON.stringify(formData.metrics, null, 2)}
                      onChange={(e) => {
                        try {
                          setFormData({ ...formData, metrics: JSON.parse(e.target.value) });
                        } catch (err) {
                          // Invalid JSON, ignore
                        }
                      }}
                      rows={3}
                      placeholder='{"users": "500+", "uptime": "99.9%"}'
                      className="w-full px-4 py-3 bg-[#0B1120] border border-[#1E3A5F] rounded-xl text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] resize-none font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-semibold hover:bg-[#2563EB] transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProject(null);
                        resetForm();
                      }}
                      className="px-6 py-3 bg-[#1A2333] border border-[#1E3A5F] text-[#F1F5F9] rounded-xl font-semibold hover:border-[#3B82F6] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
