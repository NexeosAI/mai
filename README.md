# MAI

## Technical Overview
Monorepo structured into modular services:

- **frontend** — Vite + React app (UI layer)  
- **server** — Node.js + Express (backend logic, LLM orchestration)  
- **collector** — Document ingestion and parsing  
- **embed** — Widget subsystem for external embedding  
- **browser-extension** — Browser-side integrations  
- **docker** — Deployment scripts and templates  

## Capabilities
- Multi-LLM provider support  
- Real-time and batch document workflows  
- Vector database abstraction  
- Local and cloud deployment options  

## Development Setup
- Environment configuration via `.env` files  
- Build & dev scripts per service  
- Shared utilities in monorepo  
- Code quality enforced with linting and formatting  

## Deployment
- Fully containerised (Docker)  
- Modular deployment of all components  

## Status
Currently in **active development**. Technical details subject to change.
