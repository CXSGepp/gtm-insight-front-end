import React, { useEffect } from "react";
import { gql, useQuery, ApolloError } from "@apollo/client";
import { useDashboardStore } from "../store/DashboardStore";

// Update GraphQL query to match backend schema
export const DASHBOARD_QUERY = gql`
  query GetDashboardData($cursor: String, $limit: Int, $filters: EtmDashboardFilterInput) {
    getReportEtmDashboard(cursor: $cursor, limit: $limit, filters: $filters) {
      items {
        id
        region
        zona
        localidad
        bodega
        ruta
        cliente
        nombre
        tipoRuta
        clasificacion
        frecuencia
        claveLista
        activa
        telefono
        direccion
        LAST_UPDATED: lastUpdated
      }
      hasMore
      total
      nextCursor
    }
  }
`;

// Update interface to match GraphQL schema
interface DashboardItem {
  id: number;
  region: string;
  zona: string;
  localidad: string;
  bodega: number;
  ruta: string;
  cliente: number;
  nombre: string;
  tipoRuta: string;
  clasificacion: string;
  frecuencia: string;
  claveLista: number;
  activa: string;
  telefono: string;
  direccion: string;
  lastUpdated: string;
}

interface DashboardQueryResult {
  getReportEtmDashboard: {
    items: DashboardItem[];
    hasMore: boolean;
    total: number;
    nextCursor: string;
  };
}

export const useDashboardData = () => {
  const { filters, pageSize } = useDashboardStore();
  const [currentCursor, setCurrentCursor] = React.useState<string | null>(null);
  const [fetchError, setFetchError] = React.useState<ApolloError | null>(null);

  const processedFilters = React.useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return null;
    }

    try {
      const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value === undefined || value === "") {
          return acc;
        }

        // Convert to camelCase for GraphQL
        const camelKey = key.toLowerCase().replace(/_([a-z])/g, g => g[1].toUpperCase());
        
        // Handle numeric fields
        if (["cliente", "bodega", "claveLista"].includes(camelKey)) {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            acc[camelKey] = numValue;
          }
        } else {
          acc[camelKey] = value;
        }

        return acc;
      }, {} as Record<string, string | number>);

      console.group('🔍 Filter Processing');
      console.log('Raw filters:', filters);
      console.log('Processed filters:', cleanedFilters);
      console.groupEnd();

      return Object.keys(cleanedFilters).length > 0 ? cleanedFilters : null;

    } catch (error) {
      console.error('Filter processing error:', error);
      return null;
    }
  }, [filters]);

  const { data, loading, error, fetchMore, refetch } = useQuery<DashboardQueryResult>(
    DASHBOARD_QUERY,
    {
      variables: {
        cursor: currentCursor,
        limit: Math.max(1, Math.min(pageSize, 1000)), // Ensure valid limit
        filters: processedFilters,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        console.error("GraphQL Error:", {
          message: error.message,
          graphQLErrors: error.graphQLErrors,
          networkError: error.networkError,
        });
        setFetchError(error);
      }
    }
  );

  // Error recovery
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        console.log('🔄 Attempting to recover from error...');
        refetch().catch(console.error);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error, refetch]);

  // Status monitoring
  useEffect(() => {
    console.group('📊 Query Status');
    console.log('Variables:', {
      cursor: currentCursor,
      limit: pageSize,
      filters: processedFilters,
    });
    console.log('Loading:', loading);
    console.log('Error:', error || fetchError);
    console.log('Data:', data?.getReportEtmDashboard?.items?.length || 0, 'items');
    console.groupEnd();
  }, [currentCursor, pageSize, processedFilters, loading, error, fetchError, data]);

  return {
    data: data?.getReportEtmDashboard?.items || [],
    loading,
    error: fetchError || error,
    loadMore: async () => {
      if (!data?.getReportEtmDashboard?.nextCursor) return;
      
      try {
        await fetchMore({
          variables: {
            cursor: data.getReportEtmDashboard.nextCursor,
            limit: pageSize,
            filters: processedFilters,
          },
        });
      } catch (err) {
        setFetchError(err as ApolloError);
      }
    },
    total: data?.getReportEtmDashboard?.total || 0,
    hasMore: !!data?.getReportEtmDashboard?.hasMore,
  };
};