# Project Finance & Ratecards - User Guide

## Introduction

Welcome to Worklenz's Project Finance system! This powerful feature helps you track project costs, manage budgets, and calculate accurate project estimates using customizable rate cards. Whether you're billing clients, tracking internal costs, or planning budgets, our finance tools provide the insights you need.

## Getting Started

### What are Rate Cards?

Rate cards are templates that define how much different job roles cost per hour or per day. Think of them as pricing sheets for your team's work. For example:

- **Senior Developer**: $100/hour or $800/day
- **Project Manager**: $80/hour or $640/day  
- **Designer**: $75/hour or $600/day

### What is Project Finance?

Project Finance gives you a complete view of your project's costs, including:
- **Estimated Costs**: Based on task estimates and rate cards
- **Actual Costs**: Based on time logged by team members
- **Budget Tracking**: Compare planned vs. actual spending
- **Variance Analysis**: See where you're over or under budget

## Setting Up Your Organization

### Choose Your Calculation Method

First, decide how your organization calculates costs:

1. **Go to Admin Center** → **Overview**
2. **Find "Organization Calculation Method"**
3. **Choose between:**
   - **Hourly Rates**: Cost = Hours × Hourly Rate
   - **Man Days**: Cost = Days × Daily Rate

> **Tip**: Most service-based businesses use hourly rates, while consulting firms often prefer man days.

### Configure Working Hours

If using man days, set your standard working hours per day (default is 8 hours).

## Creating Rate Cards

### Step 1: Access Rate Cards
1. **Navigate to Settings** → **Rate Cards**
2. **Click "Create Rate Card"**

### Step 2: Basic Information
- **Name**: Give your rate card a descriptive name (e.g., "2024 Client Rates", "Internal Costs")
- **Currency**: Select your preferred currency (USD, EUR, GBP, etc.)

### Step 3: Add Job Roles
1. **Click "Add Role"** or **"Add All"** to include all existing job titles
2. **For each role, set:**
   - **Rate per Hour**: For hourly calculations
   - **Rate per Day**: For man days calculations (shown only if organization uses man days)

### Step 4: Save Your Rate Card
- **Click "Save"** to create your rate card
- **Your rate card is now ready to use on projects**

### Managing Rate Cards

#### Editing Rate Cards
- **Click the edit icon** next to any rate card
- **Modify rates, add/remove roles, or change currency**
- **Save your changes**

#### Deleting Rate Cards
- **Click the delete icon** next to the rate card
- **Confirm deletion** (this cannot be undone)

> **Warning**: Deleting a rate card may affect projects currently using it.

## Using Finance in Projects

### Accessing Project Finance

1. **Open any project**
2. **Click the "Finance" tab**
3. **You'll see the finance dashboard with:**
   - Budget overview
   - Cost breakdown by tasks
   - Estimated vs. actual costs

### Setting Up Project Finance

#### Assign a Rate Card
1. **In the "Rate Card" tab**
2. **Click "Import Rate Card"**
3. **Select a rate card from your library**
4. **Customize rates if needed** (project-specific adjustments)

#### Set Project Budget
1. **Click the budget amount** in the finance overview
2. **Enter your project budget**
3. **Save the budget**

### Understanding the Finance Dashboard

#### Budget Statistics
- **Total Budget**: Your project's allocated budget
- **Estimated Cost**: Calculated from task estimates × rates
- **Actual Cost**: Based on logged time × rates
- **Variance**: Difference between budget and actual cost
- **Utilization**: Percentage of budget used

#### Task Cost Breakdown
View costs organized by:
- **Status**: Todo, In Progress, Done
- **Phase**: Project phases
- **Assignee**: Team member
- **Priority**: High, Medium, Low

#### Color Coding
- **Green**: Under budget
- **Yellow**: Approaching budget limit
- **Red**: Over budget

### Working with Task Estimates

#### Hourly Method
1. **Open any task**
2. **Set "Estimated Hours"**
3. **Cost is automatically calculated**: Hours × Hourly Rate

#### Man Days Method
1. **Open any task**
2. **Set "Estimated Man Days"**
3. **Cost is automatically calculated**: Man Days × Daily Rate

> **Pro Tip**: More accurate estimates lead to better budget planning!

### Tracking Actual Costs

Actual costs are calculated automatically when team members:
- **Log time** using the time tracker
- **Update task progress**
- **Mark tasks as complete**

## Advanced Features

### Billable vs. Non-Billable Tasks

Mark tasks as billable or non-billable to separate:
- **Client-billable work** (included in invoicing)
- **Internal overhead** (excluded from client bills)

### Multi-Currency Support

- **Each rate card** can have its own currency
- **Projects inherit** the rate card's currency
- **Change project currency** if needed in finance settings

### Export Finance Data

1. **In Project Finance tab**
2. **Click "Export"**
3. **Download Excel/CSV** with detailed cost breakdown
4. **Use for invoicing** or financial reporting

### Real-Time Updates

Finance data updates automatically when:
- Team members log time
- Task estimates change
- Project scope is modified
- Rate cards are updated

## Best Practices

### Rate Card Management

1. **Create Multiple Rate Cards** for different purposes:
   - Client work vs. internal projects
   - Different skill levels (Junior, Senior)
   - Regional variations

2. **Regular Updates**: Review and update rates quarterly or annually

3. **Version Control**: Create new rate cards for rate changes rather than editing existing ones

### Budget Planning

1. **Start with Estimates**: Get detailed task estimates before setting budgets
2. **Add Buffer**: Include 10-20% contingency for unexpected work
3. **Regular Reviews**: Check budget status weekly during active projects

### Team Collaboration

1. **Train Your Team**: Ensure everyone knows how to log time accurately
2. **Estimate Together**: Involve the team in task estimation
3. **Regular Check-ins**: Review finance status in team meetings

## Troubleshooting

### Common Issues

#### "No rates found for this role"
- **Solution**: Add the missing job role to your rate card
- **Or**: Assign the team member to a role that exists in the rate card

#### "Currency mismatch"
- **Solution**: Ensure project currency matches the rate card currency
- **Or**: Change the project currency in finance settings

#### "Budget showing incorrect values"
- **Solution**: Check if all tasks have proper estimates
- **Or**: Verify rate card assignments are correct

#### "Finance tab not loading"
- **Solution**: Refresh the page
- **Or**: Check if you have finance view permissions

### Getting Help

If you encounter issues:
1. **Check your permissions** - you may need finance access
2. **Verify rate card setup** - ensure all roles have rates
3. **Contact your admin** - they can adjust organization settings
4. **Reach out to support** - we're here to help!

## Permissions

### Finance View Permission
- **View project costs and budgets**
- **See finance dashboard**
- **Export finance data**

### Finance Edit Permission
- **Create and edit rate cards**
- **Modify project budgets**
- **Change project rate card assignments**
- **Update organization calculation method**

> **Note**: Permissions are set by your organization admin.

## Tips for Success

### For Project Managers
- **Set realistic budgets** based on detailed estimates
- **Monitor variance regularly** to catch issues early
- **Use different rate cards** for different types of projects
- **Export data regularly** for stakeholder reporting

### For Team Leaders
- **Ensure accurate time logging** from your team
- **Review estimates** before tasks begin
- **Update estimates** when scope changes
- **Use billable flags** to separate client vs. internal work

### For Finance Teams
- **Regular rate reviews** to ensure profitability
- **Analyze project patterns** to improve future estimates
- **Use export features** for integration with accounting systems
- **Monitor organization-wide** cost trends

## Conclusion

Worklenz's Project Finance system gives you the tools to:
- **Track costs accurately** with flexible rate cards
- **Stay within budget** with real-time monitoring
- **Make informed decisions** with detailed analytics
- **Improve estimates** over time with historical data

Start by creating your first rate card and applying it to a project. As you use the system, you'll discover how it transforms your project financial management!

---

*Need more help? Contact your system administrator or reach out to our support team.* 