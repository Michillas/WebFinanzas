"use client"

import { useState } from "react"
import { ArrowUpCircle, ArrowDownCircle, Plus, Search, Filter, Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFinanceData, type Transaction } from "@/components/layout/tools/dashboard/data-provider"
import { AddTransactionDialog } from "@/components/layout/tools/dashboard/add-transaction-dialog"
import { EditTransactionDialog } from "@/components/layout/tools/dashboard/edit-transaction-dialog"
import { formatCurrency } from "@/lib/utils"

export default function Transactions() {
  const { data, deleteTransaction } = useFinanceData()
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredTransactions = data.transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "all" || transaction.type === filterType

      const matchesCategory = filterCategory === "all" || transaction.category === filterCategory

      return matchesSearch && matchesType && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      } else if (sortBy === "category") {
        return sortOrder === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)
      }
      return 0
    })

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(data.transactions.map((t) => t.category)))]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Transacciones</h2>
        <Button onClick={() => setShowAddTransaction(true)}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Transacción
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
          <CardDescription>Gestiona y filtra tus transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar transacciones..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Tipos</SelectItem>
                    <SelectItem value="income">Ingreso</SelectItem>
                    <SelectItem value="expense">Gasto</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "Todas las Categorías" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("date")
                        setSortOrder("desc")
                      }}
                    >
                      Más Recientes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("date")
                        setSortOrder("asc")
                      }}
                    >
                      Más Antiguos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("amount")
                        setSortOrder("desc")
                      }}
                    >
                      Mayor Cantidad
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("amount")
                        setSortOrder("asc")
                      }}
                    >
                      Menor Cantidad
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("category")
                        setSortOrder("asc")
                      }}
                    >
                      Categoría (A-Z)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Fecha</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Descripción</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Categoría</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Cantidad</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div
                              className={`rounded-full p-1 inline-flex ${transaction.type === "income" ? "bg-emerald-100" : "bg-rose-100"}`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <ArrowDownCircle className="h-4 w-4 text-rose-500" />
                              )}
                            </div>
                          </td>
                          <td className="p-4 align-middle">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="p-4 align-middle font-medium">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.category}</td>
                          <td
                            className={`p-4 align-middle text-right font-medium ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}
                          >
                            {transaction.type === "income" ? "+" : "-"}
                            {formatCurrency(transaction.amount, data.settings.currency)}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setEditingTransaction(transaction)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteTransaction(transaction.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="h-24 text-center align-middle text-muted-foreground">
                          No se encontraron transacciones. Intenta ajustar los filtros o añade una nueva transacción.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredTransactions.length} de {data.transactions.length} transacciones
          </div>
          <Button onClick={() => setShowAddTransaction(true)}>
            <Plus className="mr-2 h-4 w-4" /> Añadir Transacción
          </Button>
        </CardFooter>
      </Card>

      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} />

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          open={!!editingTransaction}
          onOpenChange={(open) => !open && setEditingTransaction(null)}
        />
      )}
    </div>
  )
}
