"use client"

import { useState } from "react"
import { AlertCircle, Save, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useFinanceData, type Category } from "@/components/layout/tools/dashboard/data-provider"
import { AddCategoryDialog } from "@/components/layout/tools/dashboard/add-category-dialog"
import { EditCategoryDialog } from "@/components/layout/tools/dashboard/edit-category-dialog"

export default function SettingsPage() {
  const { data, updateSettings, resetData } = useFinanceData()
  const [currency, setCurrency] = useState(data.settings.currency)
  const [theme, setTheme] = useState(data.settings.theme)
  const [startDayOfMonth, setStartDayOfMonth] = useState(data.settings.startDayOfMonth?.toString() || "1")
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const saveSettings = () => {
    updateSettings({
      currency,
      theme,
      startDayOfMonth: Number.parseInt(startDayOfMonth) || 1,
    })
  }

  const handleReset = () => {
    resetData()
    setShowResetConfirm(false)

    setCurrency("USD")
    setTheme("system")
    setStartDayOfMonth("1")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure your application preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                  <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                  <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDay">Start Day of Month</Label>
              <Input
                id="startDay"
                type="number"
                min="1"
                max="31"
                value={startDayOfMonth}
                onChange={(e) => setStartDayOfMonth(e.target.value || "1")}
              />
              <p className="text-sm text-muted-foreground">The day of the month when your budget period starts.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>
              <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage your transaction categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto max-h-[300px]">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Color</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.categories.map((category) => (
                      <tr key={category.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }} />
                        </td>
                        <td className="p-4 align-middle font-medium">{category.name}</td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingCategory(category)}>
                              <span className="sr-only">Edit</span>
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setShowAddCategory(true)}>Add Category</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your financial data</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Resetting your data will permanently delete all your transactions, budgets, and categories. This action
              cannot be undone.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Reset All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your financial data and reset the
                  application to its default state.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Yes, reset everything</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      <AddCategoryDialog open={showAddCategory} onOpenChange={setShowAddCategory} />

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
        />
      )}
    </div>
  )
}

// Add defaultData for the reset function
const defaultData = {
  settings: {
    currency: "USD",
    theme: "system",
    startDayOfMonth: 1,
  },
}
