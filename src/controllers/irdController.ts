import { Request, Response } from "express";
import * as irdService from "../services/irdService";

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

export const getDailyReporterLinkCiscoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await irdService.getDailyReporterLinkCisco();

    res.json(data);
  } catch (error: any) {
    console.error(
      "Controller error in getDailyReporterLinkCiscoController:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
