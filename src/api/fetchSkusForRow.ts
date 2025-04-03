import { client } from './graphqlClient';
import { GET_SKUS_FOR_ROW } from './queries';

export const fetchSkusForRow = async (
  bodega: number, 
  cliente?: number, 
  filters: Record<string, any> = {}, 
  page: number = 0, 
  limit: number = 50
) => {
  try {
    const { data } = await client.query({
      query: GET_SKUS_FOR_ROW,
      variables: { bodega, cliente, filters, page, limit },
      fetchPolicy: 'network-only',
    });
    console.log("useSkusForRow => bodega:", bodega, "cliente:", cliente, "filters:", filters);

    return {
      items: data.getSkusForRow.items,
      total: data.getSkusForRow.total,
      hasMore: data.getSkusForRow.hasMore,
      page: data.getSkusForRow.page,
    };
  } catch (error) {
    console.error(`Error fetching SKUs for row: ${error}`);
    return { items: [], total: 0, hasMore: false, page: 0 };
  }
};
