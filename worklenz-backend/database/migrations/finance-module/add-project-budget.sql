-- Migration: Add manual budget field to projects table
-- Date: 2025-01-27
-- Version: 1.0.0

BEGIN;

-- Add budget column to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS budget NUMERIC(15, 2) DEFAULT 0 NOT NULL CHECK (budget >= 0);

COMMENT ON COLUMN projects.budget IS 'Manual project budget that overrides calculated budget from tasks when set';

COMMIT; 