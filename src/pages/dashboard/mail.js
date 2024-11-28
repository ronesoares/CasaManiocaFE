import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../hocs/with-dashboard-layout';
import { gtm } from '../../lib/gtm';
import {
  closeComposer,
  closeSidebar,
  getLabels,
  openComposer,
  openSidebar
} from '../../slices/mail';
import { useDispatch, useSelector } from '../../store';
import { Box } from '@mui/system';

const MailInner = styled('div',
  { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      marginLeft: -280
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      [theme.breakpoints.up('md')]: {
        marginLeft: 0
      },
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

const Mail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const rootRef = useRef(null);
  const { labels, isComposeOpen, isSidebarOpen } = useSelector((state) => state.mail);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'), { noSsr: true });
  const emailId = router.query.emailId;
  const label = router.query.label;

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
      dispatch(getLabels());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
      if (!mdUp) {
        dispatch(closeSidebar());
      } else {
        dispatch(openSidebar());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mdUp]);

  const handleToggleSidebar = () => {
    if (isSidebarOpen) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleComposeClick = () => {
    if (!mdUp) {
      dispatch(closeSidebar());
    }

    dispatch(openComposer());
  };

  const handleComposerClose = () => {
    dispatch(closeComposer());
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Mail 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        >
          
        </Box>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(Mail));
