# Ryan Carter Portfolio

A modern, dark-mode portfolio concept for a fictional senior full-stack engineer. The UI is built with React, Vite, Tailwind CSS, and Framer Motion, with a FastAPI backend serving the editable portfolio data.

## What you get

- React + Vite frontend
- Tailwind-powered visual system
- Framer Motion interactions and animated sections
- FastAPI backend for profile and contact data
- A contact form that talks to Python during development
- A single JSON content source for easy editing

## Project Structure

- `src/` contains the React interface and styling
- `backend/` contains the FastAPI app
- `backend/portfolio_content.json` contains the editable portfolio content served by `/api/profile`
- `.github/copilot-instructions.md` stores workspace guidance

## Run It

1. Install frontend dependencies:

```bash
npm install
```

2. Install backend dependencies:

```bash
python -m pip install -r backend/requirements.txt
```

3. Start the Python API:

```bash
npm run backend
```

4. In a second terminal, start the frontend:

```bash
npm run dev
```

The React app runs on `http://localhost:5173` and proxies API requests to `http://127.0.0.1:8000`.

## Editing Content

Edit `backend/portfolio_content.json` to change:

- profile copy and stats
- social links
- project cards and project links
- capabilities, experience, process, and testimonials
- contact details

The frontend fetches this file through the FastAPI API, so you only need to update one place.

## Next Ideas

- Replace the fictional persona with a real client or your own details
- Swap placeholder project URLs with live case studies or screenshots
- Add an admin editor or lightweight CMS if you want non-technical editing later