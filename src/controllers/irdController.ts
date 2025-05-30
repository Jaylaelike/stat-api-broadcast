import { Request, Response } from "express";
import * as irdService from "../services/irdService";

export const getIrdAllController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await irdService.getAllIrdData();
    res.json(data);
  } catch (error: any) {
    console.error("Controller error in getIrdAllController:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getCiscoSWController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await irdService.getAllCiscoSWData();
    res.json(data);
  } catch (error: any) {
    console.error("Controller error in getCiscoSWController:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getEngineeringCenterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await irdService.getAllEngineeringCenterData();
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getEngineeringCenterController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getDailyReporterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await irdService.getAllDailyReporterData();
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getDailyReporterController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getIrdFilterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const station = req.params.station;

  if (!station) {
    res
      .status(400)
      .json({
        error: "Bad Request",
        message: "Station parameter is required.",
      });
    return;
  }

  try {
    const results = await irdService.getIrdDataByStation(station);
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error("Controller error in getIrdFilterController:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getCiscoSwJoinEngCenterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const results = await irdService.getCiscoSWWithEngineeringCenter();
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getCiscoSwJoinEngCenterController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getIrdDataWithEngineeringCenterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const results = await irdService.getIrdDataWithEngineeringCenter();
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getIrdDataWithEngineeringCenterController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getNecTxControlWithEngineeringCentercontroller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const results = await irdService.getNecTxControlWithEngineeringCenter();
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getNecTxControlWithEngineeringCentercontroller:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const getTxtRedessDataWithEngineeringCenterController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const results = await irdService.getTxtRedessDataWithEngineeringCenter();
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getTxtRedessDataWithEngineeringCenterController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}

export const getDistinctStationThaiByTreedreesBrandController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const results = await irdService.getDistinctStationThaiByTreedreesBrand();
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getDistinctStationThaiByTreedreesBrandController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}



export const getTxTreedressRangeDataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { station, range, state } = req.params;

  if (!station || !range || !state) {
    res
      .status(400)
      .json({
        error: "Bad Request",
        message: "Station, range, and state parameters are required.",
      });
    return;
  }

  try {
    const results = await irdService.getTxTreedressRangeData(
      station,
      range,
      state
    );
    const data = {
      orders: results,
    };
    res.json(data);
  } catch (error: any) {
    console.error("Controller error in getTxTreedressRangeDataController:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}



