import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { GridList1 } from '../../../components/widgets/grid-lists/grid-list-1';
import { GridList2 } from '../../../components/widgets/grid-lists/grid-list-2';
import { GridList3 } from '../../../components/widgets/grid-lists/grid-list-3';
import { GridList4 } from '../../../components/widgets/grid-lists/grid-list-4';
import { GridList5 } from '../../../components/widgets/grid-lists/grid-list-5';
import { GridList6 } from '../../../components/widgets/grid-lists/grid-list-6';
import { WidgetPreviewer } from '../../../components/widget-previewer';
import { withBrowseLayout } from '../../../hocs/with-browse-layout';
import { withMainLayout } from '../../../hocs/with-main-layout';
import { gtm } from '../../../lib/gtm';

const BrowseGridLists = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Browse: Grid Lists 
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
            element={<GridList1 />}
            name="Grid list with image"
          />
          <WidgetPreviewer
            element={<GridList2 />}
            name="Mixed grid list"
          />
          <WidgetPreviewer
            element={<GridList3 />}
            name="Grid list with bottom button"
          />
          <WidgetPreviewer
            element={<GridList4 />}
            name="Grid list with avatar and cover picture "
          />
          <WidgetPreviewer
            element={<GridList5 />}
            name="Grid list with picture and bottom buttons"
          />
          <WidgetPreviewer
            element={<GridList6 />}
            name="Grid list with picture and bottom buttons"
          />
        </Container>
      </Box>
    </>
  );
};

export default withMainLayout(withBrowseLayout(BrowseGridLists));
