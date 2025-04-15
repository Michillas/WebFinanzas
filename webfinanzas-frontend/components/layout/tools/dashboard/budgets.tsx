"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useFinanceData, type Budget } from "@/components/layout/tools/dashboard/data-provider"
import { AddBudgetDialog } from "@/components/layout/tools/dashboard/add-budget-dialog"
import { EditBudgetDialog } from "@/components/layout/tools/dashboard/edit-budget-dialog"
import { formatCurrency } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Budgets() {
  const { data, deleteBudget } = useFinanceData()
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)

  const budgetsWithProgress = data.budgets.map((budget) => {
    const percentage = (budget.spent / budget.amount) * 100
    return {
      ...budget,
      percentage: Math.min(percentage, 100),
      remaining: budget.amount - budget.spent,
    }
  })

  const sortedBudgets = [...budgetsWithProgress].sort((a, b) => b.percentage - a.percentage)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <Button onClick={() => setShowAddBudget(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Budget
        </Button>
      </div>

      {budgetsWithProgress.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No budgets set</AlertTitle>
          <AlertDescription>
            Create your first budget to start tracking your spending against your financial goals.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedBudgets.map((budget) => (
            <Card key={budget.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{budget.category}</CardTitle>
                    <CardDescription>{budget.period}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setEditingBudget(budget)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteBudget(budget.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {formatCurrency(budget.spent, data.settings.currency)} of{" "}
                      {formatCurrency(budget.amount, data.settings.currency)}
                    </span>
                    <span className={budget.percentage > 90 ? "text-rose-500 font-medium" : ""}>
                      {budget.percentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={budget.percentage}
                    className={
                      budget.percentage > 90 ? "text-rose-500" : budget.percentage > 75 ? "text-amber-500" : ""
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className={`text-sm ${budget.remaining < 0 ? "text-rose-500" : "text-muted-foreground"}`}>
                  {budget.remaining >= 0
                    ? `${formatCurrency(budget.remaining, data.settings.currency)} remaining`
                    : `${formatCurrency(Math.abs(budget.remaining), data.settings.currency)} over budget`}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AddBudgetDialog open={showAddBudget} onOpenChange={setShowAddBudget} />

      {editingBudget && (
        <EditBudgetDialog
          budget={editingBudget}
          open={!!editingBudget}
          onOpenChange={(open) => !open && setEditingBudget(null)}
        />
      )}
    </div>
  )
}
