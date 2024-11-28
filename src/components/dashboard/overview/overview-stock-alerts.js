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
    amount: 12,
    color: '#A020F0',
    name: 'Chicken Pie'
  },
  {
    amount: 25,
    color: '#FFA500',
    name: 'Chesse crockett'
  },
  {
    amount: 15,
    color: '#FF0000',
    name: 'Chese Whaffle'
  }
];


export const OverviewStockAlerts = (props) => (
  <Card {...props}>
    <CardContent>
      <Typography
        color="textSecondary"
        variant="overline"
      >
        Low Stock Alert
      </Typography>
      <Typography variant="h4">
        {numeral(52).format('0,0') + ' ' + 'units'}
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
        {quantities.map((stock) => (
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
                        borderColor: stock.color,
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
                    {numeral(stock.amount).format('0,0')}
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
