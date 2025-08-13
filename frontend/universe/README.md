## Universe Frontend (Vite + React + MUI)

### Scripts

- dev: `npm run dev` → starts Vite dev server (default `http://localhost:5173`)
- build: `npm run build` → outputs production build to `build/`
- preview: `npm run preview` → serves the production build locally

### Environment variables
Create a `.env` (or `.env.local`) at the project root:

```
VITE_API_URL=http://localhost:8000/
VITE_APP_USER_MANAGEMENT_SERVICE_BASE_URL=http://localhost:8001/
```

Access via `import.meta.env.VITE_*` in code.

### Structure
- Entry: `index.html` → `src/index.tsx`
- App shell and routes: `src/App.tsx`
- Theme: `src/shared-theme/AppTheme.tsx` and `src/customizations/*`
- State: Redux Toolkit + redux-persist in `src/store/*`
- Screens and components: `src/system-parts/universe/*`
