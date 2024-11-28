import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ProductionEditForm } from '../../../../components/dashboard/production/production-edit-form';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import productionService from '../../../../services/production-service';

const ProductionEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { productionId } = router.query;
  const isMounted = useMounted();
  const [production, setProduction] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProduction = useCallback(async () => {
    try {
      const data = productionId > 0 ? await productionService.getById(productionId) : {
        id: 0,
        quantityProduced: 0,
        product: {
          id: 0,
          name: '',
          category: ''
        },
        productionDate: new Date(),
        postProductionStock: 0,
      };

      if (isMounted()) {
        setProduction(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getProduction();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!production) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Production Edit')}
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
              href="/dashboard/production"
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
                  {t('Productions')}
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
              src={production?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(production.product.name)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {production.product.category}
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
            <ProductionEditForm production={production} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(ProductionEdit));