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
import recipeService from '../../../services/recipe-service';
import ingredientService from '../../../services/ingredient-service';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMounted } from '../../../hooks/use-mounted';

export const RecipeEditForm = (props) => {
  const router = useRouter();
  const isMounted = useMounted();
  const { recipe, ...other } = props;
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = useCallback(async () => {
    try {
      const data = await ingredientService.getAll();

      if (isMounted()) {
        setIngredients(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getIngredients();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const formik = useFormik({
    initialValues: {
      id: recipe.id || '',
      quantityPerUnit: recipe.quantityPerUnit || '',
      unitOfMeasure: recipe.unitOfMeasure || '',
      productId: recipe.product.id || '',
      ingredientId: recipe.ingredient.id || '',
    },
    validationSchema: Yup.object({
      id: Yup.number().optional(),
      quantityPerUnit: Yup.number().required('Quantity per unit is required'),
      unitOfMeasure: Yup.string().max(50).required('Unit of measure is required'),
      productId: Yup.number().required('Product is required'),
      ingredientId: Yup.number().required('Ingredient is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (values.id) {
          await recipeService.edit(values);  
          toast.success('Item updated!');
        }
        else {
          const {id, ...filteredValues} = values;
          await recipeService.insert(filteredValues);
          toast.success('Item inserted!');
        }

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        router.push(`/dashboard/recipe/${values.productId}`);
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
      await recipeService.delete(values);
      toast.success('Item deleted!');
      router.push(`/dashboard/recipe/${values.productId}`);
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
        <CardHeader title={"Form recipe"} />
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
                error={Boolean(formik.touched.ingredientId && formik.errors.ingredientId)}
                fullWidth
                helperText={formik.touched.ingredientId && formik.errors.ingredientId}
                select
                name="ingredientId"
                label="Ingredient"
                value={formik.values.ingredientId}
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  const ingredientId = event.target.value;
                  formik.setFieldValue('ingredientId', ingredientId);

                  const selectedIngredient = ingredients.find(ingredient => ingredient.id === ingredientId);
                  formik.setFieldValue('unitOfMeasure', selectedIngredient ? selectedIngredient.unitOfMeasure : '');
                }}
                variant="outlined"
                style={{ display: 'block' }}
                disabled={formik.values.id > 0}
              >
                {ingredients.sort((a, b) => a.name.localeCompare(b.name)).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name + ' - ' + option.unitOfMeasure}
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
                error={Boolean(formik.touched.quantityPerUnit && formik.errors.quantityPerUnit)}
                fullWidth
                helperText={formik.touched.quantityPerUnit && formik.errors.quantityPerUnit}
                label="Quantity per unit"
                name="quantityPerUnit"
                type="number"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantityPerUnit}
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
            href={`/dashboard/recipe/${formik.values.productId}`}
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

RecipeEditForm.propTypes = {
    recipe: PropTypes.object.isRequired
};