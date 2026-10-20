# drawing-things-angular — Frontend Requirements

## 1. Project Overview

- **Project Name**: drawing-things-angular
- **Purpose**: A free, browser-based web application for designing clothing patterns (t-shirts and pants) with 2D line/point editing and 3D visualization. Users can register, save designs, and zoom/pan across both 2D and 3D views. Accessible globally from any country.
- **Target Platform**: Web browser (desktop-first, macOS 2019 compatible).

## 2. Technology Stack & Versions

The frontend must be built with Angular using TypeScript, integrated with Three.js for 3D rendering and Canvas 2D (or SVG) for 2D pattern drawing.

### 2.1 Core Framework Versions

| Package | Required Version | Rationale |
| --- | --- | --- |
| Angular | ^22.0.0 | Latest stable major release (v22, released June 2026). Brings stable Signal Forms, OnPush by default, and improved tooling. |
| Node.js | ^22.22.3 or ^24.15.0 or ^26.0.0 | Required by Angular 22. Node 20 is no longer supported. |
| TypeScript | >=6.0.0 <6.1.0 | Angular 22 requires TypeScript 6. |
| RxJS | ^6.5.3 or ^7.4.0 | Compatible with Angular 22. |

### 2.2 3D Rendering

| Package | Required Version | Rationale |
| --- | --- | --- |
| three | ^0.186.0 (r186) | Latest Three.js release with WebGPU support, improved OrbitControls, and WebGL renderer. |
| @types/three | ^0.186.0 | TypeScript definitions for Three.js. |

### 2.3 3D Integration Options for Angular

Two viable approaches, select based on Angular version compatibility:

**Option A (Recommended): Native Three.js with OrbitControls**

- Direct integration using Three.js `WebGLRenderer` + `OrbitControls` addon.
- OrbitControls provides built-in zoom (`minDistance`, `maxDistance`), pan, and rotate.
- No extra Angular wrapper dependency; maximum control over rendering pipeline.

**Option B: @ngx-3d/viewport**

- Angular component-based wrapper for Three.js.
- Requires Angular 20.3.0+ and Three.js 0.181.0+.
- Provides `<n3d-element>` component with `[enableZoom]` and `[enablePan]` inputs.
- Compatibility note: Confirm Angular 22 compatibility before adopting; library may lag behind latest Angular major version.

### 2.4 2D Drawing & Zoom/Pan

| Package | Required Version | Rationale |
| --- | --- | --- |
| Canvas 2D API | Native browser | No dependency required for basic line/point rendering. |
| panzoom (optional) | Latest | Lightweight library for 2D canvas zoom/pan with minZoom/maxZoom configuration. |

For 2D zoom/pan, implement using native Canvas `ctx.transform()` or adopt `panzoom` if gesture support (wheel, touch) is desired with minimal code.

## 3. Functional Requirements

### 3.1 User Registration & Authentication (Frontend Scope)

- Registration form with email/password fields.
- Login form with JWT storage (handled via backend integration).
- Token refresh handling (silent refresh before expiry).
- Protected routes: design editor accessible only when authenticated.

> **Note**: JWT issuance and validation are backend responsibilities; frontend stores and attaches tokens to API requests.

### 3.2 2D Pattern Editor

| Requirement | Description |
| --- | --- |
| Line Drawing | Draw straight lines and curves on a 2D canvas. |
| Point Placement | Add, move, and delete control points. |
| Zoom | Zoom in/out on the 2D canvas (wheel or buttons), with configurable min/max scale. |
| Pan | Drag the canvas to navigate the drawing area. |
| Scale Display | Show current zoom level (e.g., "150%") to the user. |
| Grid/Reference | Optional grid overlay for measurement reference. |
| Undo/Redo | Basic undo/redo for draw/point operations. |

### 3.3 3D Visualization

| Requirement | Description |
| --- | --- |
| 3D Viewport | Render a 3D view of the clothing pattern (t-shirt or pants). |
| Orbit Controls | Rotate around the model, zoom in/out, and pan the view. |
| Zoom Limits | Configure `minDistance` and `maxDistance` to prevent excessive zoom. |
| Model Loading | Support loading GLTF/GLB models for clothing preview. |
| Responsive Canvas | 3D canvas resizes with window/viewport changes. |

### 3.4 Project/Design Management

- Create new design (choose t-shirt or pants).
- Save current design (2D points/lines + 3D view state) to backend.
- Load existing designs from backend.
- List user's saved designs.
- Delete design.

### 3.5 UI/UX

- Split view: 2D editor (left) and 3D preview (right), resizable panels.
- Toolbar with tools: select, draw line, add point, delete, zoom controls.
- Responsive layout (minimum width: 1024px for desktop use).
- Loading states for model loading and API calls.
- Error notifications (toast or banner).

## 4. Non-Functional Requirements

| Requirement | Detail |
| --- | --- |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions). WebGL 1.0+ required for 3D. |
| Performance | 3D rendering at >=30 FPS for standard clothing models. 2D canvas operations responsive (<100ms). |
| Accessibility | Keyboard navigation for toolbar actions. ARIA labels on interactive controls. |
| Internationalization | English UI initially; structure prepared for future i18n. |
| Free & Open | All libraries must be MIT or similarly permissive licenses. No paid dependencies. |
| Global Access | Static build deployable to CDN; no region restrictions. |

## 5. Project Structure (Current)

The project follows a **layout shell + feature modules** architecture. `App` boots the router; `LayoutComponent` composes the application shell (header / body / footer, with left and right panels inside the body); feature code lives under `features/`; singleton services live under `core/`.

Naming convention: Angular files use the `*.component.*` suffix (`header.component.ts`, `header.component.html`, `header.component.scss`, `header.component.spec.ts`).

```text
drawing-things-angular/
│
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── settings.json
│
├── public/
│   ├── favicon.ico
│   └── assets/                        # GLTF/GLB models, textures, icons
│
├── src/
│   ├── app/
│   │   ├── core/                      # Singleton services, guards, interceptors
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.service.spec.ts
│   │   │   └── state/
│   │   │       ├── design-state.service.ts       # Shared 2D/3D design state (Signals)
│   │   │       └── design-state.service.spec.ts
│   │   │
│   │   ├── layout/                    # Application shell
│   │   │   ├── layout.component.ts           # Orchestrates the shell regions
│   │   │   ├── layout.component.html
│   │   │   ├── layout.component.scss
│   │   │   ├── layout.component.spec.ts
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts       # Top bar
│   │   │   │   ├── header.component.html
│   │   │   │   ├── header.component.scss
│   │   │   │   └── header.component.spec.ts
│   │   │   ├── body/
│   │   │   │   ├── body.component.ts         # Central area (hosts left/right panels)
│   │   │   │   ├── body.component.html
│   │   │   │   ├── body.component.scss
│   │   │   │   └── body.component.spec.ts
│   │   │   ├── left/
│   │   │   │   ├── left.component.ts         # Left panel (2D editor region)
│   │   │   │   ├── left.component.html
│   │   │   │   ├── left.component.scss
│   │   │   │   └── left.component.spec.ts
│   │   │   ├── right/
│   │   │   │   ├── right.component.ts        # Right panel (3D preview region)
│   │   │   │   ├── right.component.html
│   │   │   │   ├── right.component.scss
│   │   │   │   └── right.component.spec.ts
│   │   │   └── footer/
│   │   │       ├── footer.component.ts       # Bottom bar
│   │   │       ├── footer.component.html
│   │   │       ├── footer.component.scss
│   │   │       └── footer.component.spec.ts
│   │   │
│   │   ├── features/                  # Feature modules (lazy-loaded via routes)
│   │   │   └── editor/
│   │   │       ├── two-dimensions/           # 2D pattern drawing (Canvas 2D)
│   │   │       │   ├── two-dimensions.component.ts
│   │   │       │   ├── two-dimensions.component.html
│   │   │       │   ├── two-dimensions.component.scss
│   │   │       │   └── two-dimensions.component.spec.ts
│   │   │       └── three-dimensions/         # 3D viewport (Three.js + OrbitControls)
│   │   │           ├── three-dimensions.component.ts
│   │   │           ├── three-dimensions.component.html
│   │   │           ├── three-dimensions.component.scss
│   │   │           └── three-dimensions.component.spec.ts
│   │   │
│   │   ├── app.ts                     # Root component
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.spec.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                    # Global styles
│
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── LICENSE
└── README.md
```

### Planned additions (not yet implemented)

| Path | Purpose |
| --- | --- |
| `core/auth/auth.guard.ts`, `auth.interceptor.ts`, `token-storage.service.ts` | Route protection and JWT handling |
| `core/api/` | `design-api.service.ts` + API config |
| `core/models/` | `design`, `point`, `line`, `user` models |
| `shared/` | Reusable components (toolbar, zoom-controls, toast, loading-spinner), directives, pipes |
| `features/auth/` (`login/`, `register/`) | Authentication feature |
| `features/designs/` (`design-list/`, `design-create/`) + `designs.routes.ts` | Design management feature |
| `public/assets/` | GLTF/GLB models (`tshirt.glb`, `pants.glb`), fabric textures, UI icons |
| `src/environments/` | `environment.ts` / `environment.prod.ts` |
| `e2e/` | End-to-end tests (Playwright/Cypress) |

## 6. Backend Integration Points (Frontend Contracts)

The frontend expects the following API endpoints (backend implementation not covered here):

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | Login, returns JWT |
| `/api/auth/refresh` | POST | Refresh JWT |
| `/api/designs` | GET | List user designs |
| `/api/designs` | POST | Create design |
| `/api/designs/:id` | GET | Load design |
| `/api/designs/:id` | PUT | Update design |
| `/api/designs/:id` | DELETE | Delete design |

All design endpoints require `Authorization: Bearer <JWT>` header.

## 7. Key Implementation Notes

- **Angular 22 default OnPush**: Components will use `ChangeDetectionStrategy.OnPush` by default. Ensure Three.js render loop and Canvas operations trigger proper change detection via `NgZone.runOutsideAngular()` for performance-critical animations.
- **Three.js version pinning**: Lock `three` to `^0.186.0` to avoid breaking changes from r187+. The OrbitControls import path is `three/addons/controls/OrbitControls.js`.
- **2D/3D coordination**: When a user modifies a 2D pattern point, the 3D view should optionally reflect the change (e.g., re-generate mesh). Define a shared state service (Angular Signal) for design data.
- **Zoom/scale requirement**: Both 2D and 3D views must expose zoom controls. For 3D, `OrbitControls.enableZoom = true` with `minDistance`/`maxDistance`. For 2D, implement scale transform on the canvas context with a UI slider or button controls.

## 8. Current Dependencies (package.json)

### Runtime

| Package | Version |
| --- | --- |
| `@angular/common` | ^22.0.0 |
| `@angular/compiler` | ^22.0.0 |
| `@angular/core` | ^22.0.0 |
| `@angular/forms` | ^22.0.0 |
| `@angular/platform-browser` | ^22.0.0 |
| `@angular/router` | ^22.0.0 |
| `rxjs` | ~7.8.0 |
| `three` | ^0.186.1 |
| `tslib` | ^2.3.0 |

### Dev

| Package | Version |
| --- | --- |
| `@angular/build` | ^22.0.4 |
| `@angular/cli` | ^22.0.4 |
| `@angular/compiler-cli` | ^22.0.0 |
| `@types/three` | ^0.186.0 |
| `typescript` | ~6.0.2 |
| `vitest` | ^4.0.8 |
| `jsdom` | ^28.0.0 |
| `prettier` | ^3.8.1 |

> **Pending per spec**: `panzoom` (optional, for 2D canvas zoom/pan gestures) is not yet installed.

## 9. Commands

```bash
npm install      # Instalar dependencias
npm start        # Servidor de desarrollo (ng serve)
npm run build    # Build de producción (ng build)
npm run watch    # Build en modo watch (development)
npm test         # Ejecutar tests (ng test / vitest)
```

### Dependencias 3D (Three.js)

`three` y `@types/three` ya están instalados. Si fuera necesario reinstalarlos:

```bash
npm install three                    # Librería de renderizado 3D
npm install --save-dev @types/three  # Definiciones de TypeScript para Three.js
```

## 10. Maintenance

```bash
ng update                                                   # Ver actualizaciones disponibles
ng update @angular/core @angular/cli @angular/build         # Actualizar Angular
npm audit                                                   # Verificar vulnerabilidades
npm audit fix                                               # Corregir vulnerabilidades compatibles
```
