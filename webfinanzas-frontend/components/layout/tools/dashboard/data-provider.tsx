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

// Default data
const defaultData: FinanceData = {
  transactions: [
    {
      id: "1",
      date: new Date().toISOString(),
      amount: 2500,
      category: "Salary",
      description: "Monthly salary",
      type: "income",
    },
    {
      id: "2",
      date: new Date().toISOString(),
      amount: 45.99,
      category: "Groceries",
      description: "Weekly shopping",
      type: "expense",
    },
    {
      id: "3",
      date: new Date().toISOString(),
      amount: 9.99,
      category: "Subscriptions",
      description: "Netflix",
      type: "expense",
    },
  ],
  budgets: [
    {
      id: "1",
      category: "Groceries",
      amount: 400,
      spent: 45.99,
      period: "monthly",
    },
    {
      id: "2",
      category: "Entertainment",
      amount: 100,
      spent: 9.99,
      period: "monthly",
    },
    {
      id: "3",
      category: "Transportation",
      amount: 150,
      spent: 0,
      period: "monthly",
    },
  ],
  categories: [
    { id: "1", name: "Salary", color: "#4CAF50" },
    { id: "2", name: "Groceries", color: "#2196F3" },
    { id: "3", name: "Entertainment", color: "#9C27B0" },
    { id: "4", name: "Transportation", color: "#FF9800" },
    { id: "5", name: "Subscriptions", color: "#F44336" },
    { id: "6", name: "Dining Out", color: "#795548" },
    { id: "7", name: "Shopping", color: "#E91E63" },
    { id: "8", name: "Utilities", color: "#607D8B" },
  ],
  settings: {
    currency: "USD",
    theme: "system",
    startDayOfMonth: 1,
  },
}

// Create context
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

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  // Use a ref to store the data to avoid unnecessary re-renders
  const dataRef = useRef<FinanceData>(defaultData)
  const [data, setData] = useState<FinanceData>(dataRef.current)
  const initialLoadDone = useRef(false)

  // Load data from localStorage only once on mount
  useEffect(() => {
    if (initialLoadDone.current) return

    try {
      const savedData = localStorage.getItem("financeData")
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        // Ensure all required fields exist
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

  // Save data to localStorage when it changes, but not on initial render
  useEffect(() => {
    if (!initialLoadDone.current) return

    // Only save if data has actually changed from the ref
    if (data !== dataRef.current) {
      dataRef.current = data
      try {
        localStorage.setItem("financeData", JSON.stringify(data))
      } catch (error) {
        console.error("Failed to save data:", error)
      }
    }
  }, [data])

  // Helper function to generate a unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9)

  // CRUD operations for transactions
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

  // CRUD operations for budgets
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

  // CRUD operations for categories
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

  // Update settings
  const updateSettings = (settings: Settings) => {
    setData((prev) => ({
      ...prev,
      settings,
    }))
  }

  // Reset data to defaults
  const resetData = () => {
    setData(defaultData)
  }

  // Create a stable context value to prevent unnecessary re-renders
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

// Custom hook to use the data context
export function useFinanceData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useFinanceData must be used within a DataProvider")
  }
  return context
}
