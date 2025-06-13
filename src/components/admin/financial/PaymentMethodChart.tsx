
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { usePaymentData } from '@/hooks/usePaymentData';

export const PaymentMethodChart = () => {
  const { getSalesAnalytics } = usePaymentData();
  const analytics = getSalesAnalytics();

  const data = [
    {
      name: 'Espèces',
      value: analytics.totalCash,
      percentage: ((analytics.totalCash / analytics.totalSales) * 100).toFixed(1)
    },
    {
      name: 'Carte',
      value: analytics.totalCard,
      percentage: ((analytics.totalCard / analytics.totalSales) * 100).toFixed(1)
    }
  ];

  const COLORS = ['#8884d8', '#82ca9d'];

  const formatCurrency = (value: number) => `€${value.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des Paiements</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
