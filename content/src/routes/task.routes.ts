import Router = require("express");
const taskController = require("../controllers/task.controler");

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Récupérer la liste des tâches
 *     description: Retourne une liste de tâches, filtrable par priorité et recherche textuelle.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: priority
 *         required: false
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filtre par niveau de priorité
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Mot-clé pour rechercher dans le titre (insensible à la casse)
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                      type: string
 *                   priority:
 *                     type: string
 *                     enum: [low, medium, high]
 *                   completed:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur lors de la récupération des données
 */

router.get("/api/tasks", taskController.getTasks);

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Créer une nouvelle tâche
 *     description: Permet d'ajouter une nouvelle tâche avec un titre, une description et un niveau de priorité.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Apprendre Prisma"
 *               description:
 *                 type: string
 *                 example : Cette tâche consiste à apprendre les notion avancées du Prisma
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "c9a8f7e2-3d44-4c12-b111-5a9c6c1b9d5f"
 *                 title:
 *                   type: string
 *                   example: "Apprendre Prisma"
 *                 description:
 *                    type: string
 *                    example : Cette tâche consiste à apprendre les notion avancées du Prisma
 *                 priority:
 *                   type: string
 *                   enum: [low, medium, high]
 *                 completed:
 *                   type: boolean
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Données invalides envoyées
 *       500:
 *         description: Erreur serveur lors de la création de la tâche
 */
router.post("/", taskController.createTasks);

module.exports = router;