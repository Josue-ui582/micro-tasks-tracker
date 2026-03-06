# Micro Tasks Tracker

## Description

Micro Tasks Tracker est une application web permettant de gérer des micro-tâches avec un système de priorité.

Chaque tâche peut être :

* low
* medium
* high

L'application permet de :

* créer des tâches
* filtrer les tâches par priorité
* rechercher des tâches
* modifier le statut d'une tâche

Le projet est divisé en deux parties :

* **content/** → Backend (Node.js + Express + TypeScript + Tailwind CSS)
* **web/** → Frontend (Next.js + TypeScript + Postgresql + Prisma)

---

# Prérequis

* Node.js (via **NVM** recommandé)
* npm
* Git

---

# Installation

Cloner le projet :

```bash
git clone <repo-url>
cd micro-tasks-tracker
```

Installer la version de Node :

```bash
nvm install 20
nvm use 20
```

---

# Lancer le Backend

```bash
cd content
nvm use 20
npm install
npm run dev
```

Le serveur backend sera accessible sur :

```
http://localhost:5000
```

---

# Lancer le Frontend

Dans un autre terminal :

```bash
cd web
nvm use 20
npm install
npm run dev
```

L'application sera accessible sur :

```
http://localhost:3000
```

---

# Structure du projet

```
micro-tasks-tracker
│
├── content/   → Backend Express
├── web/       → Frontend Next.js
├── .nvmrc
├── .gitignore
└── README.md
```

---

# Technologies utilisées

Frontend :

* Next.js
* TypeScript
* Tailwind CSS

Backend :

* Node.js
* Express
* TypeScript
* Posgresql
* Prisma

---

# Fonctionnalités prévues

* création de tâche
* filtrage par priorité
* recherche avec debounce
* mise à jour du statut d'une tâche

---

# Convention de commit

Le projet utilise **Conventional Commits**.

Exemples :

```
feat(content): add task creation endpoint
feat(web): implement priority filter
fix(content): correct task update logic
```
