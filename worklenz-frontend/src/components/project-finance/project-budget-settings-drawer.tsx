import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Button, 
  Space, 
  Typography, 
  Divider, 
  Card, 
  Row, 
  Col, 
  Tooltip, 
  message,
  Switch,
  Alert
} from 'antd';
import { useTranslation } from 'react-i18next';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  DollarOutlined,
  CalculatorOutlined,
  ClockCircleOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateProjectCalculationMethodAsync } from '@/features/projects/finance/project-finance.slice';
import { projectsApiService } from '@/api/projects/projects.api.service';
import { CURRENCY_OPTIONS } from '@/shared/constants/currencies';

const { Option } = Select;
const { Text, Title } = Typography;

interface ProjectBudgetSettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
  projectId: string;
}

const ProjectBudgetSettingsDrawer: React.FC<ProjectBudgetSettingsDrawerProps> = ({
  visible,
  onClose,
  projectId
}) => {
  const { t } = useTranslation('project-view-finance');
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Get project data from Redux
  const { project } = useAppSelector((state) => state.projectReducer);
  const { project: financeProject } = useAppSelector((state) => state.projectFinances);

  // Form initial values
  const initialValues = {
    budget: project?.budget || 0,
    currency: project?.currency || 'usd',
    calculation_method: financeProject?.calculation_method || 'hourly',
    hours_per_day: financeProject?.hours_per_day || 8,
  };

  // Set form values when drawer opens
  useEffect(() => {
    if (visible && (project || financeProject)) {
      form.setFieldsValue(initialValues);
      setHasChanges(false);
    }
  }, [visible, project, financeProject, form]);

  // Handle form value changes
  const handleValuesChange = () => {
    setHasChanges(true);
  };

  // Handle save
  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Update calculation method if changed
      if (values.calculation_method !== financeProject?.calculation_method || 
          values.hours_per_day !== financeProject?.hours_per_day) {
        await dispatch(updateProjectCalculationMethodAsync({
          projectId,
          calculationMethod: values.calculation_method,
          hoursPerDay: values.hours_per_day
        })).unwrap();
      }

      // Update project budget and other settings
      const projectUpdateData = {
        id: projectId,
        budget: values.budget,
        currency: values.currency,
      };

      // Update project via API
      await projectsApiService.updateProject(projectUpdateData);

      message.success('Budget settings updated successfully');
      setHasChanges(false);
      onClose();
    } catch (error) {
      console.error('Failed to update budget settings:', error);
      message.error('Failed to update budget settings');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (hasChanges) {
      form.setFieldsValue(initialValues);
      setHasChanges(false);
    }
    onClose();
  };

  return (
    <Drawer
      title={
        <Space>
          <SettingOutlined />
          <span>Project Budget Settings</span>
        </Space>
      }
      width={480}
      open={visible}
      onClose={handleCancel}
      footer={
        <Space style={{ float: 'right' }}>
          <Button 
            icon={<CloseOutlined />} 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            loading={loading}
            disabled={!hasChanges}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={initialValues}
      >
        {/* Budget Configuration */}
        <Card 
          title={
            <Space>
              <DollarOutlined />
              <span>Budget Configuration</span>
            </Space>
          }
          size="small"
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="budget"
                label={
                  <Space>
                    <span>Project Budget</span>
                    <Tooltip title="Total budget allocated for this project">
                      <InfoCircleOutlined style={{ color: '#666' }} />
                    </Tooltip>
                  </Space>
                }
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  precision={2}
                  placeholder="Enter budget amount"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="currency"
                label="Currency"
              >
                <Select
                  options={CURRENCY_OPTIONS}
                  placeholder="Select currency"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Calculation Method */}
        <Card 
          title={
            <Space>
              <CalculatorOutlined />
              <span>Cost Calculation Method</span>
            </Space>
          }
          size="small"
          style={{ marginBottom: 16 }}
        >
          <Form.Item
            name="calculation_method"
            label="Calculation Method"
          >
            <Select placeholder="Select calculation method">
              <Option value="hourly">
                <Space>
                  <ClockCircleOutlined />
                  <span>Hourly Rates</span>
                </Space>
              </Option>
              <Option value="man_days">
                <Space>
                  <CalculatorOutlined />
                  <span>Man Days</span>
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.calculation_method !== currentValues.calculation_method
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('calculation_method') === 'man_days' ? (
                <Form.Item
                  name="hours_per_day"
                  label={
                    <Space>
                      <span>Working Hours per Day</span>
                      <Tooltip title="Number of working hours in a day for man-day calculations">
                        <InfoCircleOutlined style={{ color: '#666' }} />
                      </Tooltip>
                    </Space>
                  }
                >
                  <InputNumber
                    min={1}
                    max={24}
                    step={0.5}
                    precision={1}
                    style={{ width: '100%' }}
                    addonAfter="hours"
                  />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Alert
            message={
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.calculation_method !== currentValues.calculation_method
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('calculation_method') === 'hourly'
                    ? 'Costs will be calculated using estimated hours × hourly rates'
                    : `Costs will be calculated using estimated man days × daily rates (${getFieldValue('hours_per_day') || 8}h/day)`
                }
              </Form.Item>
            }
            type="info"
            showIcon
            style={{ marginTop: 8 }}
          />
        </Card>



        {/* Information Section */}
        <Card 
          title="Important Notes"
          size="small"
          type="inner"
        >
          <Space direction="vertical" size="small">
            <Text type="secondary">
              • Changing the calculation method will affect how costs are calculated for all tasks in this project
            </Text>
            <Text type="secondary">
              • Changes take effect immediately and will recalculate all project totals
            </Text>
            <Text type="secondary">
              • Budget settings apply to the entire project and all its tasks
            </Text>
          </Space>
        </Card>
      </Form>
    </Drawer>
  );
};

export default ProjectBudgetSettingsDrawer; 