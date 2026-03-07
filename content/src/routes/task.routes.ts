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

router.get("/", taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
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
 *                   enum: [low, ledium, high]
 *                 status:
 *                   type: string
 *                   example: En_cours
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Données invalides envoyées
 *       500:
 *         description: Erreur serveur lors de la création de la tâche
 */
router.post("/", taskController.createTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Mettre à jour le statut d'une tâche
 *     description: Permet de modifier le statut d'une tâche existante.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la tâche
 *         schema:
 *           type: string
 *           example: "c9a8f7e2-3d44-4c12-b111-5a9c6c1b9d5f"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nouveau statut de la tâche
 *                 enum: [PENDING, COMPLETED]
 *                 example: PENDING
 *     responses:
 *       200:
 *         description: Statut de la tâche mis à jour avec succès
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
 *                 priority:
 *                   type: string
 *                   enum: [LOW, MEDIUM, HIGH]
 *                 status:
 *                   type: string
 *                   enum: [PENDING, COMPLETED]
 *                   example: PENDING
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Tâche non trouvée
 *       500:
 *         description: Erreur serveur lors de la mise à jour
 */
router.patch("/:id", taskController.updateTaskStatus);

module.exports = router;