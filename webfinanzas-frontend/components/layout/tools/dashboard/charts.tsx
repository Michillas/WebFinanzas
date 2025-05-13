"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useFinanceData } from "@/components/layout/tools/dashboard/data-provider"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  PieChart as ReChartsPie, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  LineChart as ReChartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as ReChartsBar,
  Bar,
  Area
} from "recharts"

export function PieChart({ data }: any) {
  const { data: financeData } = useFinanceData()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const formatValue = (value: any) => formatCurrency(value, financeData.settings.currency)
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill={textColor} textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {data[index].name}
      </text>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Expense Distribution</CardTitle>
        <CardDescription>Breakdown of your expenses by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsPie data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatValue(value)}
                contentStyle={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
              />
              <Legend formatter={(value, entry) => `${value}: ${formatValue(entry.payload?.value ?? 0)}`} />
            </ReChartsPie>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function LineChart({ data }: any) {
  const { theme } = useTheme()
  const { data: financeData } = useFinanceData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatValue = (value: any) => formatCurrency(value, financeData.settings.currency)
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const gridColor = theme === "dark" ? "#333333" : "#e5e7eb"

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsLine
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="date" 
                stroke={textColor}
                tick={{ fill: textColor, fontSize: 12 }}
              />
              <YAxis 
                stroke={textColor}
                tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                formatter={(value) => formatValue(value)}
                contentStyle={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                name="Ingreso"
                stroke="#10b981" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                name="Gasto"
                stroke="#ef4444" 
                strokeWidth={2}
              />
            </ReChartsLine>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function BarChart({ data }: any) {
  const { theme } = useTheme()
  const { data: financeData } = useFinanceData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatValue = (value: any) => formatCurrency(value, financeData.settings.currency)
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const gridColor = theme === "dark" ? "#333333" : "#e5e7eb"

  const processedData = data.map((item: { label: any; value: any; color: any }) => ({
    name: item.label,
    value: item.value,
    fill: item.color
  }));

  return (
    <Card className="w-full">
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsBar
              data={processedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                scale="point" 
                padding={{ left: 10, right: 10 }}
                stroke={textColor}
                tick={{ fill: textColor, fontSize: 12 }}
              />
              <YAxis 
                stroke={textColor}
                tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                formatter={(value) => formatValue(value)}
                contentStyle={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {processedData.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </ReChartsBar>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface DonutChartData {
  value: number;
  color: string;
}

export function DonutChart({ data, title = "Donut Chart", description = "Data visualization" }: { data: DonutChartData[]; title?: string; description?: string }) {
  const { theme } = useTheme()
  const { data: financeData } = useFinanceData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatValue = (value: any) => formatCurrency(value, financeData.settings.currency)
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsPie data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatValue(value)}
                contentStyle={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
              />
              <Legend formatter={(value, entry) => `${value}: ${formatValue(entry.payload?.value ?? 0)}`} />
            </ReChartsPie>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function AreaChart({ data, title = "Area Chart", description = "Data visualization" }: { data: { date: string; income: number; expense: number }[]; title?: string; description?: string }) {
  const { theme } = useTheme()
  const { data: financeData } = useFinanceData()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const formatValue = (value: any) => formatCurrency(value, financeData.settings.currency)
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const gridColor = theme === "dark" ? "#333333" : "#e5e7eb"
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsLine
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="date" 
                stroke={textColor}
                tick={{ fill: textColor, fontSize: 12 }}
              />
              <YAxis 
                stroke={textColor}
                tick={{ fill: textColor, fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                formatter={(value) => formatValue(value)}
                contentStyle={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
              />
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                name="Ingreso"
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                name="Gasto"
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorExpense)" 
              />
            </ReChartsLine>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}