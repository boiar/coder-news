/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       400:
 *         description: Bad request
 *       403:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email_or_username
 *               - password
 *             properties:
 *               email_or_username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT and user info
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
