import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { UserEditForm } from '../../../../components/dashboard/user/user-edit-form';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import userService from '../../../../services/user-service';

const UserEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userId } = router.query;
  const isMounted = useMounted();
  const [user, setUser] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getUser = useCallback(async () => {
    try {
      const data = userId > 0 ? await userService.getById(userId) : {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };

      if (isMounted()) {
        setUser(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: User Edit')}
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
              href="/dashboard/user"
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
                  {t('Users')}
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
              src={user?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(user.firstName, user.lastName)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {user?.email}
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
            <UserEditForm user={user} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(UserEdit));