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

module.exports = router;