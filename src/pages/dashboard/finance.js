import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../hocs/with-dashboard-layout';
import { Download as DownloadIcon } from '../../icons/download';
import { Reports as ReportsIcon } from '../../icons/reports';
import { Cog as CogIcon } from '../../icons/cog';
import { gtm } from '../../lib/gtm';

const Finance = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Finance 
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
                  Finance
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  m: -1
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Reports
                </Button>
                <Button
                  startIcon={<CogIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Settings
                </Button>
                <Button
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Export
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(Finance));

