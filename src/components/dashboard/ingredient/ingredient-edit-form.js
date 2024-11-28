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
import ingredientService from '../../../services/ingredient-service';
import { useRouter } from 'next/router';

export const IngredientEditForm = (props) => {
  const router = useRouter();
  const { ingredient, ...other } = props;
  const formik = useFormik({
    initialValues: {
      id: ingredient.id || '',
      name: ingredient.name || '',
      unitOfMeasure: ingredient.unitOfMeasure || '',
      stockQuantity: ingredient.stockQuantity || '',
      reorderLevel: ingredient.reorderLevel || '',
    },
    validationSchema: Yup.object({
      id: Yup.number().optional(),
      name: Yup.string().max(255).required('Name is required'),
      unitOfMeasure: Yup.string().max(50).optional(),
      stockQuantity: Yup.number().required('Stock quantity is required'),
      reorderLevel: Yup.number().required('Reorder level is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.id) {
          await ingredientService.edit(values);  
          toast.success('Item updated!');
        }
        else {
          const {id, ...filteredValues} = values;
          await ingredientService.insert(filteredValues);
          toast.success('Item inserted!');
        }

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        router.push('/dashboard/ingredient');
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
      await ingredientService.delete(values);
      toast.success('Item deleted!');
      router.push('/dashboard/ingredient');
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
        <CardHeader title={"Form ingredient"} />
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
                error={Boolean(formik.touched.unitOfMeasure && formik.errors.unitOfMeasure)}
                fullWidth
                helperText={formik.touched.unitOfMeasure && formik.errors.unitOfMeasure}
                label="Unit of measure"
                name="unitOfMeasure"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.unitOfMeasure}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.stockQuantity && formik.errors.stockQuantity)}
                fullWidth
                helperText={formik.touched.stockQuantity && formik.errors.stockQuantity}
                label="Stock quantity"
                name="stockQuantity"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.stockQuantity}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.reorderLevel && formik.errors.reorderLevel)}
                fullWidth
                helperText={formik.touched.reorderLevel && formik.errors.reorderLevel}
                label="Reorder level"
                name="reorderLevel"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.reorderLevel}
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
            href="/dashboard/ingredient"
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

IngredientEditForm.propTypes = {
    ingredient: PropTypes.object.isRequired
};