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
 * tags:
 *   name: EngineeringCenter
 *   description: Engineering center data management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EngineeringCenterData:
 *       type: object
 *       properties:
 *         Engineering_center:
 *           type: string
 *           nullable: true
 *         Station:
 *           type: string
 *           nullable: true
 *         Status:
 *           type: string
 *           nullable: true
 *         ip:
 *           type: string
 *           nullable: true
 *         Transmistion_Brand:
 *           type: string
 *           nullable: true
 *         No:
 *           type: number
 *           format: float 
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
 *       example:
 *         Engineering_center: "Main Engineering Hub"
 *         Station: "Central Station"
 *         Status: "Operational"
 *         ip: "10.0.0.1"
 *         Transmistion_Brand: "ReliableTransmissions"
 *         No: 12.34 
 *         Facility: "Primary Site"
 *         Station_Eng: "Central Stn ENG"
 *         Station_Thai: "สถานีกลาง"
 *         Station_Type: "Mainline"
 *         Eng_No: 101
 */

/**
 * @swagger
 * /api/engineering_center:
 *   get:
 *     summary: Retrieve a list of all engineering center entries
 *     tags: [EngineeringCenter]
 *     responses:
 *       200:
 *         description: A list of engineering center entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EngineeringCenterData'
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/engineering_center', irdController.getEngineeringCenterController);

/**
 * @swagger
 * tags:
 *   name: CiscoSW
 *   description: Cisco Switch data management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CiscoSWData:
 *       type: object
 *       properties:
 *         time:
 *           type: string
 *           format: date-time 
 *           nullable: true
 *           description: Timestamp of the record.
 *         Center:
 *           type: string
 *           nullable: true
 *           description: Center name.
 *         Station:
 *           type: string
 *           nullable: true
 *           description: Station name.
 *         Device_name:
 *           type: string
 *           nullable: true
 *           description: Name of the Cisco device.
 *         IP:
 *           type: string
 *           format: ipv4 
 *           nullable: true
 *           description: IP address of the device.
 *         Status:
 *           type: string
 *           nullable: true
 *           description: Status of the device.
 *       example:
 *         time: "2023-10-27T10:30:00Z"
 *         Center: "DataCenter Core"
 *         Station: "Network Rack 1"
 *         Device_name: "CoreSwitch01"
 *         IP: "192.168.1.1"
 *         Status: "Online"
 */

/**
 * @swagger
 * /api/cisco_sw:
 *   get:
 *     summary: Retrieve a list of all Cisco switch data entries, ordered by time descending.
 *     tags: [CiscoSW]
 *     responses:
 *       200:
 *         description: A list of Cisco switch data entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CiscoSWData'
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/cisco_sw', irdController.getCiscoSWController);

export default router;
