import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { InputCheckbox } from '../../components/widgets/inputs/input-checkbox';
import { InputRadio } from '../../components/widgets/inputs/input-radio';
import { InputSwitch } from '../../components/widgets/inputs/input-switch';
import { InputTextField } from '../../components/widgets/inputs/input-text-field';
import { InputMixed } from '../../components/widgets/inputs/input-mixed';
import { WidgetPreviewer } from '../../components/widget-previewer';
import { withBrowseLayout } from '../../hocs/with-browse-layout';
import { withMainLayout } from '../../hocs/with-main-layout';
import { gtm } from '../../lib/gtm';

const BrowseInputs = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Browse: Inputs 
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
            element={<InputCheckbox />}
            name="Checkbox with additional text"
          />
          <WidgetPreviewer
            element={<InputRadio />}
            name="Radio button with additional text"
          />
          <WidgetPreviewer
            element={<InputSwitch />}
            name="Switch with top description"
          />
          <WidgetPreviewer
            element={<InputTextField />}
            name="Text fields integrated in a form"
          />
          <WidgetPreviewer
            element={<InputMixed />}
            name="Mixed input form"
          />
        </Container>
      </Box>
    </>
  );
};

export default withMainLayout(withBrowseLayout(BrowseInputs));
