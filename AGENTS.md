# AGENTS.md – Project Coding Rules & Guidelines

## Purpose
This file defines **rules and constraints** for all AI assistants (Codex, Cursor, Windsurf, etc.) and human developers contributing to this repository.  
It ensures consistency, safety, and maintainability across the StudentsAI / McCaigs AI Suite codebase.

---

## Global Rules
- ❌ **Never output Git conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`).  
- ❌ **Do not modify AnythingLLM core files directly**.  
- ✅ **All new code must go under `src/studentsai/`** unless explicitly stated otherwise.  
- ✅ If extension of core functionality is required, create wrappers in `src/studentsai/` and integrate via hooks (e.g., `StudentsAIWrapper.js`).  
- ✅ Ensure changes are idempotent: rerunning prompts should not duplicate code or break existing behaviour.  

---

## File & Folder Rules
- **StudentsAI-specific code**:  
  - `src/studentsai/workshop-engine/` → Workshop Engine modules.  
  - `src/studentsai/voice-integration/` → Voice tutor components.  
  - `src/studentsai/student-tools/` → Prebuilt student tool templates.  
  - `src/studentsai/marketplace/` → Student marketplace scaffolding.  
  - `src/studentsai/config/` → Config files (UK/US universities, payments, locales).  
  - `src/studentsai/components/` → Student-specific UI components.  
- **Future multi-brand code** must live in `src/mccaigs-foundation/`.  
- Keep **integration hooks** in `StudentsAIWrapper.js`.  

---

## Coding Style
- **Language:** JavaScript / TypeScript (ES6+ syntax).  
- **Modules:** Use ES6 `import` / `export`.  
- **Classes:** Use `class` syntax for engines, tutors, marketplaces.  
- **Functions:** Use `async/await` for async code.  
- **Formatting:**  
  - 2-space indentation  
  - Single quotes for strings `'like this'`  
  - Trailing commas in objects/arrays  
  - Always end files with a newline  

---

## Naming Conventions
- **Classes:** `PascalCase` → e.g., `StudentWorkshopEngine`  
- **Files:** `PascalCase.js` for classes → e.g., `StudentVoiceTutor.js`  
- **Config files:** `kebab-case.js` → e.g., `uk-universities.js` / `us-universities.js`  
- **Variables & functions:** `camelCase` → e.g., `generateStudentTool`  
- **Namespaces:** All student-specific modules must live under `studentsai/`  

---

## Documentation & Comments
- Each new file must begin with a header comment:  
  ```js
  /**
   * File: StudentWorkshopEngine.js
   * Purpose: Implements the Workshop Engine for university students
   * Location: src/studentsai/workshop-engine/
   */
