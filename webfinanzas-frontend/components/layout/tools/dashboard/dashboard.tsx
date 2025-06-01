"use client"

import { useState, useMemo } from "react"
import { ArrowUpCircle, ArrowDownCircle, Plus, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useFinanceData } from "@/components/layout/tools/dashboard/data-provider"
import { AddTransactionDialog } from "@/components/layout/tools/dashboard/add-transaction-dialog"
import { formatCurrency } from "@/lib/utils"
import { TabsTrigger } from "@radix-ui/react-tabs"

export default function Dashboard() {
  const { data } = useFinanceData()
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  const currentMonthTransactions = useMemo(() => {
    return data.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      const currentDate = new Date()
      return (
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }, [data.transactions])

  const totalIncome = useMemo(
    () => currentMonthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0),
    [currentMonthTransactions],
  )

  const totalExpenses = useMemo(
    () => currentMonthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0),
    [currentMonthTransactions],
  )

  const balance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses])

  const recentTransactions = useMemo(() => {
    return [...data.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
  }, [data.transactions])

  const budgetProgress = useMemo(() => {
    return data.budgets.map((budget) => {
      const percentage = (budget.spent / budget.amount) * 100
      return {
        ...budget,
        percentage: Math.min(percentage, 100),
      }
    })
  }, [data.budgets])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">FireBoard</h2>
        <Button onClick={() => setShowAddTransaction(true)}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Transacción
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance, data.settings.currency)}</div>
            <p className="text-xs text-muted-foreground">
              {balance >= 0 ? "Lo estas haciendo bien!" : "Estas gastando más de lo que ganas!"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recibido</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">
              {formatCurrency(totalIncome, data.settings.currency)}
            </div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">
              {formatCurrency(totalExpenses, data.settings.currency)}
            </div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
            <CardDescription>Tus ultimas 5 transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center">
                    <div
                      className={`rounded-full p-2 ${transaction.type === "income" ? "bg-emerald-100" : "bg-rose-100"} mr-4`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpCircle className={`h-4 w-4 text-emerald-500`} />
                      ) : (
                        <ArrowDownCircle className={`h-4 w-4 text-rose-500`} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`font-medium ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount, data.settings.currency)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No transactions yet</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setShowAddTransaction(true)}>
              <Plus className="mr-2 h-4 w-4" /> Agregar transacción
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Presupuestos</CardTitle>
            <CardDescription>Tu progreso en tus presupuestos mensuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetProgress.length > 0 ? (
                budgetProgress.map((budget) => (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{budget.category}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(budget.spent, data.settings.currency)} de{" "}
                          {formatCurrency(budget.amount, data.settings.currency)}
                        </p>
                      </div>
                      <p className="text-sm font-medium">{budget.percentage.toFixed(0)}%</p>
                    </div>
                    <Progress value={budget.percentage} className={budget.percentage > 90 ? "text-rose-500" : ""} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No budgets set</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <TabsTrigger value="budgets">
                <a>Editar presupuestos</a>
              </TabsTrigger>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} />
    </div>
  )
}
