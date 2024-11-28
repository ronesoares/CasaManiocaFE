import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { RecipeEditForm } from '../../../../../components/dashboard/recipe/recipe-edit-form';
import { withAuthGuard } from '../../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../../hooks/use-mounted';
import { gtm } from '../../../../../lib/gtm';
import { getInitials } from '../../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import recipeService from '../../../../../services/recipe-service';
import inventoryService from '../../../../../services/inventory-service';

const RecipeEdit = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { inventoryId, recipeId } = router.query;
  const isMounted = useMounted();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getRecipe = useCallback(async () => {
    try {
      const product = await inventoryService.getById(inventoryId);

      const data = recipeId > 0 ? await recipeService.getById(recipeId) : {
        id: 0,
        ingredient: {
          id: 0,
          name: '',
          unitOfMeasure: ''
        },
        product: product,
        quantityPerUnit: 0,
        unitOfMeasure: '',
      };

      if (isMounted()) {
        setRecipe(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getRecipe();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!recipe) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Recipe Edit')}
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
              href={`/dashboard/recipe/${recipe.product.id}`}
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
                {t('Recipe') + ' - ' + recipe.product.name + ' - ' + recipe.product.category}
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
              src={recipe?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64
              }}
            >
              {getInitials(recipe.product.name)}
            </Avatar>
            <div>
              <Typography
                noWrap
                variant="h4"
              >
                {recipe.product.name + ' - ' + recipe.product.category}
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
            <RecipeEditForm recipe={recipe} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(RecipeEdit));