import numeral from 'numeral';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';


const quantities = [
  {
    amount: 120,
    color: '#2F3EB1',
    name: 'Chicken Crockett'
  },
  {
    amount: 80,
    color: '#0C7CD5',
    name: 'Chesse bread'
  },
  {
    amount: 82,
    color: '#7BC67E',
    name: 'Chese Whaffle'
  }
];


export const OverviewTotalBalance = (props) => (
  <Card {...props}>
    <CardContent>
      <Typography
        color="textSecondary"
        variant="overline"
      >
        Total Inventory
      </Typography>
      <Typography variant="h4">
        {numeral(282).format('0,0') + ' ' + 'units'}
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
        {quantities.map((quantity) => (
          <ListItem
            disableGutters
            key={quantity.name}
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
                        borderColor: quantity.color,
                        borderRadius: '50%',
                        height: 16,
                        mr: 1,
                        width: 16
                      }}
                    />
                    <Typography variant="subtitle2">
                      {quantity.name}
                    </Typography>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    {numeral(quantity.amount).format('0,0')}
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
