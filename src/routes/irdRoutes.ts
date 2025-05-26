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
 * tags:
 *   name: DailyReporter
 *   description: Daily reporter data management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DailyReporterData:
 *       type: object
 *       properties:
 *         Engineering_center:
 *           type: string
 *           nullable: true
 *         Station:
 *           type: string
 *           nullable: true
 *         Status_:
 *           type: string
 *           nullable: true
 *         ip:
 *           type: string
 *           nullable: true
 *         Transmistion_Brand:
 *           type: string
 *           nullable: true
 *         No:
 *           type: string
 *           nullable: true
 *         Facility:
 *           type: string
 *           nullable: true
 *         Station_Eng:
 *           type: string
 *           nullable: true
 *         Station_Thai:
 *           type: string
 *           nullable: true
 *         Station_Type:
 *           type: string
 *           nullable: true
 *         Eng_No:
 *           type: integer
 *           nullable: true
 *         Eng_No_n:
 *           type: integer
 *           nullable: true
 *         TX_ANT:
 *           type: string
 *           nullable: true
 *         RF_Power:
 *           type: number
 *           format: float 
 *           nullable: true
 *         SFN:
 *           type: string
 *           nullable: true
 *         Emission:
 *           type: string
 *           nullable: true
 *         Downtime:
 *           type: string
 *           nullable: true
 *         PEA:
 *           type: string
 *           nullable: true
 *         GEN:
 *           type: string
 *           nullable: true
 *         Feul_M:
 *           type: number
 *           format: float 
 *           nullable: true
 *         Feul_A:
 *           type: string
 *           nullable: true
 *       example:
 *         Engineering_center: "Center A"
 *         Station: "Station B"
 *         Status_: "Active"
 *         ip: "192.168.1.10"
 *         Transmistion_Brand: "BrandX"
 *         No: "123"
 *         Facility: "Main"
 *         Station_Eng: "Station B ENG"
 *         Station_Thai: "สถานี B"
 *         Station_Type: "Type1"
 *         Eng_No: 1
 *         Eng_No_n: 2
 *         TX_ANT: "ANT001"
 *         RF_Power: 100.50
 *         SFN: "Yes"
 *         Emission: "Type A"
 *         Downtime: "None"
 *         PEA: "N/A"
 *         GEN: "GEN01"
 *         Feul_M: 50.25
 *         Feul_A: "Diesel"
 */

/**
 * @swagger
 * /api/daily_reporter:
 *   get:
 *     summary: Retrieve a list of all daily reporter entries
 *     tags: [DailyReporter]
 *     responses:
 *       200:
 *         description: A list of daily reporter entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DailyReporterData'
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/daily_reporter', irdController.getDailyReporterController);


/**
 * @swagger
 * /api/daily_cisco:
 *   get:
 *     summary: Retrieve a list of daily reporter link Cisco entries
 *     tags: [DailyReporter]
 *     responses:
 *       200:
 *         description: A list of daily reporter link Cisco entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DailyReporterData'
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/daily_cisco', irdController.getDailyReporterLinkCiscoController);

export default router;
