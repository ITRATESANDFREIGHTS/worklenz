import { Drawer, Typography, Button, Table, Menu, Flex, Spin, Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchRateCards, toggleImportRatecardsDrawer } from '../finance-slice';
import { fetchRateCardById } from '../finance-slice';
import { insertProjectRateCardRoles } from '../project-finance-slice';
import { useParams } from 'react-router-dom';
import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import { IOrganization } from '@/types/admin-center/admin-center.types';

const ImportRatecardsDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const { t } = useTranslation('project-view-finance');

  const drawerRatecard = useAppSelector(
    (state) => state.financeReducer.drawerRatecard
  );
  const ratecardsList = useAppSelector(
    (state) => state.financeReducer.ratecardsList || []
  );
  const isDrawerOpen = useAppSelector(
    (state) => state.financeReducer.isImportRatecardsDrawerOpen
  );
  // Get project currency from project finances, fallback to finance reducer currency
  const projectCurrency = useAppSelector((state) => state.projectFinances.project?.currency);
  const fallbackCurrency = useAppSelector((state) => state.financeReducer.currency);
  const currency = (projectCurrency || fallbackCurrency || 'USD').toUpperCase();

  const rolesRedux = useAppSelector((state) => state.projectFinanceRateCard.rateCardRoles) || [];

  // Loading states
  const isRatecardsLoading = useAppSelector(
    (state) => state.financeReducer.isRatecardsLoading
  );

  const [selectedRatecardId, setSelectedRatecardId] = useState<string | null>(null);
  const [organization, setOrganization] = useState<IOrganization | null>(null);
  
  // Get calculation method from organization
  const calculationMethod = organization?.calculation_method || 'hourly';

  useEffect(() => {
    if (selectedRatecardId) {
      dispatch(fetchRateCardById(selectedRatecardId));
    }
  }, [selectedRatecardId, dispatch]);

  // Fetch organization details to get calculation method
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await adminCenterApiService.getOrganizationDetails();
        if (response.done) {
          setOrganization(response.body);
        }
      } catch (error) {
        console.error('Failed to fetch organization details:', error);
      }
    };

    if (isDrawerOpen) {
      fetchOrganization();
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isDrawerOpen) {
      dispatch(fetchRateCards({
        index: 1,
        size: 1000,
        field: 'name',
        order: 'asc',
        search: '',
      }));
    }
  }, [isDrawerOpen, dispatch]);

  useEffect(() => {
    if (ratecardsList.length > 0 && !selectedRatecardId) {
      setSelectedRatecardId(ratecardsList[0].id || null);
    }
  }, [ratecardsList, selectedRatecardId]);

  const columns = [
    {
      title: t('jobTitleColumn'),
      dataIndex: 'jobtitle',
      render: (text: string) => (
        <Typography.Text className="group-hover:text-[#1890ff]">
          {text}
        </Typography.Text>
      ),
    },
    {
      title: `${calculationMethod === 'man_days' ? t('ratePerManDayColumn') : t('ratePerHourColumn')} (${currency})`,
      dataIndex: 'rate',
      render: (text: number) => <Typography.Text>{text}</Typography.Text>,
    },
  ];

  return (
    <Drawer
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          {t('ratecardsPluralText')}
        </Typography.Text>
      }
      footer={
        <div style={{ textAlign: 'right' }}>
          {/* Alert message */}
          {rolesRedux.length !== 0 ? (
            <div style={{ textAlign: 'right' }}>
              <Alert
                message={t('alreadyImportedRateCardMessage') || 'A rate card has already been imported. Clear all imported rate cards to add a new one.'}
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </div>
          ) : (
            <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={() => {
                  if (!projectId) {
                    // Handle missing project id (show error, etc.)
                    return;
                  }
                  if (drawerRatecard?.jobRolesList?.length) {
                    dispatch(
                      insertProjectRateCardRoles({
                        project_id: projectId,
                        roles: drawerRatecard.jobRolesList
                          .filter((role) => typeof role.rate !== 'undefined' && role.job_title_id)
                          .map((role) => ({
                            ...role,
                            job_title_id: role.job_title_id!,
                            rate: Number(role.rate),
                          })),
                      })
                    );
                  }
                  dispatch(toggleImportRatecardsDrawer());
                }}
              >
                {t('import')}
              </Button>
            </div>
          )}
        </div>
      }
      open={isDrawerOpen}
      onClose={() => dispatch(toggleImportRatecardsDrawer())}
      width={1000}
    >
      <Flex gap={12}>
        {/* Sidebar menu with loading */}
        <Spin spinning={isRatecardsLoading} style={{ width: '20%' }}>
          <Menu
            mode="vertical"
            style={{ width: '100%' }}
            selectedKeys={
              selectedRatecardId
                ? [selectedRatecardId]
                : ratecardsList[0]?.id
                  ? [ratecardsList[0].id]
                  : []
            }
            onClick={({ key }) => setSelectedRatecardId(key)}
          >
            {ratecardsList.map((ratecard) => (
              <Menu.Item key={ratecard.id}>
                {ratecard.name}
              </Menu.Item>
            ))}
          </Menu>
        </Spin>

        {/* Table for job roles with loading */}
        <Table
          style={{ flex: 1 }}
          dataSource={drawerRatecard?.jobRolesList || []}
          columns={columns}
          rowKey={(record) => record.job_title_id || record.id || Math.random().toString()}
          onRow={() => ({
            className: 'group',
            style: { cursor: 'pointer' },
          })}
          pagination={false}
          loading={isRatecardsLoading}
        />
      </Flex>
    </Drawer>
  );
};

export default ImportRatecardsDrawer;