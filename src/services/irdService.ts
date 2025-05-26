import pool from "../config/database";
import { QueryError, FieldPacket } from "mysql2";

export interface DailyReporterData {
  Engineering_center: string | null;
  Station: string | null;
  Status_: string | null;
  ip: string | null;
  Transmistion_Brand: string | null;
  No: string | null;
  Facility: string | null;
  Station_Eng: string | null;
  Station_Thai: string | null;
  Station_Type: string | null;
  Eng_No: number | null;
  Eng_No_n: number | null;
  TX_ANT: string | null;
  RF_Power: number | null; // decimal(10,2)
  SFN: string | null;
  Emission: string | null;
  Downtime: string | null;
  PEA: string | null;
  GEN: string | null;
  Feul_M: number | null; // decimal(10,2)
  Feul_A: string | null;
  [key: string]: any;
}

export interface DailyReporterDataCisco {
  time: string | null;
  Center: string | null;
  Station: string | null;
  Device_name: string | null;
  IP: string | null;
  Status: string | null;
  [key: string]: any;
}

export const getAllDailyReporterData = async (): Promise<
  DailyReporterData[]
> => {
  const query = "SELECT * FROM `daily_reporter`;";
  try {
    const [results] = await pool.query(query);
    return results as DailyReporterData[];
  } catch (error) {
    console.error("Error executing getAllDailyReporterData query:", error);
    throw new Error("Error fetching daily reporter data from database.");
  }
};

export const getDailyReporterLinkCisco = async (): Promise<DailyReporterDataCisco[]> => {
  const query = "SELECT * FROM `cisco_sw`;";
  try {
    const [results] = await pool.query(query);
    return results as DailyReporterDataCisco[];
  } catch (error) {
    console.error("Error executing getDailyReporterLinkCisco query:", error);
    throw new Error("Error fetching Cisco link data from database.");
  }
};
