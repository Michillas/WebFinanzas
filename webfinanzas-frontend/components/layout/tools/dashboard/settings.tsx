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
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>Configura tus preferencias de la aplicación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Selecciona una moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">Dólar Estadounidense ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">Libra Esterlina (£)</SelectItem>
                  <SelectItem value="JPY">Yen Japonés (¥)</SelectItem>
                  <SelectItem value="CAD">Dólar Canadiense (C$)</SelectItem>
                  <SelectItem value="AUD">Dólar Australiano (A$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select value={theme} onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDay">Día de Inicio del Mes</Label>
              <Input
                id="startDay"
                type="number"
                min="1"
                max="31"
                value={startDayOfMonth}
                onChange={(e) => setStartDayOfMonth(e.target.value || "1")}
              />
              <p className="text-sm text-muted-foreground">El día del mes en que comienza tu período presupuestario.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>
              <Save className="mr-2 h-4 w-4" /> Guardar Configuración
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
            <CardDescription>Gestiona tus categorías de transacciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto max-h-[300px]">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Color</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Nombre</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Acciones</th>
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
                              <span className="sr-only">Editar</span>
                              Editar
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
            <Button onClick={() => setShowAddCategory(true)}>Añadir Categoría</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Datos</CardTitle>
          <CardDescription>Gestiona tus datos financieros</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Advertencia</AlertTitle>
            <AlertDescription>
              Restablecer tus datos eliminará permanentemente todas tus transacciones, presupuestos y categorías. Esta
              acción no se puede deshacer.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Restablecer Todos los Datos
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará permanentemente todos tus datos financieros y
                  restablecerá la aplicación a su estado predeterminado.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Sí, restablecer todo</AlertDialogAction>
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
