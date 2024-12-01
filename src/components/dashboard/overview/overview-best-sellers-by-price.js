import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Tooltip,
    Typography
  } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../../icons/information-circle-outlined';
import { Chart } from '../../chart';
import { getRandomColor } from '../../../utils/random-color';
import saleService from '../../../services/sale-service';
import { useEffect, useState } from 'react';

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 20);

export const OverviewBestSellersByPrice = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const listBestSellers = async () => {
      const sales = await saleService.getAll();
      const filtered = sales.filter(entity => new Date(entity.saleDate) >= sevenDaysAgo);

      const groupedByProduct = filtered.reduce((acc, entity) => {
        if (!acc[entity.product.id]) {
          acc[entity.product.id] = {
            product: entity.product,
            quantitySold: 0
          };
        }
        acc[entity.product.id].quantitySold += Number(entity.quantitySold);
        return acc;
      }, {});

      const groupedArray = Object.values(groupedByProduct).map(item => ({
        color: getRandomColor(),
        data: parseFloat((Number(item.quantitySold) * Number(item.product.price)).toFixed(2)),
        label: item.product.name
      }));

      setData(groupedArray);
    }

    listBestSellers();
  }, []);
  
    const chartOptions = {
      chart: {
        background: 'transparent',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      colors: data.map((item) => item.color),
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1
      },
      labels: data.map((item) => item.label),
      legend: {
        show: false
      },
      stroke: {
        width: 0
      },
      theme: {
        mode: theme.palette.mode
      }
    };
  
    const chartSeries = data.map((item) => item.data);
  
    return (
      <Card>
        <CardHeader
          title="Best Sellers by Price"
          action={(
            <Tooltip title="Top 5 best sellers in the last 7 days">
              <InformationCircleOutlinedIcon sx={{ color: 'action.active' }} />
            </Tooltip>
          )}
        />
        <Divider />
        <CardContent>
          <Chart
            height={200}
            options={chartOptions}
            series={chartSeries}
            type="donut"
          />
          <Grid container>
            {data.map((item) => (
              <Grid
                item
                key={item.label}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  p: 1
                }}
                xs={6}
              >
                <Box
                  sx={{
                    border: 3,
                    borderColor: item.color,
                    borderRadius: '50%',
                    height: 16,
                    mr: 1,
                    width: 16
                  }}
                />
                <Typography variant="subtitle2">
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    );
  };  