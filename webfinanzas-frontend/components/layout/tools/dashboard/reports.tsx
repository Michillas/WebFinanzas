"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFinanceData } from "@/components/layout/tools/dashboard/data-provider"
import { formatCurrency } from "@/lib/utils"
import { PieChart, LineChart } from "@/components/layout/tools/dashboard/charts"

export default function Reports() {
  const { data } = useFinanceData()
  const [period, setPeriod] = useState<"week" | "month" | "year">("month")

  // Memoize filtered transactions to prevent unnecessary recalculations
  const filteredTransactions = useMemo(() => {
    // Get current date
    const currentDate = new Date()

    return data.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)

      if (period === "week") {
        // Get start of current week (Sunday)
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        return transactionDate >= startOfWeek
      } else if (period === "month") {
        // Check if transaction is in current month
        return (
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        )
      } else if (period === "year") {
        // Check if transaction is in current year
        return transactionDate.getFullYear() === currentDate.getFullYear()
      }

      return true
    })
  }, [data.transactions, period])

  // Memoize income and expenses calculations
  const income = useMemo(
    () => filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions],
  )

  const expenses = useMemo(
    () => filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions],
  )

  // Memoize chart data calculations
  const pieChartData = useMemo(() => {
    // Group expenses by category for pie chart
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

    // Prepare data for pie chart
    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category,
      value: amount,
      color: data.categories.find((c) => c.name === category)?.color || "#000000",
    }))
  }, [filteredTransactions, data.categories])

  // Memoize line chart data
  const lineChartData = useMemo(() => {
    // Group transactions by date for line chart
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

    // Prepare data for line chart
    return Object.entries(transactionsByDate)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, values]) => ({
        date,
        income: values.income,
        expense: values.expense,
      }))
  }, [filteredTransactions])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as any)} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Income</CardTitle>
            <CardDescription>Total income for the period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{formatCurrency(income, data.settings.currency)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expenses</CardTitle>
            <CardDescription>Total expenses for the period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">{formatCurrency(expenses, data.settings.currency)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Savings</CardTitle>
            <CardDescription>Income minus expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${income - expenses >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              {formatCurrency(income - expenses, data.settings.currency)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>How your expenses are distributed</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {pieChartData.length > 0 ? (
              <PieChart data={pieChartData} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No expense data available for this period
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Comparison over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {lineChartData.length > 0 ? (
              <LineChart data={lineChartData} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No transaction data available for this period
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
