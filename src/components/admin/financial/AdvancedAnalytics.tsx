
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import { usePaymentData } from '@/hooks/usePaymentData';
import { CalendarDays, TrendingUp, Users, DollarSign } from 'lucide-react';

export const AdvancedAnalytics = () => {
  const { sales, getSalesAnalytics } = usePaymentData();
  const [timeFilter, setTimeFilter] = useState('month');
  const [storeFilter, setStoreFilter] = useState('all');

  // Analyse par période
  const getPeriodicData = () => {
    const now = new Date();
    const periodData: { [key: string]: { sales: number, count: number } } = {};

    sales.forEach(sale => {
      const saleDate = new Date(sale.timestamp);
      let key = '';

      switch (timeFilter) {
        case 'day':
          key = saleDate.toISOString().split('T')[0];
          break;
        case 'week':
          const weekStart = new Date(saleDate);
          weekStart.setDate(saleDate.getDate() - saleDate.getDay());
          key = `Semaine du ${weekStart.toLocaleDateString('fr-FR')}`;
          break;
        case 'month':
          key = `${saleDate.getFullYear()}-${String(saleDate.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'year':
          key = saleDate.getFullYear().toString();
          break;
      }

      if (!periodData[key]) {
        periodData[key] = { sales: 0, count: 0 };
      }
      periodData[key].sales += sale.total;
      periodData[key].count += 1;
    });

    return Object.entries(periodData).map(([period, data]) => ({
      period,
      sales: data.sales,
      count: data.count,
      average: data.sales / data.count
    })).sort((a, b) => a.period.localeCompare(b.period));
  };

  // Analyse par heure
  const getHourlyData = () => {
    const hourlyData: { [key: number]: { sales: number, count: number } } = {};

    for (let i = 0; i < 24; i++) {
      hourlyData[i] = { sales: 0, count: 0 };
    }

    sales.forEach(sale => {
      const hour = new Date(sale.timestamp).getHours();
      hourlyData[hour].sales += sale.total;
      hourlyData[hour].count += 1;
    });

    return Object.entries(hourlyData).map(([hour, data]) => ({
      hour: `${hour}h`,
      sales: data.sales,
      count: data.count
    }));
  };

  // Analyse par produit
  const getProductAnalysis = () => {
    const productData: { [key: string]: { quantity: number, revenue: number } } = {};

    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productData[item.name]) {
          productData[item.name] = { quantity: 0, revenue: 0 };
        }
        productData[item.name].quantity += item.quantity;
        productData[item.name].revenue += item.price * item.quantity;
      });
    });

    return Object.entries(productData)
      .map(([name, data]) => ({
        name,
        quantity: data.quantity,
        revenue: data.revenue
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
  };

  // Analyse par utilisateur
  const getUserAnalysis = () => {
    const userData: { [key: string]: { sales: number, count: number } } = {};

    sales.forEach(sale => {
      if (!userData[sale.userName]) {
        userData[sale.userName] = { sales: 0, count: 0 };
      }
      userData[sale.userName].sales += sale.total;
      userData[sale.userName].count += 1;
    });

    return Object.entries(userData)
      .map(([name, data]) => ({
        name,
        sales: data.sales,
        count: data.count,
        average: data.sales / data.count
      }))
      .sort((a, b) => b.sales - a.sales);
  };

  const periodicData = getPeriodicData();
  const hourlyData = getHourlyData();
  const productData = getProductAnalysis();
  const userData = getUserAnalysis();
  const analytics = getSalesAnalytics();

  const formatCurrency = (value: number) => `€${value.toFixed(2)}`;

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex gap-4">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Par jour</SelectItem>
            <SelectItem value="week">Par semaine</SelectItem>
            <SelectItem value="month">Par mois</SelectItem>
            <SelectItem value="year">Par année</SelectItem>
          </SelectContent>
        </Select>

        <Select value={storeFilter} onValueChange={setStoreFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les magasins</SelectItem>
            <SelectItem value="store_001">Magasin Principal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CA Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalSales)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.transactionCount}</div>
            <p className="text-xs text-muted-foreground">
              {userData.length} vendeurs actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.averageTicket)}</div>
            <p className="text-xs text-muted-foreground">
              +5.2% vs période précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux Espèces</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((analytics.totalCash / analytics.totalSales) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              vs {((analytics.totalCard / analytics.totalSales) * 100).toFixed(1)}% carte
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des ventes */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Ventes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={periodicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => `€${value}`} />
                <Tooltip formatter={(value: number) => [formatCurrency(value), 'Ventes']} />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ventes par heure */}
        <Card>
          <CardHeader>
            <CardTitle>Ventes par Heure</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis tickFormatter={(value) => `€${value}`} />
                <Tooltip formatter={(value: number) => [formatCurrency(value), 'Ventes']} />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top produits */}
        <Card>
          <CardHeader>
            <CardTitle>Top Produits</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {productData.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance des vendeurs */}
        <Card>
          <CardHeader>
            <CardTitle>Performance des Vendeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.slice(0, 5).map((user, index) => (
                <div key={user.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(user.sales)}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.count} ventes • {formatCurrency(user.average)} moy.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
