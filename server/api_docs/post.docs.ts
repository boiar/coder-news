/**
 * @openapi
 * /posts:
 *   get:
 *     summary: List all posts
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       url:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       postedAt:
 *                         type: number
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /create_post:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: A post with this URL already exists
 *       500:
 *         description: Internal server error
 */
