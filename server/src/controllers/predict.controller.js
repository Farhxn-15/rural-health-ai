import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "../utils/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictSymptoms = (req, res, next) => {
  const pythonFile = path.join(__dirname, "predict_symptoms.py");
  const py = spawn(path.join(__dirname, "../venv/bin/python3"), [pythonFile]);

  py.stdin.write(JSON.stringify(req.body));
  py.stdin.end();

  let output = "";

  py.stdout.on("data", (chunk) => (output += chunk.toString()));
  py.stderr.on("data", (err) => console.error("PYTHON:", err.toString()));

  py.on("close", () => {
    try {
      res.json(JSON.parse(output));
    } catch (e) {
      next(errorHandler("Invalid Python response", 500));
    }
  });
};
