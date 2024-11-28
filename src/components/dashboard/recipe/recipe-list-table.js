import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Trash as TrashRightIcon } from '../../../icons/trash';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import recipeService from '../../../services/recipe-service';

export const RecipeListTable = (props) => {
  const { t } = useTranslation();
  
  const {
    recipes: initialRecipes,
    recipesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [recipes, setRecipes] = useState(initialRecipes);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  const handleDelete = async (values) => {
    try {
      values.productId = values.product.id;
      values.ingredientId = values.ingredient.id;
      const {product, ingredient, ...filteredValues} = values;

      await recipeService.delete(filteredValues);
      toast.success('Item deleted!');
      
      setRecipes(recipes.filter(item => item.id !== values.id));
    } catch (err) {
      console.error(err.message + '. ' + err.detail);
      toast.error(err.message + '. ' + err.detail);
    }
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                {t('Ingredient')}
              </TableCell>
              <TableCell>
                {t(`Unit of measure`)}
              </TableCell>
              <TableCell>
                {t(`Quantity per unit`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => {
              return (
                <TableRow
                  hover
                  key={recipe.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={recipe.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(recipe.ingredient.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/recipe/${recipe.product.id}/${recipe.id}/edit`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {recipe.ingredient.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${recipe.unitOfMeasure}`}
                  </TableCell>
                  <TableCell>
                    {numeral(recipe.quantityPerUnit).format(`0.00`)}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/recipe/${recipe.product.id}/${recipe.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/recipe/${recipe.product.id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <TrashRightIcon fontSize="small" onClick={() => {handleDelete(recipe)}} />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={recipesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RecipeListTable.propTypes = {
  recipes: PropTypes.array.isRequired,
  recipesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};