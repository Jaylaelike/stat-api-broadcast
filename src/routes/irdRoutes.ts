import { Router } from 'express';
import * as irdController from '../controllers/irdController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: IRD
 *   description: IRD data management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     IrdData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the IRD data.
 *         Station:
 *           type: string
 *           description: The station name.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the data.
 *         C_N:
 *           type: number
 *           description: C/N value.
 *         Eb_No:
 *           type: number
 *           description: Eb/No value.
 *         Link_Margin:
 *           type: number
 *           description: Link Margin value.
 *         AGC:
 *           type: number
 *           description: AGC value.
 *         LNB_Current:
 *           type: number
 *           description: LNB Current value.
 *         LNB_Voltage:
 *           type: number
 *           description: LNB Voltage value.
 *         SAT_Latitude:
 *           type: number
 *           description: Satellite Latitude.
 *         SAT_Longitude:
 *           type: number
 *           description: Satellite Longitude.
 *         IRD_Latitude:
 *           type: number
 *           description: IRD Latitude.
 *         IRD_Longitude:
 *           type: number
 *           description: IRD Longitude.
 *         Antenna_Angle:
 *           type: number
 *           description: Antenna Angle.
 *       example:
 *         id: 12345
 *         Station: "BKK_1"
 *         time: "2024-07-29T10:30:00Z"
 *         C_N: 15.2
 *         Eb_No: 10.5
 *         Link_Margin: 5.1
 *         AGC: 60.3
 *         LNB_Current: 150
 *         LNB_Voltage: 13.5
 *         SAT_Latitude: 0.0
 *         SAT_Longitude: 100.5
 *         IRD_Latitude: 13.7563
 *         IRD_Longitude: 100.5018
 *         Antenna_Angle: 180.0
 *     IrdFilterResponse:
 *       type: object
 *       properties:
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IrdData'
 */

/**
 * @swagger
 * /api/ird_all:
 *   get:
 *     summary: Retrieve a list of the last 100 IRD data entries
 *     tags: [IRD]
 *     responses:
 *       200:
 *         description: A list of IRD data entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IrdData'
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/ird_all', irdController.getIrdAllController);

/**
 * @swagger
 * /api/ird_filter/{station}:
 *   get:
 *     summary: Retrieve IRD data for a specific station
 *     tags: [IRD]
 *     parameters:
 *       - in: path
 *         name: station
 *         schema:
 *           type: string
 *         required: true
 *         description: The Thai name of the station (e.g., กรุงเทพ)
 *     responses:
 *       200:
 *         description: A list of IRD data entries for the specified station, wrapped in an 'orders' object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IrdFilterResponse'
 *       400:
 *         description: Bad Request - Station parameter is required
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/ird_filter/:station', irdController.getIrdFilterController);

export default router;
