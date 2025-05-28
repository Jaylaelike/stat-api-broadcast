import pool from "../config/database";
import { QueryError, FieldPacket } from "mysql2";

export interface IrdData {
  // Define the structure of your IRD data based on your table
  // Example:
  // id: number;
  // Station: string;
  // time: Date;
  // ... other fields
  [key: string]: any; // Allow any other properties
}

export const getAllIrdData = async (): Promise<IrdData[]> => {
  const query =
    "SELECT * FROM `auto_insert_ird_harmonic` WHERE 1 ORDER BY `time` DESC LIMIT 100;";
  try {
    const [results] = await pool.query(query);
    return results as IrdData[];
  } catch (error) {
    console.error("Error executing getAllIrdData query:", error);
    throw new Error("Error fetching IRD data from database."); // Or a more specific error
  }
};

export const getIrdDataByStation = async (
  station: string
): Promise<IrdData[]> => {
  // Query updated for clarity and to use alias `i` for `auto_insert_ird_harmonic` in ORDER BY
  const query = `
    SELECT i.* 
    FROM engineering_center_new AS s 
    JOIN auto_insert_ird_harmonic AS i ON s.station = i.Station 
    WHERE s.Station_Thai = ? 
    ORDER BY i.time DESC 
    LIMIT 100;
  `;
  try {
    const [results] = await pool.query(query, [station]);
    return results as IrdData[];
  } catch (error) {
    console.error("Error executing getIrdDataByStation query:", error);
    throw new Error("Error fetching filtered IRD data from database.");
  }
};

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

export interface CiscoSWDataJoinEngCenter {
  Engineering_center: string | null;
  Station: string | null;
  Status: string | null;
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
  time: string | null;
  Center: string | null;
  Device_name: string | null;
  IP: string | null;

  [key: string]: any; // To allow for any other fields not explicitly defined
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

export interface EngineeringCenterData {
  Engineering_center: string | null;
  Station: string | null;
  Status: string | null;
  ip: string | null;
  Transmistion_Brand: string | null;
  No: number | null;
  Facility: string | null;
  Station_Eng: string | null;
  Station_Thai: string | null;
  Station_Type: string | null;
  Eng_No: number | null;
  [key: string]: any;
}

export const getAllEngineeringCenterData = async (): Promise<
  EngineeringCenterData[]
> => {
  const query = "SELECT * FROM `engineering_center_new`;";
  try {
    const [results] = await pool.query(query);
    return results as EngineeringCenterData[];
  } catch (error) {
    console.error("Error executing getAllEngineeringCenterData query:", error);
    throw new Error("Error fetching engineering center data from database.");
  }
};

export interface CiscoSWData {
  time: string | null;
  Center: string | null;
  Station: string | null;
  Device_name: string | null;
  IP: string | null;
  Status: string | null;
  [key: string]: any; // To allow for any other fields not explicitly defined
}

export const getAllCiscoSWData = async (): Promise<CiscoSWData[]> => {
  const query = "SELECT * FROM `cisco_sw` ORDER BY `time` DESC;";
  try {
    const [results] = await pool.query(query);
    return results as CiscoSWData[];
  } catch (error) {
    console.error("Error executing getAllCiscoSWData query:", error);
    throw new Error("Error fetching Cisco SW data from database.");
  }
};

//create service route for inner join between cisco_sw and engineering_center by index is Station field
export const getCiscoSWWithEngineeringCenter = async (): Promise<
  CiscoSWDataJoinEngCenter[]
> => {
  const query = `
    SELECT cs.*, ec.Engineering_center, ec.Station, ec.ip, ec.Transmistion_Brand, 
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai, ec.Station_Type, ec.Eng_No, 
           cs.Status
    FROM cisco_sw AS cs 
    INNER JOIN engineering_center_new AS ec ON cs.Station = ec.Station 
    ORDER BY cs.time DESC;
  `;
  try {
    const [results] = await pool.query(query);
    return results as CiscoSWDataJoinEngCenter[];
  } catch (error) {
    console.error(
      "Error executing getCiscoSWWithEngineeringCenter query:",
      error
    );
    throw new Error(
      "Error fetching Cisco SW data with Engineering Center from database."
    );
  }
};

//create service join between `ird_harmonic` and `engineering_center_new` by index is Station field
export interface IrdDataJoinEngCenter {
  time: string | null;
  Station: string | null;
  Engineering_center: string | null;
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

  Lock_Carrier: string | null;
  C_N: number | null; // decimal(10,2)
  Link_Margin: number | null; // decimal(10,2)
  EbNo: number | null; // decimal(10,2)
  Status: string | null;
  Device_Name: string | null; // Assuming this field exists in the `auto_insert_ird_harmonic` table

  [key: string]: any; // To allow for any other fields not explicitly defined
}
export const getIrdDataWithEngineeringCenter = async (): Promise<
  IrdDataJoinEngCenter[]
> => {
  const query = `
    SELECT i.*, ec.Engineering_center, ec.ip, ec.Transmistion_Brand, 
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai, 
           ec.Station_Type, ec.Eng_No
    FROM ird_harmonic AS i 
    INNER JOIN engineering_center_new AS ec ON i.Station = ec.Station 
    ORDER BY i.time DESC;
  `;
  try {
    const [results] = await pool.query(query);
    return results as IrdDataJoinEngCenter[];
  } catch (error) {
    console.error(
      "Error executing getIrdDataWithEngineeringCenter query:",
      error
    );
    throw new Error(
      "Error fetching IRD data with Engineering Center from database."
    );
  }
};

// reate service join between `nec_tx_control ` and `engineering_center_new` by index is Station field
export interface NecTxControlJoinEngCenter {
  time: string | null;
  Station: string | null;
  Engineering_center: string | null;
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

  //this is the nec_tx_control table fields

  Output_Power_Watt: number | null; // decimal(10,2)
  Output_Power_Percent: number | null; // decimal(10,0)
  Power_Ref: number | null; // decimal(10,2)
  IMD: number | null; // decimal(10,2)
  MER: number | null; // decimal(10,2)
  Status: string | null; // Assuming this field exists in the `nec_tx_control` table
  Device_name: string | null; // Assuming this field exists in the `nec_tx_control` table
  Center: string | null; // Assuming this field exists in the `nec_tx_control` table
  IP: string | null; // Assuming this field exists in the `nec_tx_control` table

  [key: string]: any; // To allow for any other fields not explicitly defined
}
export const getNecTxControlWithEngineeringCenter = async (): Promise<
  NecTxControlJoinEngCenter[]
> => {
  const query = `
    SELECT nec.*, ec.Engineering_center, ec.ip, ec.Transmistion_Brand, 
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai, 
           ec.Station_Type, ec.Eng_No
    FROM nec_tx_control AS nec 
    INNER JOIN engineering_center_new AS ec ON nec.Station = ec.Station 
    ORDER BY nec.time DESC;
  `;
  try {
    const [results] = await pool.query(query);
    return results as NecTxControlJoinEngCenter[];
  } catch (error) {
    console.error(
      "Error executing getNecTxControlWithEngineeringCenter query:",
      error
    );
    throw new Error(
      "Error fetching NEC TX Control data with Engineering Center from database."
    );
  }
};
