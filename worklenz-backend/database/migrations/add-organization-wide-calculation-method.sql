-- Migration: Add organization-wide calculation method configuration
-- Date: 2025-01-27
-- Version: 1.1.0
-- Description: Moves calculation method and hours per day from project level to organization level

BEGIN;

-- Add calculation method and hours per day to organizations table
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS calculation_method calculation_method_type DEFAULT 'hourly' NOT NULL,
ADD COLUMN IF NOT EXISTS hours_per_day NUMERIC(4, 2) DEFAULT 8.0 CHECK (hours_per_day > 0 AND hours_per_day <= 24);

-- Add comments for documentation
COMMENT ON COLUMN organizations.calculation_method IS 'Organization-wide calculation method: determines whether all projects use hourly rates or man days for cost calculations';
COMMENT ON COLUMN organizations.hours_per_day IS 'Organization-wide working hours per day for man day calculations (default 8.0)';

-- Migrate existing project-level settings to organization level
-- For each organization, use the most common calculation method from its projects
WITH org_calc_methods AS (
  SELECT 
    o.id as org_id,
    COALESCE(
      (SELECT calculation_method 
       FROM projects p 
       JOIN teams t ON p.team_id = t.id 
       WHERE t.organization_id = o.id 
       GROUP BY calculation_method 
       ORDER BY COUNT(*) DESC 
       LIMIT 1), 
      'hourly'
    ) as most_common_method,
    COALESCE(
      (SELECT AVG(hours_per_day) 
       FROM projects p 
       JOIN teams t ON p.team_id = t.id 
       WHERE t.organization_id = o.id 
       AND hours_per_day IS NOT NULL), 
      8.0
    ) as avg_hours_per_day
  FROM organizations o
)
UPDATE organizations 
SET 
  calculation_method = ocm.most_common_method,
  hours_per_day = ocm.avg_hours_per_day
FROM org_calc_methods ocm 
WHERE organizations.id = ocm.org_id;

-- Note: Keep project-level columns for backward compatibility during transition
-- They can be removed in a future migration after confirming all systems use organization-level settings

COMMIT; 