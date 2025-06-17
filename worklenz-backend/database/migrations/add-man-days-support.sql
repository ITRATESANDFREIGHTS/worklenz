-- Migration: Add man days support to finance system
-- Date: 2025-01-27
-- Version: 1.0.0
-- Description: Adds dual system support for both hourly rates and man days calculation

BEGIN;

-- Create enum for calculation methods (if it doesn't already exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'calculation_method_type') THEN
        CREATE TYPE calculation_method_type AS ENUM ('hourly', 'man_days');
    END IF;
END $$;

-- Add calculation method to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS calculation_method calculation_method_type DEFAULT 'hourly' NOT NULL;

-- Add man day rate to project rate card roles
ALTER TABLE finance_project_rate_card_roles 
ADD COLUMN IF NOT EXISTS man_day_rate NUMERIC(10, 2) DEFAULT 0 CHECK (man_day_rate >= 0);

-- Add man day rate to general rate card roles
ALTER TABLE finance_rate_card_roles 
ADD COLUMN IF NOT EXISTS man_day_rate NUMERIC(10, 2) DEFAULT 0 CHECK (man_day_rate >= 0);

-- Add estimated man days to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS estimated_man_days NUMERIC(8, 2) DEFAULT 0 CHECK (estimated_man_days >= 0);

-- Note: Using existing hours_per_day column for man day calculations

-- Add comments for documentation
COMMENT ON COLUMN projects.calculation_method IS 'Determines whether project uses hourly rates or man days for cost calculations';
COMMENT ON COLUMN finance_project_rate_card_roles.man_day_rate IS 'Rate per man day for this role in the project';
COMMENT ON COLUMN finance_rate_card_roles.man_day_rate IS 'Rate per man day for this role in the rate card';
COMMENT ON COLUMN tasks.estimated_man_days IS 'Estimated effort in man days for this task';
COMMENT ON COLUMN projects.hours_per_day IS 'Number of working hours per day for man day calculations (default 8)';

COMMIT; 