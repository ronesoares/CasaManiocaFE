import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { SaleEditForm } from '../../../../components/dashboard/sale/sale-edit-form';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import saleService from '../../../../services/sale-service';

const SaleEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { saleId } = router.query;
  const isMounted = useMounted();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getSale = useCallback(async () => {
    try {
      const data = saleId > 0 ? await saleService.getById(saleId) : {
        id: 0,
        product: {
          id: 0,
          name: '',
          category: ''
        },
        quantitySold: 0,
        saleDate: new Date(),
      };

      if (isMounted()) {
        setSale(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getSale();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!sale) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Product Sold Edit')}
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
              href="/dashboard/sale"
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
                  {t('Product Sold')}
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
              src={sale?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(sale.product.name)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {sale.product.category}
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
            <SaleEditForm sale={sale} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(SaleEdit));