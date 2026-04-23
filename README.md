# Job Portal Platform
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-NextAuth-000000)

A full-stack, role-based recruitment web app where candidates apply for jobs, employers manage postings, and admins control the platform.

## Overview

This project is a **Job Portal** built with **Next.js + Prisma + MySQL**.  
It supports three user roles:
- **Candidate**: create resumes, browse jobs, apply to positions
- **Employer**: post jobs, manage listings, review applications
- **Admin**: manage users, jobs, resumes, and applications
  
---
## Core Highlights

- **Role-based access control** for `ADMIN`, `EMPLOYER`, and `CANDIDATE`
- **JWT session flow with refresh tokens** stored in database
- **End-to-end resume management** (education, experience, skills, active status)
- **Employer hiring workflow** (post jobs, review applicants, update application status)
- **Admin analytics + moderation dashboard** for users, jobs, resumes, applications
- **Cloudinary profile image upload** integration

## Key Features by Role

### Candidate

- Create account and manage profile
- Create/edit resumes
- Add education, experience, and skills
- Activate/deactivate resume
- Browse jobs and apply
- Track personal applications
  
### Employer

- Create/edit/delete job postings
- View candidate applications
- Update application status (`PENDING`, `ACCEPTED`, `REJECTED`)

### Admin
- Dashboard with platform stats
- Manage users
- Manage jobs
- Manage resumes
- Moderate applications
---
## Tech Stack

- **Frontend:** Next.js (App Router), React 19, Bootstrap 5
- **Backend:** Next.js Route Handlers (`app/api`)
- **Database:** MySQL + Prisma ORM
- **Authentication:** NextAuth (Credentials Provider + Prisma Adapter)
- **Media Uploads:** Cloudinary
- **Utilities:** bcryptjs, date-fns, Fuse.js, react-toastify

## Project Structure

```text
LabCourse1/
|-- app/
|   |-- (pages)/                  # main app pages (dashboard, jobs, resumes, auth)
|   `-- api/                      # backend route handlers
|       |-- admin/
|       |-- applications/
|       |-- auth/
|       |-- contacts/
|       |-- job/
|       |-- resume/
|       `-- user/
|-- components/                   # reusable UI components
|-- lib/                          # auth config, db client, validators, helpers
|-- prisma/
|   |-- schema.prisma             # database schema
|   `-- seed.js                   # demo seed data
|-- public/
|   `-- assets/                   # images/icons/static assets
|-- middleware.js                 # auth page guards
|-- package.json
`-- README.md
```

## API Overview

- **Auth**: `/api/auth/[...nextauth]`
- **User**: `/api/user`, `/api/user/[id]`, `/api/user/[id]/changepassword`, `/api/user/phonenumber`, `/api/user/profileimg`
- **Job**: `/api/job`, `/api/job/[id]`, `/api/job/browse`, `/api/job/browse/[id]`
- **Resume**: `/api/resume`, `/api/resume/[id]`, `/api/resume/activate`, `/api/resume/[id]/education`, `/api/resume/[id]/experience`, `/api/resume/[id]/skills`, `/api/resume/browse`, `/api/resume/browse/[id]`
- **Applications**: `/api/applications`, `/api/applications/candidate`
- **Admin**: `/api/admin/jobs`, `/api/admin/resumes`, `/api/admin/applications`, `/api/admin/users/employers`, `/api/admin/users/candidates`
- **Contact**: `/api/contacts`, `/api/contacts/[id]`

## Database Model (Prisma)

Core entities in Prisma:

- `User`, `PhoneNumber`, `RefreshToken`
- `Admin`, `Employer`, `Candidate`
- `Job`, `Application`
- `Resume`, `Education`, `Experience`
- `Skill`, `SkillsOnResumes`
- `Contact`
---
## Local Setup

###1) Clone and Install dependencies

```bash
npm install
```
###2) Create `.env`

```env
DATABASE_URL="mysql://<user>:<password>@127.0.0.1:3306/<database>"
NEXTAUTH_SECRET="<random-secret>"
AUTH_SECRET="<optional-auth-secret>"
NEXT_PUBLIC_BASE_URL="http://localhost:3000/"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<cloudinary-cloud-name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<cloudinary-api-key>"
CLOUDINARY_API_SECRET="<cloudinary-api-secret>"
```

###3) Prepare database

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4) Start app

```bash
npm run dev
```

Application runs at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run lint checks
- `npx prisma db seed` - seed demo data
  
## Demo Seed Data

Seeding adds:
- admin account
- multiple employers and candidates
- jobs across multiple employment types
- resumes with skills/experience/education
- candidate job applications with mixed statuses

## Future Improvements
- Add automated tests (unit/integration/E2E)
- Add pagination/filtering for large datasets
- Add CI pipeline for lint/test/build checks
- Add Docker setup for one-command local environment
