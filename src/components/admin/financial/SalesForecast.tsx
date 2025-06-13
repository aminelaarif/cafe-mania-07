
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SalesForecast = () => {
  // Données de prévision simulées
  const forecastData = [
    { date: '2024-01-15', actual: 75.25, forecast: null },
    { date: '2024-01-16', actual: 520.80, forecast: null },
    { date: '2024-01-17', actual: 680.45, forecast: null },
    { date: '2024-01-18', actual: null, forecast: 720.30 },
    { date: '2024-01-19', actual: null, forecast: 850.60 },
    { date: '2024-01-20', actual: null, forecast: 920.15 },
    { date: '2024-01-21', actual: null, forecast: 650.80 }
  ];

  const formatCurrency = (value: number) => `€${value.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prévisions de Ventes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
            />
            <YAxis tickFormatter={(value) => `€${value}`} />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
              formatter={(value: number, name: string) => [
                formatCurrency(value), 
                name === 'actual' ? 'Réel' : 'Prévision'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#8884d8" 
              strokeWidth={3}
              name="actual"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#82ca9d" 
              strokeWidth={3}
              strokeDasharray="10 5"
              name="forecast"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
