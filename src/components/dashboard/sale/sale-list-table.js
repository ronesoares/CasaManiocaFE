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
import saleService from '../../../services/sale-service';
import { format } from 'date-fns';

export const SaleListTable = (props) => {
  const { t } = useTranslation();
  
  const {
    sales: initialSales,
    salesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [sales, setSales] = useState(initialSales);

  useEffect(() => {
    setSales(initialSales);
  }, [initialSales]);

  const handleDelete = async (values) => {
    try {
      values.productId = values.product.id;
      const {product, ...filteredValues} = values;

      await saleService.delete(filteredValues);
      toast.success('Item deleted!');
      
      setSales(sales.filter(item => item.id !== values.id));
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
                {t(`Quantity sold`)}
              </TableCell>
              <TableCell>
                {t(`Actual stock`)}
              </TableCell>
              <TableCell>
                {t(`Sold date`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => {
              return (
                <TableRow
                  hover
                  key={sale.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={sale.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(sale.product.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/sale/${sale.id}/edit`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {sale.product.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${sale.product.category}`}
                  </TableCell>
                  <TableCell>
                    {numeral(sale.quantitySold).format(`0.00`)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={(Number(sale.product.quantity) >= Number(sale.product.restockLevel)) ? 'success' : 'error'}>
                        {numeral(sale.product.quantity).format(`0.00`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {format(new Date(sale.saleDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/sale/${sale.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/sale"
                      passHref
                    >
                      <IconButton component="a">
                        <TrashRightIcon fontSize="small" onClick={() => {handleDelete(sale)}} />
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
        count={salesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

SaleListTable.propTypes = {
  sales: PropTypes.array.isRequired,
  salesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};