import express from "express";

import ProjectfinanceController from "../../controllers/project-finance-controller";
import idParamValidator from "../../middlewares/validators/id-param-validator";
import safeControllerFunction from "../../shared/safe-controller-function";

const projectFinanceApiRouter = express.Router();

projectFinanceApiRouter.get("/project/:project_id/tasks", ProjectfinanceController.getTasks);
projectFinanceApiRouter.get("/project/:project_id/tasks/:parent_task_id/subtasks", ProjectfinanceController.getSubTasks);
projectFinanceApiRouter.get(
  "/task/:id/breakdown", 
  idParamValidator,
  safeControllerFunction(ProjectfinanceController.getTaskBreakdown)
);
projectFinanceApiRouter.put("/task/:task_id/fixed-cost", ProjectfinanceController.updateTaskFixedCost);
projectFinanceApiRouter.put("/task/:task_id/estimated-man-days", ProjectfinanceController.updateTaskEstimatedManDays);
projectFinanceApiRouter.put("/project/:project_id/currency", ProjectfinanceController.updateProjectCurrency);
projectFinanceApiRouter.put("/project/:project_id/budget", ProjectfinanceController.updateProjectBudget);
projectFinanceApiRouter.put("/project/:project_id/calculation-method", ProjectfinanceController.updateProjectCalculationMethod);
projectFinanceApiRouter.put("/rate-card-role/:rate_card_role_id/man-day-rate", ProjectfinanceController.updateRateCardManDayRate);
projectFinanceApiRouter.get("/project/:project_id/export", ProjectfinanceController.exportFinanceData);

export default projectFinanceApiRouter;