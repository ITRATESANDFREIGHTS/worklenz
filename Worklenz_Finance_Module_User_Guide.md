# Worklenz Finance Module - User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Finance Setup](#project-finance-setup)
4. [Rate Cards Management](#rate-cards-management)
5. [Finance Table Overview](#finance-table-overview)
6. [Task Financial Management](#task-financial-management)
7. [Calculation Methods](#calculation-methods)
8. [Financial Metrics Explained](#financial-metrics-explained)
9. [Export Functionality](#export-functionality)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Introduction

The Worklenz Finance Module is a comprehensive project financial management system that enables you to:
- Track project costs and budgets
- Manage team member rates through rate cards
- Monitor task-level financial performance
- Compare estimated vs. actual costs
- Export financial reports
- Support both hourly and man-days calculation methods

---

## Getting Started

### Accessing the Finance Module
1. Navigate to your project
2. Click on the **Finance** tab
3. The finance table will display all tasks organized by your selected grouping (Status, Priority, or Phases)

### Initial Setup Requirements
Before using the finance module effectively, ensure you have:
- Project team members assigned
- Task time estimates configured
- Rate cards set up for team members
- Project currency and budget defined

---

## Project Finance Setup

### Setting Project Currency
1. Navigate to Project Settings or use the Finance tab
2. Select your preferred currency (e.g., USD, EUR, GBP)
3. All financial calculations will be displayed in this currency
4. **Note**: Currency changes are logged for audit purposes

### Setting Project Budget
1. Access the project finance settings
2. Enter the total project budget amount
3. This budget will be used for variance calculations
4. Budget changes are tracked and logged

### Calculation Method Configuration
The system supports two calculation methods that are configured at the organization level through Admin Center:

#### Hourly Method
- Costs calculated based on hourly rates × hours worked
- Best for projects with flexible working patterns
- Rates defined per hour in rate cards

#### Man-Days Method
- Costs calculated based on man-day rates × man-days worked
- Best for projects with fixed daily rates
- Configure hours per day (default: 8 hours)
- Rates defined per day in rate cards

**To Change Calculation Method:**
1. Go to Admin Center → Overview
2. Select either "Hourly" or "Man Days" as the organization calculation method
3. If selecting Man Days, set hours per day (default: 8 hours)
4. Update rate cards accordingly
5. **Note**: This setting applies organization-wide to all projects

---

## Rate Cards Management

Rate cards define how much each team member costs for the project. This is essential for accurate financial calculations.

### Setting Up Rate Cards
1. **Access Rate Cards**: Navigate to project settings or finance configuration
2. **Assign Job Titles**: Each team member should have a job title assigned
3. **Define Rates**:
   - **Hourly Rate**: Cost per hour for hourly calculation method
   - **Man-Day Rate**: Cost per day for man-days calculation method

### Rate Card Configuration Process
1. **Create Job Titles** (if not already created):
   - Developer, Designer, Project Manager, etc.
   - Each job title can have different rates

2. **Assign Team Members to Rate Cards**:
   - Go to project members section
   - Assign each member to a rate card role
   - Members without rate cards will show $0.00 costs

3. **Set Rates**:
   - Enter hourly rates for hourly-based projects
   - Enter man-day rates for man-days projects
   - Rates can be updated anytime and will affect future calculations

### Rate Card Best Practices
- Regularly review and update rates
- Consider different rates for different skill levels
- Document rate changes for audit purposes
- Ensure all active team members have assigned rate cards

---

## Finance Table Overview

### Table Structure
The finance table displays tasks hierarchically with the following features:

#### Grouping Options
- **By Status**: Groups tasks by their current status (To Do, In Progress, Done, etc.)
- **By Priority**: Groups tasks by priority level (High, Medium, Low)
- **By Phases**: Groups tasks by project phases

#### Task Hierarchy
- **Parent Tasks**: Display with expand/collapse functionality
- **Subtasks**: Indented under parent tasks
- **Financial Aggregation**: Parent tasks show totals from all child tasks

### Column Explanations

#### Core Columns
- **Task**: Task name with hierarchy indicators
- **Members**: Team members assigned to the task with avatars

#### Time-Based Columns
- **Hours**: Estimated time in hours/minutes/seconds format
- **Man Days**: Estimated effort in man-days (when using man-days calculation)
- **Total Time Logged**: Actual time spent on the task

#### Cost Columns
- **Estimated Cost**: Calculated cost based on estimates and rate cards
- **Cost**: Actual cost based on logged time and rate cards
- **Fixed Cost**: Additional fixed costs not related to time
- **Total Budget**: Estimated Cost + Fixed Cost
- **Total Actual**: Actual Cost + Fixed Cost
- **Variance**: Difference between budget and actual (positive = under budget)

### Visual Indicators
- **Dollar Icon**: Indicates billable tasks
- **Color Coding**: Groups have different colors for easy identification
- **Expand/Collapse Icons**: Show task hierarchy status

---

## Task Financial Management

### Managing Fixed Costs
Fixed costs are additional expenses not related to time tracking:

1. **Adding Fixed Costs**:
   - Click on the fixed cost cell for any task
   - Enter the amount
   - System auto-saves after 5 seconds or press Enter

2. **Fixed Cost Rules**:
   - Only leaf tasks (tasks without subtasks) can have editable fixed costs
   - Parent tasks show aggregated fixed costs from all subtasks
   - Fixed costs are added to labor costs for total calculations

3. **Fixed Cost Examples**:
   - Software licenses
   - Hardware costs
   - Third-party services
   - Travel expenses

### Task Hierarchy Financial Rules
- **Leaf Tasks**: Actual values from time logs and fixed costs
- **Parent Tasks**: Aggregated values from all child tasks (deepest level)
- **No Double Counting**: System ensures parent task values don't duplicate child values

### Billable vs Non-Billable Tasks
- Use the billable filter to show only billable or non-billable tasks
- Billable tasks are marked with a dollar icon
- Affects which tasks are included in financial calculations

---

## Calculation Methods

### How Financial Calculations Work

#### Hourly Method Calculations
```
Estimated Cost = Estimated Hours × Hourly Rate
Actual Cost = Logged Hours × Hourly Rate
Total Budget = Estimated Cost + Fixed Cost
Total Actual = Actual Cost + Fixed Cost
Variance = Total Budget - Total Actual
```

#### Man-Days Method Calculations
```
Estimated Man Days = Estimated Hours ÷ Hours Per Day
Actual Man Days = Logged Hours ÷ Hours Per Day
Estimated Cost = Estimated Man Days × Man-Day Rate
Actual Cost = Actual Man Days × Man-Day Rate
Total Budget = Estimated Cost + Fixed Cost
Total Actual = Actual Cost + Fixed Cost
Variance = Total Budget - Total Actual
```

#### Hierarchical Calculations
- **Parent Tasks**: Sum of all leaf (deepest level) tasks only
- **No Double Counting**: Intermediate parent values are excluded
- **Real-time Updates**: All calculations update automatically when data changes

### Rate Fallback Logic
If a team member doesn't have the preferred rate type:
- **Man-Days Projects**: Falls back to hourly rate if man-day rate is not set
- **Hourly Projects**: Uses hourly rate directly
- **No Rate Card**: Shows $0.00 for costs

---

## Financial Metrics Explained

### Understanding Key Metrics

#### Variance Analysis
- **Positive Variance**: Project is under budget (good)
- **Negative Variance**: Project is over budget (requires attention)
- **Color Coding**: Green for positive, red for negative

#### Budget vs. Actual
- **Total Budget**: What you planned to spend
- **Total Actual**: What you actually spent
- **Tracks Performance**: Shows if project is on track financially

#### Time Tracking Impact
- **Estimated Hours**: Based on task estimates
- **Logged Hours**: Actual time tracked by team members
- **Cost Calculation**: Directly impacts actual costs

### Summary Totals
The table shows totals for:
- All time metrics across visible tasks
- All cost metrics with proper aggregation
- Overall project financial performance

---

## Export Functionality

### Exporting Finance Data
1. **Access Export**: Use the export button in the finance tab
2. **File Format**: Downloads as Excel (.xlsx) file
3. **File Naming**: `ProjectName_Finance_Data_YYYY-MM-DD_HH-mm-ss.xlsx`

### Export Contents
The exported file includes:
- **Project Information**: Name, currency, export date
- **Task Details**: All visible tasks with financial data
- **Formatted Data**: Numbers formatted with proper currency
- **Hierarchy**: Task relationships maintained
- **All Columns**: Complete financial breakdown

### Export Use Cases
- **Client Reporting**: Professional financial summaries
- **Budget Analysis**: Detailed cost breakdowns
- **Archive Records**: Historical financial data
- **External Analysis**: Use in other financial tools

---

## Best Practices

### Project Setup
1. **Define Rate Cards Early**: Set up rate cards before starting time tracking
2. **Regular Updates**: Keep rates current and accurate
3. **Clear Job Titles**: Use descriptive job titles for rate cards
4. **Budget Planning**: Set realistic project budgets

### Ongoing Management
1. **Monitor Variance**: Regular check for budget deviations
2. **Update Fixed Costs**: Add expenses as they occur
3. **Review Time Estimates**: Adjust estimates based on actual performance
4. **Export Regularly**: Create periodic financial reports

### Team Training
1. **Time Tracking**: Ensure accurate time logging
2. **Task Management**: Proper task hierarchy setup
3. **Rate Understanding**: Team awareness of cost implications
4. **Billable Guidelines**: Clear policies on billable vs. non-billable work

---

## Troubleshooting

### Common Issues and Solutions

#### "Cannot edit fixed cost for parent tasks"
- **Cause**: Trying to edit fixed cost on a task with subtasks
- **Solution**: Edit fixed costs only on leaf tasks (tasks without subtasks)
- **Reason**: Parent tasks aggregate costs from children to avoid double-counting

#### Zero costs showing despite time logged
- **Cause**: Team member not assigned to rate card
- **Solution**: Assign team member to appropriate rate card with defined rates

#### Incorrect totals in parent tasks
- **Cause**: System aggregating from deepest level only (correct behavior)
- **Solution**: Ensure all leaf tasks have proper estimates and rate assignments

#### Export not including all data
- **Cause**: Filters or grouping hiding tasks
- **Solution**: Check current filters and grouping settings before export

#### Man-days calculations seem incorrect
- **Cause**: Hours per day setting may not match expectations
- **Solution**: Verify hours per day setting in project configuration

### Getting Help
- Check task assignments and rate cards first
- Verify calculation method matches your needs
- Ensure time estimates are properly set
- Contact system administrator for rate card access issues

---

## Conclusion

The Worklenz Finance Module provides comprehensive project financial management with flexible calculation methods, detailed tracking, and professional reporting capabilities. Proper setup of rate cards, budgets, and calculation methods ensures accurate financial tracking and reporting throughout your project lifecycle.

For additional support or advanced configuration options, consult your system administrator or Worklenz documentation. 