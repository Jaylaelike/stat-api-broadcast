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

// create service join between `nec_tx_control ` and `engineering_center_new` by index is Station field
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

//create service join between `treedes ` and `engineering_center_new` by index is Station field
export interface TxtRedessDataJoinEngCenter {
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

  //this is the treedes table fields

  Center: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Device_Name: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  IP: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Reverse_Power: number | null; // decimal(10,2)
  Temp_Amp: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Temp_Modula: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Status: string | null; // Assuming this field exists in the `auto_insert_txtredess` table

  [key: string]: any; // To allow for any other fields not explicitly defined
}
export const getTxtRedessDataWithEngineeringCenter = async (): Promise<
  TxtRedessDataJoinEngCenter[]
> => {
  const query = `
    SELECT txt.*, ec.Engineering_center, ec.ip, ec.Transmistion_Brand, 
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai, 
           ec.Station_Type, ec.Eng_No
    FROM treedes AS txt 
    INNER JOIN engineering_center_new AS ec ON txt.Station = ec.Station 
    ORDER BY txt.time DESC;
  `;
  try {
    const [results] = await pool.query(query);
    return results as TxtRedessDataJoinEngCenter[];
  } catch (error) {
    console.error(
      "Error executing getTxtRedessDataWithEngineeringCenter query:",
      error
    );
    throw new Error(
      "Error fetching TxtRedess data with Engineering Center from database."
    );
  }
};

// Create services of `SELECT DISTINCT(Station_Thai) FROM engineering_center_new WHERE Transmistion_Brand = 'TREDESS' ORDER BY engineering_center_new.Transmistion_Brand ASC`
export interface TransmissionBrand {
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

  [key: string]: any; // To allow for any other fields not explicitly defined
}

export const getDistinctStationThaiByTreedreesBrand = async (): Promise<
  TransmissionBrand[]
> => {
  const query = `
    SELECT DISTINCT Station_Thai 
    FROM engineering_center_new 
    WHERE Transmistion_Brand = 'TREDESS'
    ORDER BY Transmistion_Brand ASC;
  `;
  try {
    const [results] = await pool.query(query);
    return results as TransmissionBrand[];
  } catch (error) {
    console.error(
      "Error executing getDistinctStationThaiByTreedreesBrand query:",
      error
    );
    throw new Error(
      "Error fetching distinct Station_Thai by TREDESS brand from database."
    );
  }
};

export interface TxTreedressRangeData {
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

  //this is the auto_insert_txtredess table fields

  Center: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Device_Name: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  IP: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Reverse_Power: number | null; // decimal(10,2)
  Temp_Amp: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Temp_Modula: string | null; // Assuming this field exists in the `auto_insert_txtredess` table
  Status: string | null; // Assuming this field exists in the `auto_insert_txtredess` table

  [key: string]: any; // To allow for any other fields not explicitly defined
}
export const getTxTreedressRangeData = async (
  station: string,
  range: string,
  state: string
): Promise<TxTreedressRangeData[]> => {
  const query = `
    SELECT txt.*, ec.Engineering_center, ec.ip, ec.Transmistion_Brand, 
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai, 
           ec.Station_Type, ec.Eng_No
    FROM engineering_center_new AS ec 
    JOIN auto_insert_txtredess AS txt ON ec.station = txt.Station 
    WHERE ec.Station_Thai = ? 
      AND txt.time >= NOW() - INTERVAL ? DAY 
      AND txt.Device_Name = ? 
    ORDER BY txt.time DESC;
  `;
  try {
    const [results] = await pool.query(query, [station, range, state]);
    return results as TxTreedressRangeData[];
  } catch (error) {
    console.error("Error executing getTxTreedressRangeData query:", error);
    throw new Error("Error fetching Tx Treedress range data from database.");
  }
};

//create service for join between `plisch_scu ` and `engineering_center_new` by index is Station field
export interface PlischScuData {
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

  Device_name: string | null; // Assuming this field exists in the `plisch_scu` table
  Mode: string | null; // Assuming this field exists in the `plisch_scu` table
  Antenna: string | null; // Assuming this field exists in the `plisch_scu` table
  Tx1_Power_Output: string | null; // Assuming this is a string, adjust type if needed
  Tx1_Power_Refect: string | null; // Assuming this is a string, adjust type if needed
  Tx2_Power_Output: string | null; // Assuming this is a string, adjust type if needed
  Tx2_Power_Refect: string | null; // Assuming this is a string, adjust type if needed
  Status: string | null; // Assuming this field exists in the `plisch_scu` table
  // Add other fields as necessary, for example:
  // Engineering_center: string | null; // Assuming this field exists in the `plisch_scu` table
  // Engineering_center: string | null; // Assuming this field exists in the `plisch_scu` table
  // Add other fields as necessary, for example:
  // Engineering_center: string | null; // Assuming this field exists in the `plisch_scu` table

  // Center: string | null;
  // Station: string | null;
  // Device_name: string | null;
  // IP: string | null;
  // Mode: string | null;
  // Antenna: string | null;
  // Tx1_Power_Output: string | null; // Assuming this is a string, adjust type if needed
  // Tx1_Power_Refect: string | null; // Assuming this is a string, adjust type if needed
  // Tx2_Power_Output: string | null; // Assuming this is a string, adjust type if needed
  // Tx2_Power_Refect: string | null; // Assuming this is a string, adjust type if needed
  // Status: string | null;

  [key: string]: any; // To allow for any other fields not explicitly defined
}

//create service for join between `plisch_scu ` and `engineering_center_new` by index is Station field
export const getAllPlischScuData = async (): Promise<PlischScuData[]> => {
  const query = `
    SELECT scu.*, ec.Engineering_center, ec.ip, ec.Transmistion_Brand,
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai,
           ec.Station_Type, ec.Eng_No
    FROM plisch_scu AS scu
    INNER JOIN engineering_center_new AS ec ON scu.Station = ec.Station
    ORDER BY scu.time DESC;
  `;

  try {
    const [results] = await pool.query(query);
    return results as PlischScuData[];
  } catch (error) {
    console.error("Error executing getAllPlischScuData query:", error);
    throw new Error("Error fetching Plisch SCU data from database.");
  }
};

//create service for join between `auto_insert_ird_txplisch` and `engineering_center_new` by index is Station field
export interface PlischDataRange {
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

  //this is the auto_insert_ird_txplisch table fields

  Center: string | null; // Assuming this field exists in the `auto_insert_ird_txplisch` table
  Device_Name: string | null; // Assuming this field exists in the `auto_insert_ird_txplisch` table
  IP: string | null; // Assuming this field exists in the `auto_insert_ird_txplisch` table
  Mode: string | null; // Assuming this field exists in the `auto_insert_ird_txplisch` table
  Antenna: string | null; // Assuming this field exists in the `auto_insert_ird_txplisch` table
  Tx1_Power_Output: number | null; // decimal(10,2)
  Tx1_Power_Refect: number | null; // decimal(10,2)
  Tx2_Power_Output: number | null; // decimal(10,2)
  Tx2_Power_Refect: number | null; // decimal(10,2)
  Status: string | null; // Assuming this field exists in the `auto_insert_ird_txplisch` table

  [key: string]: any; // To allow for any other fields not explicitly defined
}

export const getPlischDataRange = async (
  station: string,
  range: string,
  state: string
): Promise<PlischDataRange[]> => {
  const query = `
    SELECT pl.*, ec.Engineering_center, ec.ip, ec.Transmistion_Brand, 
           ec.No, ec.Facility, ec.Station_Eng, ec.Station_Thai, 
           ec.Station_Type, ec.Eng_No
    FROM engineering_center_new AS ec 
    JOIN auto_insert_ird_txplisch AS pl ON ec.Station = pl.Station 
    WHERE ec.Station_Thai = ? 
      AND pl.time >= NOW() - INTERVAL ? DAY 
      AND pl.Antenna = ? 
    ORDER BY pl.time DESC;
  `;
  try {
    const [results] = await pool.query(query, [station, range, state]);
    return results as PlischDataRange[];
  } catch (error) {
    console.error("Error executing getPlischDataRange query:", error);
    throw new Error("Error fetching Plisch data range from database.");
  }
};

// Create services of `SELECT DISTINCT(Station_Thai) FROM engineering_center_new WHERE Transmistion_Brand = 'PLISCH' ORDER BY engineering_center_new.Transmistion_Brand ASC`
export interface TransmissionBrandPlisch {
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

  [key: string]: any; // To allow for any other fields not explicitly defined
}

export const getDistinctStationThaiByPlischBrand = async (): Promise<
  TransmissionBrandPlisch[]
> => {
  const query = `
    SELECT DISTINCT Station_Thai 
    FROM engineering_center_new 
    WHERE Transmistion_Brand = 'PLISCH'
    ORDER BY Transmistion_Brand ASC;
  `;
  try {
    const [results] = await pool.query(query);
    return results as TransmissionBrandPlisch[];
  } catch (error) {
    console.error(
      "Error executing getDistinctStationThaiByPlischBrand query:",
      error
    );
    throw new Error(
      "Error fetching distinct Station_Thai by PLISCH brand from database."
    );
  }
};
