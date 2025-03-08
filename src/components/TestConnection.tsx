import { gql, useQuery } from '@apollo/client';
import { React } from 'react';
const TEST_QUERY = gql`
    query TestQuery { 
        getReportEtmDashboard(
        limit: 10
        filters: {
          bodega: 361,
          ruta: 417,
          cliente: 4499
        }
    ) {
        UUID
        REGION
        ZONA
        LOCALIDAD
        BODEGA
        RUTA
        CLIENTE
        NOMBRE
        TIPO_RUTA
        CLASIFICACION
        FRECUENCIA
        CLAVE_LISTA
        ACTIVA
        TELEFONO
        DIRECCION 
  }
    }
`;


export const TestConnection = () => {
    const { loading, error, data } = useQuery(TEST_QUERY);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div>
        <h2>Connection Test</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };