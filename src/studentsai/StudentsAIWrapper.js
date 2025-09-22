/**
 * File: StudentsAIWrapper.js
 * Purpose: Coordinates StudentsAI integrations with the AnythingLLM core application
 * Location: src/studentsai/
 */

import StudentWorkshopEngine from './workshop-engine/StudentWorkshopEngine.js';

export default class StudentsAIWrapper {
  constructor({
    anythingLLMApp = null,
    apiRouter = null,
    logger = console,
    autoInit = true,
  } = {}) {
    this.anythingLLMApp = anythingLLMApp;
    this.apiRouter = apiRouter;
    this.logger = logger;
    this.studentWorkshopEngine = new StudentWorkshopEngine({ logger });
    this.menusRegistered = false;
    this.apisRegistered = false;

    if (autoInit) {
      this.initialize();
    }
  }

  initialize() {
    this.registerMenus();
    this.registerApis();
  }

  registerMenus() {
    if (this.menusRegistered) return;

    const menus = this.anythingLLMApp?.menus ?? this.anythingLLMApp?.menu;
    if (!menus) {
      this.logger?.warn?.('StudentsAIWrapper: AnythingLLM menu interface unavailable.');
      return;
    }

    const menuEntries = [
      {
        id: 'studentsai-study-workshop',
        label: 'Study Workshop',
        description: 'Launch StudentsAI study workshop tools.',
        category: 'StudentsAI',
        onSelect: () => this.studentWorkshopEngine.launchWorkshop(),
        handler: () => this.studentWorkshopEngine.launchWorkshop(),
      },
      {
        id: 'studentsai-voice-tutor',
        label: 'Voice Tutor',
        description: 'Access the StudentsAI voice tutoring experience.',
        category: 'StudentsAI',
        onSelect: () => this.studentWorkshopEngine.launchVoiceTutor(),
        handler: () => this.studentWorkshopEngine.launchVoiceTutor(),
      },
      {
        id: 'studentsai-student-tools',
        label: 'Student Tools',
        description: 'Open student productivity tools powered by StudentsAI.',
        category: 'StudentsAI',
        onSelect: () => this.studentWorkshopEngine.openStudentTools(),
        handler: () => this.studentWorkshopEngine.openStudentTools(),
      },
    ];

    const results = menuEntries.map((entry) => this.registerMenu(menus, entry));
    this.menusRegistered = results.some(Boolean);
  }

  registerMenu(menus, config) {
    if (typeof menus?.register === 'function') {
      menus.register(config);
      return true;
    }

    if (typeof menus?.add === 'function') {
      menus.add(config);
      return true;
    }

    if (typeof menus?.addItem === 'function') {
      menus.addItem(config);
      return true;
    }

    if (Array.isArray(menus)) {
      menus.push(config);
      return true;
    }

    if (Array.isArray(menus?.items)) {
      menus.items.push(config);
      return true;
    }

    this.logger?.warn?.(
      'StudentsAIWrapper: Unable to register menu item with AnythingLLM interface.',
      config,
    );
    return false;
  }

  registerApis() {
    if (this.apisRegistered) return;
    if (!this.apiRouter) {
      this.logger?.warn?.('StudentsAIWrapper: API router unavailable, skipping StudentsAI routes.');
      return;
    }

    const registeredRoutes = [
      this.registerApiRoute('post', '/student-workshop', async (request) =>
        this.studentWorkshopEngine.handleWorkshop(request.body ?? {}),
      ),
      this.registerApiRoute('post', '/voice-tutor', async (request) =>
        this.studentWorkshopEngine.handleVoiceTutor(request.body ?? {}),
      ),
      this.registerApiRoute('get', '/student-marketplace', async (request) =>
        this.studentWorkshopEngine.listMarketplace(request.query ?? {}),
      ),
    ];

    this.apisRegistered = registeredRoutes.some(Boolean);
  }

  registerApiRoute(method, path, executor) {
    if (typeof this.apiRouter?.[method] !== 'function') {
      this.logger?.warn?.(
        `StudentsAIWrapper: API router does not support method ${method.toUpperCase()} for ${path}.`,
      );
      return false;
    }

    this.apiRouter[method](path, async (request, response) => {
      try {
        const payload = await executor(request);
        response.status(200).json(payload);
      } catch (error) {
        this.logger?.error?.('StudentsAIWrapper: API execution failed.', error);
        response.status(error?.status ?? 500).json({
          error: error?.message ?? 'StudentsAI integration error',
        });
      }
    });

    return true;
  }
}
