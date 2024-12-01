import numeral from 'numeral';
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import ingredientService from '../../../services/ingredient-service';
import { useEffect, useState } from 'react';
import { getRandomColor } from '../../../utils/random-color';

export const OverviewLowIngredientStockAlert = (props) => {
  const [sortedIngredients, setSortedIngredients] = useState([]);
  
  useEffect(() => {
    const listIngredient = async () => {
      const data = await ingredientService.getAll();
      const filtered = data.filter(entity => (entity.stockQuantity - entity.reorderLevel) <= 0);
      setSortedIngredients(filtered.sort((a, b) => (a.stockQuantity - a.reorderLevel) - (b.stockQuantity - b.reorderLevel)));      
    }

    listIngredient();
  }, []);

  return (
    <Card {...props}>
      <CardContent>
        <Typography
          color="textSecondary"
          variant="overline"
        >
          Low Ingredient Stock Alert
        </Typography>
        <Typography variant="h4">
          {numeral(sortedIngredients.length).format('0,0') + ' ' + 'ingredients'}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography
          color="textSecondary"
          variant="overline"
        >
          Available stock
        </Typography>
        <List
          disablePadding
          sx={{ pt: 2 }}
        >
          {sortedIngredients.map((stock) => (
            <ListItem
              disableGutters
              key={stock.name}
              sx={{
                pb: 2,
                pt: 0
              }}
            >
              <ListItemText
                disableTypography
                primary={(
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Box
                        sx={{
                          border: 3,
                          borderColor: getRandomColor(),
                          borderRadius: '50%',
                          height: 16,
                          mr: 1,
                          width: 16
                        }}
                      />
                      <Typography variant="subtitle2">
                        {stock.name}
                      </Typography>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                    >
                      {numeral(stock.stockQuantity - stock.reorderLevel).format('0.00')}
                    </Typography>
                  </Box>
                )}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          
        >
          
        </Box>
      </CardContent>
    </Card>
  );
};
