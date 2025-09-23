/**
 * File: StudentMarketplace.js
 * Purpose: Provides a lightweight marketplace service for sharing and discovering student-built tools
 * Location: src/studentsai/marketplace/
 */

class StudentMarketplace {
  constructor() {
    this.tools = new Map();
  }

  _getToolId(tool) {
    if (!tool || typeof tool !== 'object') {
      return null;
    }

    if (tool.id) {
      return String(tool.id);
    }

    if (tool.name) {
      return String(tool.name).toLowerCase();
    }

    return null;
  }

  _normalizeTags(tags) {
    if (!Array.isArray(tags)) {
      return [];
    }

    return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))];
  }

  _normalizeQuery(query) {
    if (typeof query === 'string') {
      return {
        term: query.toLowerCase().trim(),
        type: '',
        tags: [],
      };
    }

    if (!query || typeof query !== 'object') {
      return { term: '', type: '', tags: [] };
    }

    const normalized = {
      term: query.term || query.name || query.text || '',
      type: query.type || query.toolType || '',
      tags: this._normalizeTags(query.tags),
    };

    return {
      term: String(normalized.term).toLowerCase().trim(),
      type: String(normalized.type).toLowerCase().trim(),
      tags: normalized.tags.map((tag) => tag.toLowerCase()),
    };
  }

  _matchesQuery(entry, query) {
    const { tool, metadata } = entry;
    const { term, type, tags } = query;

    const toolType = String(tool.type || metadata.type || '').toLowerCase();
    if (type && toolType !== type) {
      return false;
    }

    if (tags.length) {
      const toolTags = new Set(
        this._normalizeTags(metadata.tags || tool.tags).map((tag) => tag.toLowerCase()),
      );

      const hasAllTags = tags.every((tag) => toolTags.has(tag));
      if (!hasAllTags) {
        return false;
      }
    }

    if (!term) {
      return true;
    }

    const searchSpace = [
      tool.name,
      tool.description,
      metadata.description,
      ...(Array.isArray(tool.keywords) ? tool.keywords : []),
      ...(Array.isArray(metadata.tags) ? metadata.tags : []),
    ]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    return searchSpace.some((value) => value.includes(term));
  }

  async shareStudentTool(tool, metadata = {}) {
    if (!tool || typeof tool !== 'object') {
      return {
        success: false,
        error: 'Tool details must be provided as an object.',
      };
    }

    const toolId = this._getToolId(tool);
    if (!toolId) {
      return {
        success: false,
        error: 'A tool must include a unique id or name.',
      };
    }

    const normalizedMetadata = {
      ...metadata,
      type: metadata.type || tool.type || null,
      tags: this._normalizeTags(metadata.tags || tool.tags),
      sharedAt: metadata.sharedAt || new Date().toISOString(),
    };

    this.tools.set(toolId, {
      tool,
      metadata: normalizedMetadata,
    });

    return {
      success: true,
      tool,
      metadata: normalizedMetadata,
    };
  }

  async discoverStudentTools(query = {}) {
    const normalizedQuery = this._normalizeQuery(query);

    return Array.from(this.tools.values())
      .filter((entry) => this._matchesQuery(entry, normalizedQuery))
      .map(({ tool, metadata }) => ({ tool, metadata }));
  }
}

export default StudentMarketplace;
