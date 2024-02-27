import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../docs/swagger_output.json";

const router = Router();
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

export default router;