-- Migration: Remove estimated_man_days column from tasks table
-- This column is no longer needed as we calculate man days dynamically from total_minutes

BEGIN;

-- Drop the trigger first
DROP TRIGGER IF EXISTS trigger_update_estimated_man_days ON tasks;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_estimated_man_days();

-- Remove the estimated_man_days column from tasks table
ALTER TABLE tasks DROP COLUMN IF EXISTS estimated_man_days;

COMMIT; 