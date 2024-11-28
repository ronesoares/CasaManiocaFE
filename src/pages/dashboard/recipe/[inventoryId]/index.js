import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { RecipeListTable } from '../../../../components/dashboard/recipe/recipe-list-table';
import { withAuthGuard } from '../../../../hocs/with-auth-guard';
import { withDashboardLayout } from '../../../../hocs/with-dashboard-layout';
import { useMounted } from '../../../../hooks/use-mounted';
import { Plus as PlusIcon } from '../../../../icons/plus';
import { Search as SearchIcon } from '../../../../icons/search';
import { gtm } from '../../../../lib/gtm';
import { useTranslation } from 'react-i18next';
import NextLink from 'next/link';
import recipeService from '../../../../services/recipe-service';
import inventoryService from '../../../../services/inventory-service';
import { useRouter } from 'next/router';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { getInitials } from '../../../../utils/get-initials';

const tabs = [
  {
    label: '',
    value: ''
  },
];

const sortOptions = (t) => [
  {
    label: t('Ingredient (A-Z)'),
    value: 'ingredient.name|asc'
  },
  {
    label: t('Ingredient (Z-A)'),
    value: 'ingredient.name|desc'
  },
];

const getNestedProperty = (obj, propertyPath) => {
  return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const applyFilters = (recipes, filters) => recipes.filter((recipe) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['ingredient.name'];

    properties.forEach((property) => {
      const value = getNestedProperty(recipe, property);
      if (value && value.toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  return true;
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (recipes, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = recipes.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

        return a[1] - b[1];
  });

    return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (recipes, page, rowsPerPage) => recipes.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const RecipeList = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const queryRef = useRef(null);
  const router = useRouter();
  const { inventoryId } = router.query;
  const [recipes, setRecipes] = useState([]);
  const [product, setProduct] = useState({});
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions(t)[0].value);
  const [filters, setFilters] = useState({ query: '' });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getRecipes = useCallback(async () => {
    try {
      const inventory = await inventoryService.getById(inventoryId);      
      const data = await recipeService.getByProduct(inventory.id);

      if (isMounted()) {
        setProduct(inventory);
        setRecipes(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getRecipes();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredRecipes = applyFilters(recipes, filters);
  const sortedRecipes = applySort(filteredRecipes, sort);
  const paginatedRecipes = applyPagination(sortedRecipes, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          {t('Dashboard: Recipe List')}
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
            <NextLink
              href={`/dashboard/inventory`}
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
                  {t('Inventory') + ' - ' + product.name + ' - ' + product.category}
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            > 
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  src={product?.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(product.name)}
                </Avatar>
                <div>
                  <Typography
                    noWrap
                    variant="h4"
                  >
                    {product.name + ' - ' + product.category}
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
              <Grid item>
                <NextLink
                  href={`/dashboard/recipe/${product.id}/0/edit`}
                  passHref
                >
                  <Button
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                </NextLink>
                </Grid>
            </Grid>
          </Box>
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
            <Divider />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder={t("Search recipes")}
                />
              </Box>
              <TextField
                label={t("Sort By")}
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions(t).map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>
            <RecipeListTable
              recipes={paginatedRecipes}
              recipesCount={filteredRecipes.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(RecipeList));