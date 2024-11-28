import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ColorsMain } from '../../components/widgets/colors/colors-main';
import { ColorsSeverity } from '../../components/widgets/colors/colors-severity';
import { WidgetPreviewer } from '../../components/widget-previewer';
import { withBrowseLayout } from '../../hocs/with-browse-layout';
import { withMainLayout } from '../../hocs/with-main-layout';
import { gtm } from '../../lib/gtm';

const BrowseColors = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Browse: Colors 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.paper',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <WidgetPreviewer
            element={<ColorsMain />}
            name="Main colors"
          />
          <WidgetPreviewer
            element={<ColorsSeverity />}
            name="Severity colors"
          />
        </Container>
      </Box>
    </>
  );
};

export default withMainLayout(withBrowseLayout(BrowseColors));
