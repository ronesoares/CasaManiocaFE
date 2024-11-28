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
  TableRow,
  Typography
} from '@mui/material';
import { Trash as TrashRightIcon } from '../../../icons/trash';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import productionService from '../../../services/production-service';
import { SeverityPill } from '../../severity-pill';

export const ProductionListTable = (props) => {
  const { t } = useTranslation();
  
  const {
    productions: initialProductions,
    productionsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [productions, setProductions] = useState(initialProductions);

  useEffect(() => {
    setProductions(initialProductions);
  }, [initialProductions]);

  const handleDelete = async (values) => {
    try {
      values.productId = values.product.id;
      const {product, ...filteredValues} = values;

      await productionService.delete(filteredValues);
      toast.success('Item deleted!');
      
      setProductions(productions.filter(item => item.id !== values.id));
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
                {t('Item')}
              </TableCell>
              <TableCell>
                {t(`Category`)}
              </TableCell>
              <TableCell>
                {t(`Quantity produced`)}
              </TableCell>
              <TableCell>
                {t(`Actual stock`)}
              </TableCell>
              <TableCell>
                {t(`Production date`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productions.map((production) => {
              return (
                <TableRow
                  hover
                  key={production.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={production.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(production.product.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/production/${production.id}/edit`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {production.product.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${production.product.category}`}
                  </TableCell>
                  <TableCell>
                    {numeral(production.quantityProduced).format(`0.00`)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={(Number(production.product.quantity) >= Number(production.product.restockLevel)) ? 'success' : 'error'}>
                        {numeral(production.product.quantity).format(`0.00`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {format(new Date(production.productionDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/production/${production.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/production"
                      passHref
                    >
                      <IconButton component="a">
                        <TrashRightIcon fontSize="small" onClick={() => {handleDelete(production)}} />
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
        count={productionsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ProductionListTable.propTypes = {
  productions: PropTypes.array.isRequired,
  productionsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};