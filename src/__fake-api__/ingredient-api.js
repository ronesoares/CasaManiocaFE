import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const now = new Date();
const formattedDate = format(now, 'yyyy-MM-dd HH:mm:ss');


class IngredientApi {
  getIngredients() {
    const Ingredients = [
      {
        id: '5e887ac47eed253091be10cb',
        avatar: '',
        unitOfMeasure: 'grams',
        hasAcceptedMarketing: true,
        isProspect: false,
        isReturning: true,
        name: 'Flour',
        reorderLevel: 2000,
        stockQuantity: 350,
        date: now.getTime(),
        updatedAt: subDays(subHours(now, 7), 1).getTime()
      },
      {
        id: '5e887ac47eed253091be10cb',
        avatar: '',
        unitOfMeasure: 'units',
        hasAcceptedMarketing: true,
        isProspect: false,
        isReturning: true,
        name: 'Eggs',
        reorderLevel: 20,
        stockQuantity: 26,
        date: now.getTime(),
        updatedAt: subDays(subHours(now, 7), 1).getTime()
      }
    ];

    return Promise.resolve(Ingredients);
  }

  
  getIngredientEmails() {
    const emails = [
      {
        id: '5ece2ce3613486d95ffaea58',
        createdAt: subDays(subHours(subMinutes(now, 34), 5), 3).getTime(),
        description: 'Order confirmation'
      },
      {
        id: '5ece2ce8cebf7ad1d100c0cd',
        createdAt: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
        description: 'Order confirmation'
      }
    ];

    return Promise.resolve(emails);
  }

  getIngredientLogs() {
    const logs = [
      {
        id: '5ece2cfeb6e2ac847bba11ce',
        createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
        description: 'Purchase',
        ip: '84.234.243.42',
        method: 'POST',
        route: '/api/purchase',
        status: 200
      },
      {
        id: '5ece2d02510484b2952e1e05',
        createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
        description: 'Purchase',
        ip: '84.234.243.42',
        method: 'POST',
        route: '/api/purchase',
        status: 522
      },
      {
        id: '5ece2d08e2748e4e9788901a',
        createdAt: subDays(subMinutes(subSeconds(now, 23), 8), 2).getTime(),
        description: 'Cart remove',
        ip: '84.234.243.42',
        method: 'DELETE',
        route: '/api/products/d65654e/remove',
        status: 200
      },
      {
        id: '5ece2d0c47214e342c2d7f28',
        createdAt: subDays(subMinutes(subSeconds(now, 54), 20), 2).getTime(),
        description: 'Cart add',
        ip: '84.234.243.42',
        method: 'GET',
        route: '/api/products/d65654e/add',
        status: 200
      },
      {
        id: '5ece2d11e4060a97b2b57623',
        createdAt: subDays(subMinutes(subSeconds(now, 16), 34), 2).getTime(),
        description: 'Cart add',
        ip: '84.234.243.42',
        method: 'GET',
        route: '/api/products/c85727f/add',
        status: 200
      },
      {
        id: '5ece2d16cf6d53d8e33656af',
        createdAt: subDays(subMinutes(subSeconds(now, 30), 54), 2).getTime(),
        description: 'View product',
        ip: '84.234.243.42',
        method: 'GET',
        route: '/api/products/c85727f',
        status: 200
      },
      {
        id: '5ece2d1b2ec5071be9286a96',
        createdAt: subDays(subMinutes(subSeconds(now, 40), 56), 2).getTime(),
        description: 'Get products',
        ip: '84.234.243.42',
        method: 'GET',
        route: '/api/products',
        status: 200
      },
      {
        id: '5ece2d22e68d5498917e47bc',
        createdAt: subDays(subMinutes(subSeconds(now, 5), 57), 2).getTime(),
        description: 'Login',
        ip: '84.234.243.42',
        method: 'POST',
        route: '/api/authentication/login',
        status: 200
      }
    ];

    return Promise.resolve(logs);
  }
}

export const ingredientApi = new IngredientApi();
