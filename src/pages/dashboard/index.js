import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { OverviewTotalBalance } from '../../components/dashboard/overview/overview-total-balance';
import { OverviewStockAlerts } from '../../components/dashboard/overview/overview-stock-alerts';
import { OverviewLatestProductions } from '../../components/dashboard/overview/overview-latest-production';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../hocs/with-dashboard-layout';
import { gtm } from '../../lib/gtm';
import { useTranslation } from 'react-i18next';

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, []);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Overview
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  {t(getGreeting())}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: -1
                }}
              >
                                
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            {displayBanner && (
              <Grid
                item
                xs={12}
              >
                {/* <OverviewBanner onDismiss={handleDismissBanner} /> */}
              </Grid>
            )}
            <Grid
              item
              md={6}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewTotalBalance />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <OverviewStockAlerts />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <OverviewLatestProductions />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(Overview));
