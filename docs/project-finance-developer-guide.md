# Project Finance & Ratecards - Developer Guide

## Overview

The Worklenz project finance system provides comprehensive cost tracking and budget management capabilities. It supports dual calculation methods (hourly rates and man days) with organization-wide configuration and project-specific customization.

## Architecture

### Database Schema

#### Core Tables

**finance_rate_cards**
```sql
CREATE TABLE finance_rate_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**finance_rate_card_roles**
```sql
CREATE TABLE finance_rate_card_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rate_card_id UUID NOT NULL REFERENCES finance_rate_cards(id) ON DELETE CASCADE,
    job_title_id UUID NOT NULL REFERENCES job_titles(id) ON DELETE CASCADE,
    rate NUMERIC(10, 2) DEFAULT 0 CHECK (rate >= 0),
    man_day_rate NUMERIC(10, 2) DEFAULT 0 CHECK (man_day_rate >= 0),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**finance_project_rate_card_roles**
```sql
CREATE TABLE finance_project_rate_card_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    job_title_id UUID NOT NULL REFERENCES job_titles(id) ON DELETE CASCADE,
    rate NUMERIC(10, 2) DEFAULT 0 CHECK (rate >= 0),
    man_day_rate NUMERIC(10, 2) DEFAULT 0 CHECK (man_day_rate >= 0),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Calculation Method Support

**Organization-wide Configuration**
```sql
-- Organizations table extensions
ALTER TABLE organizations 
ADD COLUMN calculation_method calculation_method_type DEFAULT 'hourly' NOT NULL,
ADD COLUMN hours_per_day NUMERIC(4, 2) DEFAULT 8.0 CHECK (hours_per_day > 0 AND hours_per_day <= 24);
```

**Task Estimation Support**
```sql
-- Tasks table extensions
ALTER TABLE tasks 
ADD COLUMN estimated_man_days NUMERIC(8, 2) DEFAULT 0 CHECK (estimated_man_days >= 0);
```

### Frontend Architecture

#### State Management

**Finance Slice** (`/src/features/finance/finance-slice.ts`)
```typescript
interface FinanceState {
  isRatecardDrawerOpen: boolean;
  isFinanceDrawerOpen: boolean;
  isImportRatecardsDrawerOpen: boolean;
  currency: string;
  isRatecardsLoading?: boolean;
  isFinanceDrawerloading?: boolean;
  drawerRatecard?: RatecardType | null;
  ratecardsList?: RatecardType[] | null;
  selectedTask?: any | null;
}
```

**Project Finance Slice** (`/src/features/projects/finance/project-finance.slice.ts`)
- Manages project-specific finance data
- Handles task grouping and filtering
- Manages budget calculations and statistics

#### Key Components

**RatecardDrawer** (`/src/features/finance/ratecard-drawer/ratecard-drawer.tsx`)
- Create/edit rate cards
- Manage job roles and rates
- Support for both hourly and man-day rates
- Currency selection
- Bulk operations (add all roles, remove all)

**ProjectViewFinance** (`/src/pages/projects/projectView/finance/project-view-finance.tsx`)
- Main project finance dashboard
- Budget tracking and statistics
- Cost calculations
- Export functionality
- Real-time updates via WebSocket

**OrganizationCalculationMethod** (`/src/components/admin-center/overview/organization-calculation-method/organization-calculation-method.tsx`)
- Organization-wide calculation method configuration
- Switch between hourly and man-days calculation

### Backend API

#### Controllers

**AdminCenterController** (`/src/controllers/admin-center-controller.ts`)
```typescript
// Organization finance settings
static async updateOrganizationCalculationMethod(req, res) {
  const { calculation_method, hours_per_day } = req.body;
  // Validates and updates organization-wide calculation method
}

static async getOrganizationDetails(req, res) {
  // Returns organization details including calculation method
}
```

**Rate Card API Endpoints**
- `GET /api/rate-cards` - List rate cards
- `POST /api/rate-cards` - Create rate card
- `PUT /api/rate-cards/:id` - Update rate card
- `DELETE /api/rate-cards/:id` - Delete rate card
- `GET /api/rate-cards/:id` - Get rate card details

**Project Finance API Endpoints**
- `GET /api/projects/:id/finance` - Get project finance data
- `PUT /api/projects/:id/finance/currency` - Update project currency
- `PUT /api/projects/:id/budget` - Update project budget
- `GET /api/projects/:id/finance/export` - Export finance data

## Calculation Methods

### Hourly Rates
- Uses `estimated_hours` from tasks
- Multiplies by hourly `rate` from rate cards
- Formula: `cost = estimated_hours * hourly_rate`

### Man Days
- Uses `estimated_man_days` from tasks
- Multiplies by `man_day_rate` from rate cards
- Uses organization's `hours_per_day` setting
- Formula: `cost = estimated_man_days * man_day_rate`

## Key Features

### 1. Dual Calculation Support
```typescript
// Determine calculation method
const isManDaysMethod = organization?.calculation_method === 'man_days';

// Conditional rate display
{isManDaysMethod ? (
  <span>Rate per day: {role.man_day_rate}</span>
) : (
  <span>Rate per hour: {role.rate}</span>
)}
```

### 2. Currency Management
```typescript
// Multi-currency support
const CURRENCY_OPTIONS = [
  { value: 'usd', label: 'USD ($)' },
  { value: 'eur', label: 'EUR (€)' },
  { value: 'gbp', label: 'GBP (£)' },
  // ... more currencies
];
```

### 3. Budget Tracking
```typescript
interface BudgetStatistics {
  totalEstimatedHours: number;
  totalFixedCost: number;
  totalBudget: number;
  totalActualCost: number;
  totalVariance: number;
  budgetUtilization: number;
  manualBudget: number;
  hasManualBudget: boolean;
}
```

### 4. Real-time Updates
```typescript
// WebSocket event handlers
const handleTaskEstimationChange = useCallback(() => {
  refreshFinanceData(true);
}, [refreshFinanceData]);

// Socket events
SocketEvents.TASK_TIME_ESTIMATION_CHANGE
SocketEvents.TASK_TIMER_STOP
SocketEvents.TASK_PROGRESS_UPDATE
SocketEvents.TASK_BILLABLE_CHANGE
```

### 5. Permission System
```typescript
// Finance edit permissions
const hasEditPermission = hasFinanceEditPermission(currentSession, project);

// Conditional rendering based on permissions
{hasEditPermission && (
  <Button onClick={handleEdit}>Edit Rate Card</Button>
)}
```

## Development Guidelines

### 1. Adding New Calculation Methods
1. Update `calculation_method_type` enum in database
2. Add migration script for database changes
3. Update TypeScript types
4. Implement calculation logic in both frontend and backend
5. Update UI components to support new method

### 2. Adding New Currency
1. Add currency to `CURRENCY_OPTIONS` constant
2. Update currency validation in backend
3. Test currency conversion if needed
4. Update localization files

### 3. Extending Rate Card Features
1. Update database schema if needed
2. Modify `RatecardType` interface
3. Update API endpoints
4. Modify UI components
5. Update validation logic

### 4. Performance Considerations
- Use memoization for expensive calculations
- Implement pagination for large datasets
- Use WebSocket for real-time updates
- Optimize database queries with proper indexing

### 5. Testing Strategy
```typescript
// Unit tests for calculations
describe('Finance Calculations', () => {
  test('hourly rate calculation', () => {
    const cost = calculateHourlyCost(hours, rate);
    expect(cost).toBe(expectedCost);
  });

  test('man days calculation', () => {
    const cost = calculateManDaysCost(manDays, dayRate);
    expect(cost).toBe(expectedCost);
  });
});
```

## Migration Guide

### From Project-level to Organization-level Settings
```sql
-- Migration script example
WITH org_calc_methods AS (
  SELECT 
    o.id as org_id,
    COALESCE(
      (SELECT calculation_method 
       FROM projects p 
       WHERE p.team_id IN (SELECT id FROM teams WHERE organization_id = o.id)
       GROUP BY calculation_method 
       ORDER BY COUNT(*) DESC 
       LIMIT 1), 
      'hourly'
    ) as most_common_method
  FROM organizations o
)
UPDATE organizations 
SET calculation_method = ocm.most_common_method
FROM org_calc_methods ocm 
WHERE organizations.id = ocm.org_id;
```

## Security Considerations

1. **Permission Validation**: Always validate user permissions before allowing finance operations
2. **Data Sanitization**: Sanitize all numeric inputs for rates and budgets
3. **Audit Trail**: Log all finance-related changes for audit purposes
4. **Rate Validation**: Ensure rates are non-negative and within reasonable bounds

## Troubleshooting

### Common Issues

1. **Currency Mismatch**: Ensure project currency matches rate card currency
2. **Missing Rates**: Validate that all job roles have associated rates
3. **Calculation Errors**: Check organization calculation method settings
4. **Permission Errors**: Verify user has finance edit permissions

### Debug Tools
```typescript
// Enable debug logging
const DEBUG_FINANCE = process.env.NODE_ENV === 'development';

if (DEBUG_FINANCE) {
  console.log('Finance calculation:', {
    method: calculationMethod,
    hours: estimatedHours,
    rate: hourlyRate,
    result: calculatedCost
  });
}
```

## Future Enhancements

1. **Advanced Reporting**: More detailed financial reports and analytics
2. **Budget Alerts**: Automated notifications when budget thresholds are exceeded
3. **Multi-project Budgeting**: Cross-project budget management
4. **Cost Forecasting**: Predictive cost analysis based on historical data
5. **Integration APIs**: Third-party accounting system integrations 