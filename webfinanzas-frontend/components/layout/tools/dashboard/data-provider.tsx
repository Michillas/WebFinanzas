"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"

export type Transaction = {
  id: string
  date: string
  amount: number
  category: string
  description: string
  type: "income" | "expense"
}

export type Budget = {
  id: string
  category: string
  amount: number
  spent: number
  period: "monthly" | "weekly" | "yearly"
}

export type Category = {
  id: string
  name: string
  color: string
  icon?: string
}

export type Settings = {
  currency: string
  theme: "light" | "dark" | "system"
  startDayOfMonth: number
}

type FinanceData = {
  transactions: Transaction[]
  budgets: Budget[]
  categories: Category[]
  settings: Settings
}

const defaultData: FinanceData = {
  transactions: [
    {
      id: "tx001",
      date: "2025-05-01T09:15:23.000Z",
      amount: 2780.45,
      category: "Salario",
      description: "Salario mensual Mayo",
      type: "income",
    },
    {
      id: "tx002",
      date: "2025-05-03T15:42:17.000Z",
      amount: 950.00,
      category: "Alquiler",
      description: "Alquiler Mayo",
      type: "expense",
    },
    {
      id: "tx003",
      date: "2025-05-04T12:30:45.000Z",
      amount: 89.95,
      category: "Alimentos",
      description: "Mercadona",
      type: "expense",
    },
    {
      id: "tx004",
      date: "2025-05-05T19:24:10.000Z",
      amount: 42.50,
      category: "Restaurantes",
      description: "Cena con amigos - La Tapería",
      type: "expense",
    },
    {
      id: "tx005",
      date: "2025-05-06T08:17:22.000Z",
      amount: 35.00,
      category: "Transporte",
      description: "Gasolina",
      type: "expense",
    },
    {
      id: "tx006",
      date: "2025-05-07T14:32:05.000Z",
      amount: 14.99,
      category: "Subscripciones",
      description: "Netflix",
      type: "expense",
    },
    {
      id: "tx007",
      date: "2025-05-08T16:45:11.000Z",
      amount: 9.99,
      category: "Subscripciones",
      description: "Spotify",
      type: "expense",
    },
    {
      id: "tx008",
      date: "2025-05-09T11:26:47.000Z",
      amount: 67.85,
      category: "Alimentos",
      description: "Carrefour",
      type: "expense",
    },
    {
      id: "tx009",
      date: "2025-04-28T09:10:23.000Z",
      amount: 2780.45,
      category: "Salario",
      description: "Salario mensual Abril",
      type: "income",
    },
    {
      id: "tx010",
      date: "2025-04-29T13:42:50.000Z",
      amount: 82.30,
      category: "Compras",
      description: "Zara - ropa",
      type: "expense",
    },
    {
      id: "tx011",
      date: "2025-04-30T10:15:32.000Z",
      amount: 150.00,
      category: "Utiles",
      description: "Reparación ordenador",
      type: "expense",
    },
    {
      id: "tx012",
      date: "2025-04-15T18:23:41.000Z",
      amount: 320.00,
      category: "Salario",
      description: "Proyecto freelance",
      type: "income",
    },
    {
      id: "tx013",
      date: "2025-04-10T11:33:27.000Z",
      amount: 64.99,
      category: "Entretenimiento",
      description: "Entradas concierto",
      type: "expense",
    },
    {
      id: "tx014",
      date: "2025-04-05T08:45:12.000Z",
      amount: 24.50,
      category: "Restaurantes",
      description: "Almuerzo - El Tenedor",
      type: "expense",
    },
    {
      id: "tx015",
      date: "2025-04-02T17:22:38.000Z",
      amount: 950.00,
      category: "Alquiler",
      description: "Alquiler Abril",
      type: "expense",
    },
  ],
  budgets: [
    {
      id: "bdg01",
      category: "Alimentos",
      amount: 400,
      spent: 157.80,
      period: "monthly",
    },
    {
      id: "bdg02",
      category: "Entretenimiento",
      amount: 150,
      spent: 64.99,
      period: "monthly",
    },
    {
      id: "bdg03",
      category: "Transporte",
      amount: 120,
      spent: 35.00,
      period: "monthly",
    },
    {
      id: "bdg04",
      category: "Restaurantes",
      amount: 200,
      spent: 67.00,
      period: "monthly",
    },
    {
      id: "bdg05",
      category: "Subscripciones",
      amount: 50,
      spent: 24.98,
      period: "monthly",
    },
  ],
  categories: [
    { id: "cat01", name: "Salario", color: "#4CAF50" },
    { id: "cat02", name: "Alimentos", color: "#2196F3" },
    { id: "cat03", name: "Entretenimiento", color: "#9C27B0" },
    { id: "cat04", name: "Transporte", color: "#FF9800" },
    { id: "cat05", name: "Subscripciones", color: "#F44336" },
    { id: "cat06", name: "Restaurantes", color: "#795548" },
    { id: "cat07", name: "Compras", color: "#E91E63" },
    { id: "cat08", name: "Utiles", color: "#607D8B" },
    { id: "cat09", name: "Alquiler", color: "#009688" },
    { id: "cat10", name: "Salud", color: "#3F51B5" },
    { id: "cat11", name: "Educación", color: "#FFEB3B" },
    { id: "cat12", name: "Regalos", color: "#8BC34A" },
  ],
  settings: {
    currency: "EUR",
    theme: "system",
    startDayOfMonth: 1,
  },
}

const DataContext = createContext<DataContextType | undefined>(undefined)

type DataContextType = {
  data: FinanceData
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
  addBudget: (budget: Omit<Budget, "id">) => void
  updateBudget: (budget: Budget) => void
  deleteBudget: (id: string) => void
  addCategory: (category: Omit<Category, "id">) => void
  updateCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  updateSettings: (settings: Settings) => void
  resetData: () => void
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const dataRef = useRef<FinanceData>(defaultData)
  const [data, setData] = useState<FinanceData>(dataRef.current)
  const initialLoadDone = useRef(false)

  useEffect(() => {
    if (initialLoadDone.current) return

    try {
      const savedData = localStorage.getItem("financeData")
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        const validData = {
          ...defaultData,
          ...parsedData,
          settings: {
            ...defaultData.settings,
            ...(parsedData.settings || {}),
          },
        }
        dataRef.current = validData
        setData(validData)
      }
    } catch (error) {
      console.error("Failed to parse saved data:", error)
    }

    initialLoadDone.current = true
  }, [])

  useEffect(() => {
    if (!initialLoadDone.current) return

    if (data !== dataRef.current) {
      dataRef.current = data
      try {
        localStorage.setItem("financeData", JSON.stringify(data))
      } catch (error) {
        console.error("Failed to save data:", error)
      }
    }
  }, [data])

  const generateId = () => `${Date.now().toString(36)}${Math.random().toString(36).substring(2, 5)}`

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: generateId() }
    setData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction],
    }))
  }

  const updateTransaction = (transaction: Transaction) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) => (t.id === transaction.id ? transaction : t)),
    }))
  }

  const deleteTransaction = (id: string) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }))
  }

  const addBudget = (budget: Omit<Budget, "id">) => {
    const newBudget = { ...budget, id: generateId() }
    setData((prev) => ({
      ...prev,
      budgets: [...prev.budgets, newBudget],
    }))
  }

  const updateBudget = (budget: Budget) => {
    setData((prev) => ({
      ...prev,
      budgets: prev.budgets.map((b) => (b.id === budget.id ? budget : b)),
    }))
  }

  const deleteBudget = (id: string) => {
    setData((prev) => ({
      ...prev,
      budgets: prev.budgets.filter((b) => b.id !== id),
    }))
  }

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: generateId() }
    setData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }))
  }

  const updateCategory = (category: Category) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === category.id ? category : c)),
    }))
  }

  const deleteCategory = (id: string) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
    }))
  }

  const updateSettings = (settings: Settings) => {
    setData((prev) => ({
      ...prev,
      settings,
    }))
  }

  const resetData = () => {
    setData(defaultData)
  }

  const contextValue = {
    data,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addCategory,
    updateCategory,
    deleteCategory,
    updateSettings,
    resetData,
  }

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
}

export function useFinanceData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useFinanceData must be used within a DataProvider")
  }
  return context
}