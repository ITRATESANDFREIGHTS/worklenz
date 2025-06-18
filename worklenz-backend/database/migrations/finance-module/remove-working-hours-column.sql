-- Migration: Remove working_hours column and consolidate to hours_per_day
-- Date: 2025-01-27
-- Version: 1.2.0
-- Description: Removes duplicate working_hours column from organizations table and consolidates to hours_per_day

BEGIN;

-- Remove the old working_hours column if it exists (consolidate to hours_per_day)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' AND column_name = 'working_hours'
    ) THEN
        -- Migrate working_hours data to hours_per_day before dropping
        -- Only update if hours_per_day is still default value
        UPDATE organizations 
        SET hours_per_day = CASE 
            WHEN working_hours IS NOT NULL AND working_hours > 0 AND working_hours <= 24 
            THEN working_hours::NUMERIC(4,2)
            ELSE 8.0 
        END
        WHERE hours_per_day = 8.0;
        
        -- Drop the old working_hours column
        ALTER TABLE organizations DROP COLUMN working_hours;
        
        -- Log the completion
        RAISE NOTICE 'Successfully migrated working_hours to hours_per_day and removed working_hours column';
    ELSE
        RAISE NOTICE 'working_hours column does not exist, no migration needed';
    END IF;
END $$;

COMMIT; 