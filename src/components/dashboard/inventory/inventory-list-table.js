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
import { ReceiptTax as ReceiptTaxIcon } from '../../../icons/receipt-tax';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import inventoryService from '../../../services/inventory-service';

export const InventoryListTable = (props) => {
  const { t } = useTranslation();
  
  const {
    inventories: initialInventories,
    inventoriesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [inventories, setInventories] = useState(initialInventories);

  useEffect(() => {
    setInventories(initialInventories);
  }, [initialInventories]);

  const handleDelete = async (values) => {
    try {
      await inventoryService.delete(values);
      toast.success('Item deleted!');
      
      setInventories(inventories.filter(item => item.id !== values.id));
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
                {t(`Category`)}
              </TableCell>
              <TableCell>
                {t(`Quantity`)}
              </TableCell>
              <TableCell>
                {t(`Restock level`)}
              </TableCell>
              <TableCell>
                {t(`Price`)}
              </TableCell>
              <TableCell align="right">
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventories.map((inventory) => {
              return (
                <TableRow
                  hover
                  key={inventory.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={inventory.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(inventory.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/inventory/${inventory.id}/edit`}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {inventory.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${inventory.category}`}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <SeverityPill color={(Number(inventory.quantity) >= Number(inventory.restockLevel)) ? 'success' : 'error'}>
                        {numeral(inventory.quantity).format(`0.00`)}
                      </SeverityPill>
                    </Typography>
                  </TableCell>
                  <TableCell> 
                    {numeral(inventory.restockLevel).format(`0.00`)}
                  </TableCell>
                  <TableCell> 
                    {numeral(inventory.price).format(`0.00`)}
                  </TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/inventory/${inventory.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/inventory"
                      passHref
                    >
                      <IconButton component="a">
                        <TrashRightIcon fontSize="small" onClick={() => {handleDelete(inventory)}} />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/recipe/${inventory.id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <ReceiptTaxIcon fontSize="small" />
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
        count={inventoriesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

InventoryListTable.propTypes = {
  inventories: PropTypes.array.isRequired,
  inventoriesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};