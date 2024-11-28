import { format, subDays } from 'date-fns';
import numeral from 'numeral';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';

const productions = [
  {
    id: 'd46800328cd510a668253b45',
    amount: 250,
    number: 'units',
    date: new Date(),
    sender: 'Chicken Crockett',
   },
  {
    id: 'b4b19b21656e44b487441c50',
    amount: 143,
    number: 'units',
    date: subDays(new Date(), 1),
    sender: 'Original Cheese Bread',
   },
  {
    id: '56c09ad91f6d44cb313397db',
    amount: 182,
    number: 'units',
    date: subDays(new Date(), 1),
    sender: 'Cheese Whaffle',
  },
  {
    id: 'aaeb96c5a131a55d9623f44d',
    amount: 450,
    number: 'units',
    date: subDays(new Date(), 3),
    sender: 'Beef Crockett',
  }
];

export const OverviewLatestProductions = (props) => (
  <Card {...props}>
    <CardHeader title="Latest productions" />
    <Scrollbar>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
          <TableCell colSpan={2}>
              Production Date
            </TableCell>
            <TableCell />
            <TableCell>
              Quantity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productions.map((production) => (
            <TableRow
              key={production.id}
              sx={{
                '&:last-child td': {
                  border: 0
                }
              }}
            >
              <TableCell width={100}>
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'neutral.800'
                      : 'neutral.200',
                    borderRadius: 2,
                    maxWidth: 'fit-content'
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="subtitle2"
                  >
                    {format(production.date, 'LLL').toUpperCase()}
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="h6"
                  >
                    {format(production.date, 'd')}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <div>
                  <Typography variant="subtitle2">
                    {production.sender}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    
                  </Typography>
                </div>
              </TableCell>
              <TableCell>
                <SeverityPill
                  color={(production.status === 'confirmed' && 'success')
                  || (production.status === 'failed' && 'error')
                  || 'warning'}
                >
                  {production.status}
                </SeverityPill>
              </TableCell>
              <TableCell width={180}>
                <Typography
                  color={production.type === 'receive'
                    ? 'success.main'
                    : 'error.main'}
                  variant="subtitle2"
                >
                  {production.type === 'receive' }
                  {' '}
                  {numeral(production.amount).format('0,0')}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {production.number.toUpperCase()}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  </Card>
);
