import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { SeverityPill } from '../../severity-pill';
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
  TableRow,
  Typography
} from '@mui/material';
import { Trash as TrashRightIcon } from '../../../icons/trash';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import ingredientService from '../../../services/ingredient-service';

export const IngredientListTable = (props) => {
  const { t } = useTranslation();
  
  const {
    ingredients: initialIngredients,
    ingredientsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [ingredients, setIngredients] = useState(initialIngredients);

  useEffect(() => {
    setIngredients(initialIngredients);
  }, [initialIngredients]);

  const handleDelete = async (values) => {
    try {
      await ingredientService.delete(values);
      toast.success('Item deleted!');
      
      setIngredients(ingredients.filter(item => item.id !== values.id));
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
                {t('Name')}
              </TableCell>
              <TableCell>
                {t(`Measurement unit`)}
              </TableCell>
              <TableCell>
                {t(`Stock quantity`)}
              </TableCell>
              <TableCell>
                {t(`Reorder level`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient) => {
              return (
                <TableRow
                  hover
                  key={ingredient.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={ingredient.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(ingredient.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/ingredient/${ingredient.id}/edit`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {ingredient.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${ingredient.unitOfMeasure}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={Number(ingredient.stockQuantity) >= Number(ingredient.reorderLevel) ? 'success' : 'error'}>
                        {numeral(ingredient.stockQuantity).format(`0.00`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {numeral(ingredient.reorderLevel).format(`0.00`)}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/ingredient/${ingredient.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/ingredient"
                      passHref
                    >
                      <IconButton component="a">
                        <TrashRightIcon fontSize="small" onClick={() => {handleDelete(ingredient)}} />
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
        count={ingredientsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

IngredientListTable.propTypes = {
  ingredients: PropTypes.array.isRequired,
  ingredientsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};