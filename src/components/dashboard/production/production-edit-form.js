import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField
} from '@mui/material';
import productionService from '../../../services/production-service';
import inventoryService from '../../../services/inventory-service';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';
import { useMounted } from '../../../hooks/use-mounted';

dayjs.extend(localizedFormat);
dayjs.locale('pt-br');

export const ProductionEditForm = (props) => {
  const router = useRouter();
  const isMounted = useMounted();
  const { production, ...other } = props;
  const [products, setProducts] = useState([]);

  const getInventories = useCallback(async () => {
    try {
      const data = await inventoryService.getAll();

      if (isMounted()) {
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getInventories();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
  
  const formik = useFormik({
    initialValues: {
      id: production.id || '',
      quantityProduced: production.quantityProduced || '',
      productionDate: production.productionDate || new Date(),
      postProductionStock: production.postProductionStock || '',
      productId: production.product.id || '',
    },
    validationSchema: Yup.object({
      id: Yup.number().optional(),
      quantityProduced: Yup.number().required('Quantity produced is required'),
      postProductionStock: Yup.number().required('Post production stock is required'),
      productId: Yup.number().required('Product is required'),
      productionDate: Yup.date().required('Production date is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.id) {
          await productionService.edit(values);  
          toast.success('Item updated!');
        }
        else {
          const {id, ...filteredValues} = values;
          await productionService.insert(filteredValues);
          toast.success('Item inserted!');
        }

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        router.push('/dashboard/production');
      } catch (err) {
        console.error(err.message + '. ' + err.detail);
        toast.error(err.message + '. ' + err.detail);
        
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleDelete = async (values) => {
    try {
      await productionService.delete(values);
      toast.success('Item deleted!');
      router.push('/dashboard/production');
    } catch (err) {
      console.error(err.message + '. ' + err.detail);
      toast.error(err.message + '. ' + err.detail);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title={"Production form"} />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.productId && formik.errors.productId)}
                fullWidth
                helperText={formik.touched.productId && formik.errors.productId}
                select
                name="productId"
                label="Product"
                value={formik.values.productId}
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  const productId = event.target.value;
                  formik.setFieldValue('productId', productId);
                  const selectedProduct = products.find(product => product.id === productId);
                  formik.setFieldValue('postProductionStock', selectedProduct ? selectedProduct.quantity : 0);
                }}
                variant="outlined"
                style={{ display: 'block' }}
                disabled={formik.values.id > 0}
              >
                {products.sort((a, b) => a.name.localeCompare(b.name)).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name + ' - ' + option.category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.quantityProduced && formik.errors.quantityProduced)}
                fullWidth
                helperText={formik.touched.quantityProduced && formik.errors.quantityProduced}
                label="Quantity produced"
                name="quantityProduced"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantityProduced}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                  name="productionDate"
                  fullWidth
                  value={dayjs(formik.values.productionDate)}
                  label="Production date"
                  showTodayButton={true}
                  onChange={(newValue) => {
                    formik.values.productionDate = newValue;
                  }}
                  renderInput={
                    (params) => 
                      <TextField fullWidth {...params} />
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.postProductionStock && formik.errors.postProductionStock)}
                fullWidth
                helperText={formik.touched.postProductionStock && formik.errors.postProductionStock}
                label="Post production stock"
                name="postProductionStock"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.postProductionStock}
                disabled={true}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3
            }}
          >
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
          </Box>
        </CardContent>
        <CardActions
          sx={{
            flexWrap: 'wrap',
            m: -1
          }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Save
          </Button>
          <NextLink
            href="/dashboard/production"
            passHref
          >
            <Button
              component="a"
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: 'auto'
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button
            color="error"
            disabled={formik.isSubmitting}
            onClick={() => {handleDelete(formik.values)}}
          >
            Delete item
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

ProductionEditForm.propTypes = {
    production: PropTypes.object.isRequired
};