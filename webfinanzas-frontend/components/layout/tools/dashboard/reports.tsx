"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFinanceData } from "@/components/layout/tools/dashboard/data-provider"
import { formatCurrency } from "@/lib/utils"
import {
  LineChart,
  BarChart,
  DonutChart,
} from "@/components/layout/tools/dashboard/charts"
import { TrendingUp, TrendingDown, ArrowRight, PiggyBank } from "lucide-react"

export default function Reports() {
  const { data } = useFinanceData()
  const [period, setPeriod] = useState<"week" | "month" | "year">("month")

  const filteredTransactions = useMemo(() => {
    const currentDate = new Date()

    return data.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)

      if (period === "week") {
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        return transactionDate >= startOfWeek
      } else if (period === "month") {
        return (
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        )
      } else if (period === "year") {
        return transactionDate.getFullYear() === currentDate.getFullYear()
      }

      return true
    })
  }, [data.transactions, period])

  const income = useMemo(
    () => filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions],
  )

  const expenses = useMemo(
    () => filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions],
  )

  const savingsPercentage = useMemo(() => {
    if (income === 0) return 0;
    return Math.round(((income - expenses) / income) * 100);
  }, [income, expenses]);

  const pieChartData = useMemo(() => {
    const expensesByCategory = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce(
        (acc, transaction) => {
          const { category, amount } = transaction
          if (!acc[category]) {
            acc[category] = 0
          }
          acc[category] += amount
          return acc
        },
        {} as Record<string, number>,
      )

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: data.categories.find((c) => c.name === category)?.color || "#000000",
    }))
  }, [filteredTransactions, data.categories])

  const lineChartData = useMemo(() => {
    const transactionsByDate = filteredTransactions.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString()
        if (!acc[date]) {
          acc[date] = { income: 0, expense: 0 }
        }
        if (transaction.type === "income") {
          acc[date].income += transaction.amount
        } else {
          acc[date].expense += transaction.amount
        }
        return acc
      },
      {} as Record<string, { income: number; expense: number }>,
    )

    return Object.entries(transactionsByDate)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, values]) => ({
        date,
        income: values.income,
        expense: values.expense,
      }))
  }, [filteredTransactions])

  const topExpensesData = useMemo(() => {
    const categoryTotals = pieChartData.sort((a, b) => b.value - a.value).slice(0, 5);
    return categoryTotals.map(item => ({
      label: item.name,
      value: item.value,
      color: item.color
    }));
  }, [pieChartData]);

  const periodDescriptions = {
    week: "Esta Semana",
    month: "Este Mes",
    year: "Este Año"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Informes</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as any)} className="w-full sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Esta Semana</TabsTrigger>
            <TabsTrigger value="month">Este Mes</TabsTrigger>
            <TabsTrigger value="year">Este Año</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" />
              Ingresos
            </CardTitle>
            <CardDescription>Total {periodDescriptions[period].toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{formatCurrency(income, data.settings.currency)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingDown className="w-4 h-4 mr-2 text-rose-500" />
              Gastos
            </CardTitle>
            <CardDescription>Total {periodDescriptions[period].toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">{formatCurrency(expenses, data.settings.currency)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Balance
            </CardTitle>
            <CardDescription>Ingresos menos gastos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${income - expenses >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              {formatCurrency(income - expenses, data.settings.currency)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <PiggyBank className="w-4 h-4 mr-2 text-blue-500" />
              Tasa de Ahorro
            </CardTitle>
            <CardDescription>Porcentaje de ingresos ahorrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${savingsPercentage >= 0 ? "text-blue-500" : "text-rose-500"}`}>
              {savingsPercentage}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader className="space-y-0 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Gastos por Categoría</CardTitle>
            </div>
            <CardDescription>Cómo se distribuyen tus gastos</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <DonutChart
              data={pieChartData}
              title=""
              description=""
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="space-y-0 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Ingresos vs Gastos</CardTitle>
            </div>
            <CardDescription>Comparación a lo largo del tiempo</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <LineChart data={lineChartData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Principales Categorías de Gastos</CardTitle>
          <CardDescription>Top 5 categorías con mayor gasto {periodDescriptions[period].toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          {topExpensesData.length > 0 ? (
            <div className="h-[300px]">
              <BarChart data={topExpensesData} />
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              No hay datos de gastos disponibles para este período
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}