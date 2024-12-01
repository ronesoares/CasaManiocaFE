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
import inventoryService from '../../../services/inventory-service';
import { useEffect, useState } from 'react';
import { getRandomColor } from '../../../utils/random-color';

export const OverviewLowInventoryStockAlert = (props) => {
  const [sortedInventories, setSortedInventories] = useState([]);
  
  useEffect(() => {
    const listInventory = async () => {
      const data = await inventoryService.getAll();
      const filtered = data.filter(entity => (entity.quantity - entity.restockLevel) <= 0);
      setSortedInventories(filtered.sort((a, b) => (a.quantity - a.restockLevel) - (b.quantity - b.restockLevel)));
    }

    listInventory();
  }, []);
  
  return (
  <Card {...props}>
    <CardContent>
      <Typography
        color="textSecondary"
        variant="overline"
      >
        Low Inventory Stock Alert
      </Typography>
      <Typography variant="h4">
        {numeral(sortedInventories.length).format('0,0') + ' ' + 'inventories'}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Typography
        color="textSecondary"
        variant="overline"
      >
        Available quantity
      </Typography>
      <List
        disablePadding
        sx={{ pt: 2 }}
      >
        {sortedInventories.map((inventory) => (
          <ListItem
            disableGutters
            key={inventory.name}
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
                      {inventory.name}
                    </Typography>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    {numeral(inventory.quantity - inventory.restockLevel).format('0.00')}
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