# Web Content Management System — Frontend

An admin dashboard for managing the content of an organisation's public website. Signed-in staff use it to upload documents, publish events and news, and choose which items are shown publicly by switching them between **active** and **inactive**.

This repository contains only the frontend, a Vue 3 single-page app. It talks to a separate backend REST API, which handles authentication, storage and serving the public content.

## Features

| Section | What you can do |
| --- | --- |
| **Login** | Sign in with a username and password. The JWT that comes back is stored in `localStorage` and sent with every API request. |
| **Action Plan** | Upload PDF action plans, list them, and set each one active or inactive. |
| **Performance Report** | Upload PDF performance reports, list them, and set each one active or inactive. |
| **Hardware Specification** | Create specification types, upload several documents to each type, view the documents for a type, and set types and documents active or inactive. |
| **Events** | Create events with a name and description, upload several images to each event, and set events active or inactive. |
| **News** | Add, view, edit, activate and deactivate news items. |

**Roles:** any signed-in user can create, upload and change status. Only users with the `ROLE_SUPER_ADMIN` role see the **Delete** buttons.

**Session handling:** pages under `/home` require a token. If the API answers `401 Unauthorized`, the token is cleared and the user is sent back to the login page.

## Tech stack

- [Vue 3](https://vuejs.org/) with the Composition API (`setup()`)
- [Vite 5](https://vitejs.dev/) for the dev server and build
- [Vue Router 4](https://router.vuejs.org/) for routing and route guards
- [Pinia](https://pinia.vuejs.org/) for auth state
- [Axios](https://axios-http.com/) for HTTP, with interceptors that add the token and handle 401s
- [Tailwind CSS 3](https://tailwindcss.com/), [Flowbite](https://flowbite.com/) and [tailwindcss-animated](https://www.tailwindcss-animated.com/) for styling

## Getting started

### Prerequisites

- Node.js 18 or newer, and npm
- The backend API running and reachable (by default at `http://localhost:8080`)

### Install and run

```sh
git clone https://github.com/bad2EKKO/Web-Content-Management-System-Frontend-Vue.js.git
cd Web-Content-Management-System-Frontend-Vue.js
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). You will be redirected to `/login`.

### Configuration

The API base URL comes from `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Change it to point at your backend. For machine-specific values, put them in `.env.local` instead, which Vite loads on top of `.env`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

> The app uses HTML5 history routing (`createWebHistory`), so in production the web server must send unknown paths to `index.html`.

## Project structure

```
├── public/                     # Static files (favicon, login/home wallpapers)
├── src/
│   ├── main.js                 # App entry: Pinia, router, global components, $axios
│   ├── App.vue                 # Root layout: <router-view> + footer
│   ├── axiosInstance.js        # Axios instance: adds Bearer token, handles 401 → login
│   ├── Services/
│   │   └── baseURL.js          # Plain Axios instance, used for login
│   ├── Stores/
│   │   └── authStore.js        # Pinia store: login/logout, token, user and roles
│   ├── router/
│   │   └── index.js            # Routes, auth guard, page titles
│   ├── components/
│   │   ├── Login.vue
│   │   ├── Home.vue            # Layout for signed-in pages (nav bar + child route)
│   │   ├── HomeView.vue        # Welcome screen
│   │   ├── NavigationBar.vue
│   │   ├── Footer.vue
│   │   ├── ActionPlan.vue
│   │   ├── PerformanceReport.vue
│   │   ├── HardwareSpecification.vue
│   │   ├── Events.vue
│   │   ├── News.vue
│   │   └── PageNotFound.vue
│   └── assets/                 # Global CSS (Tailwind) and logo
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js              # Vue plugin, `@` → `src` alias
```

## Routes

| Path | Page | Auth required |
| --- | --- | --- |
| `/` | Redirects to `/login` | No |
| `/login` | Login | No |
| `/home` | Redirects to `/home/view` | Yes |
| `/home/view` | Welcome screen | Yes |
| `/home/action` | Action Plan | Yes |
| `/home/performance` | Performance Report | Yes |
| `/home/hardware_spec` | Hardware Specification | Yes |
| `/home/event` | Events | Yes |
| `/home/news` | News | Yes |
| any other path | 404 page | No |

## Backend API

The frontend expects the following endpoints, relative to `VITE_API_BASE_URL`. `/api/admin/**` calls send `Authorization: Bearer <token>`. Status updates send `{ "status": 1 }` to activate and `{ "status": 0 }` to deactivate.

<details>
<summary>Endpoint list</summary>

**Auth**

| Method | Endpoint | Notes |
| --- | --- | --- |
| POST | `/api/auth/signin` | Body `{ username, password }`. Returns `{ accessToken, id, username, email, roles }` |

**Action plans**

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/public/action-pdfs` | List all |
| POST | `/api/admin/action-pdf` | Multipart, field `file` |
| PUT | `/api/admin/action-pdf/status/{id}` | Change status |
| DELETE | `/api/admin/action-pdf/{id}` | Super admin only |

**Performance reports**

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/public/performance-pdfs` | List all |
| POST | `/api/admin/performance-pdf` | Multipart, field `file` |
| PUT | `/api/admin/performance-pdf/status/{id}` | Change status |
| DELETE | `/api/admin/performance-pdf/{id}` | Super admin only |

**Hardware specifications**

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/public/hardware-specifications` | List types |
| POST | `/api/admin/hardware-specification` | Body `{ specificationType }` |
| PUT | `/api/admin/hardware-specification/status/{id}` | Change type status |
| DELETE | `/api/admin/hardware-specification/{id}` | Super admin only |
| GET | `/api/public/hardware-specification/{id}/specify-docs` | List documents for a type |
| POST | `/api/admin/hardware-specification/specify-doc/{id}` | Multipart, field `docs` (several files) |
| PUT | `/api/admin/hardware-specification/specify-doc/status/{id}` | Change document status |
| DELETE | `/api/admin/hardware-specification/specify-doc/{id}` | Super admin only |

**Events**

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/public/events` | List all |
| POST | `/api/admin/event` | Body `{ eventName, moreContent }` |
| POST | `/api/admin/event/{id}/media` | Multipart, field `files` (several images) |
| PUT | `/api/admin/event/status/{id}` | Change status |
| DELETE | `/api/admin/event/{id}` | Super admin only |

**News**

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/admin/news` | List all |
| GET | `/api/admin/news/{id}` | Get one |
| POST | `/api/admin/news` | Body `{ title, content }` |
| PUT | `/api/admin/news/{id}` | Update |
| PUT | `/api/admin/news/status/{id}` | Change status |
| DELETE | `/api/admin/news/{id}` | Super admin only |

</details>

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) with the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (formerly Volar). Disable Vetur if you have it installed.
