import React, { useState } from 'react';
import { Select, InputNumber, Space, Typography, Tooltip, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateProjectCalculationMethodAsync } from '@/features/projects/finance/project-finance.slice';

const { Option } = Select;
const { Text } = Typography;

interface CalculationMethodSelectorProps {
  projectId: string;
  currentMethod: 'hourly' | 'man_days';
  currentHoursPerDay: number;
  disabled?: boolean;
  loading?: boolean;
}

const CalculationMethodSelector: React.FC<CalculationMethodSelectorProps> = ({
  projectId,
  currentMethod,
  currentHoursPerDay,
  disabled = false,
  loading = false
}) => {
  const { t } = useTranslation('project-view-finance');
  const dispatch = useAppDispatch();
  const [updating, setUpdating] = useState(false);
  const [tempHoursPerDay, setTempHoursPerDay] = useState(currentHoursPerDay);

  const handleMethodChange = async (newMethod: 'hourly' | 'man_days') => {
    if (newMethod === currentMethod) return;

    setUpdating(true);
    try {
      await dispatch(updateProjectCalculationMethodAsync({
        projectId,
        calculationMethod: newMethod,
        hoursPerDay: tempHoursPerDay
      })).unwrap();

      message.success(
        newMethod === 'hourly' 
          ? 'Switched to hourly rates calculation'
          : 'Switched to man days calculation'
      );
    } catch (error) {
      console.error('Failed to update calculation method:', error);
      message.error('Failed to update calculation method');
    } finally {
      setUpdating(false);
    }
  };

  const handleHoursPerDayChange = async (value: number | null) => {
    if (!value || value <= 0 || value === currentHoursPerDay) return;

    setTempHoursPerDay(value);
    
    if (currentMethod === 'man_days') {
      setUpdating(true);
      try {
        await dispatch(updateProjectCalculationMethodAsync({
          projectId,
          calculationMethod: currentMethod,
          hoursPerDay: value
        })).unwrap();

        message.success('Hours per day updated successfully');
      } catch (error) {
        console.error('Failed to update hours per day:', error);
        message.error('Failed to update hours per day');
        setTempHoursPerDay(currentHoursPerDay); // Revert on error
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Space align="center">
        <Text strong>{t('calculationMethodText')}:</Text>
        <Tooltip title="Choose how costs are calculated for this project">
          <InfoCircleOutlined style={{ color: '#666' }} />
        </Tooltip>
      </Space>
      
      <Space align="center" wrap>
        <Select
          value={currentMethod}
          onChange={handleMethodChange}
          disabled={disabled || loading || updating}
          loading={updating}
          style={{ width: 150 }}
        >
          <Option value="hourly">
            <Space>
              <span>{t('hourlyRatesText')}</span>
            </Space>
          </Option>
          <Option value="man_days">
            <Space>
              <span>{t('manDaysText')}</span>
            </Space>
          </Option>
        </Select>

        {currentMethod === 'man_days' && (
          <Space align="center">
            <Text>{t('hoursPerDayText')}:</Text>
            <InputNumber
              value={tempHoursPerDay}
              onChange={handleHoursPerDayChange}
              min={1}
              max={24}
              step={0.5}
              precision={1}
              disabled={disabled || loading || updating}
              style={{ width: 80 }}
            />
            <Text type="secondary">hours</Text>
          </Space>
        )}
      </Space>

      {currentMethod === 'hourly' && (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          Costs calculated using estimated hours × hourly rates
        </Text>
      )}

      {currentMethod === 'man_days' && (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          Costs calculated using estimated man days × daily rates ({tempHoursPerDay}h/day)
        </Text>
      )}
    </Space>
  );
};

export default CalculationMethodSelector; 