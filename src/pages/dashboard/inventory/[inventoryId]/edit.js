import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { InventoryEditForm } from '../../../../components/dashboard/inventory/inventory-edit-form';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import inventoryService from '../../../../services/inventory-service';

const InventoryEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { inventoryId } = router.query;
  const isMounted = useMounted();
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getInventory = useCallback(async () => {
    try {
      const data = inventoryId > 0 ? await inventoryService.getById(inventoryId) : {
        id: 0,
        name: '',
        quantity: 0,
        price: 0,
        category: '',
        restockLevel: 0,
        restockQuantity: 0
      };

      if (isMounted()) {
        setInventory(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getInventory();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!inventory) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Inventory Edit')}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/dashboard/inventory"
              passHref
            >
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  {t('Inventories')}
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            <Avatar
              src={inventory?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(inventory.name)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {inventory?.email}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >

              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <InventoryEditForm inventory={inventory} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(InventoryEdit));