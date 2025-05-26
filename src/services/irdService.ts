import pool from '../config/database';
import { QueryError, FieldPacket } from 'mysql2';

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
  const query = "SELECT * FROM `auto_insert_ird_harmonic` WHERE 1 ORDER BY `time` DESC LIMIT 100;";
  try {
    const [results] = await pool.query(query);
    return results as IrdData[];
  } catch (error) {
    console.error("Error executing getAllIrdData query:", error);
    throw new Error("Error fetching IRD data from database."); // Or a more specific error
  }
};

export const getIrdDataByStation = async (station: string): Promise<IrdData[]> => {
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
