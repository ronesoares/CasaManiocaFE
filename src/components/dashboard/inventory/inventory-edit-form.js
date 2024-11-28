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
  TextField
} from '@mui/material';
import inventoryService from '../../../services/inventory-service';
import { useRouter } from 'next/router';

export const InventoryEditForm = (props) => {
  const router = useRouter();
  const { inventory, ...other } = props;
  const formik = useFormik({
    initialValues: {
      id: inventory.id || '',
      name: inventory.name || '',
      quantity: inventory.quantity || '',
      price: inventory.price || '',
      category: inventory.category || '',
      restockLevel: inventory.restockLevel || '',
      restockQuantity: inventory.restockQuantity || ''
    },
    validationSchema: Yup.object({
      id: Yup.number().optional(),
      name: Yup.string().max(255).required('Name is required'),
      quantity: Yup.number().required('Quantity is required'),
      price: Yup.number().required('Price is required'),
      category: Yup.string().max(100).optional(),
      restockLevel: Yup.number().required('Restock level is required'),
      restockQuantity: Yup.number().required('Restock quantity is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.id) {
          await inventoryService.edit(values);  
          toast.success('Item updated!');
        }
        else {
          const {id, ...filteredValues} = values;
          await inventoryService.insert(filteredValues);
          toast.success('Item inserted!');
        }

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        router.push('/dashboard/inventory');
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
      await inventoryService.delete(values);
      toast.success('Item deleted!');
      router.push('/dashboard/inventory');
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
        <CardHeader title={"Form inventory"} />
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
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.category && formik.errors.category)}
                fullWidth
                helperText={formik.touched.category && formik.errors.category}
                label="Category"
                name="category"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.category}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                fullWidth
                helperText={formik.touched.quantity && formik.errors.quantity}
                label="Quantity"
                name="quantity"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.price && formik.errors.price)}
                fullWidth
                helperText={formik.touched.price && formik.errors.price}
                label="Price"
                name="price"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.restockLevel && formik.errors.restockLevel)}
                fullWidth
                helperText={formik.touched.restockLevel && formik.errors.restockLevel}
                label="Restock level"
                name="restockLevel"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.restockLevel}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.restockQuantity && formik.errors.restockQuantity)}
                fullWidth
                helperText={formik.touched.restockQuantity && formik.errors.restockQuantity}
                label="Restock quantity"
                name="restockQuantity"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.restockQuantity}
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
            href="/dashboard/inventory"
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

InventoryEditForm.propTypes = {
    inventory: PropTypes.object.isRequired
};