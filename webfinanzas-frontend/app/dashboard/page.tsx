"use client"

import { useEffect, useState } from "react"
import { ArrowUpCircle, PieChart, Settings, Wallet } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeIcon } from "lucide-react"

import Dashboard from "@/components/layout/tools/dashboard/dashboard"
import Transactions from "@/components/layout/tools/dashboard/transactions"
import Budgets from "@/components/layout/tools/dashboard/budgets"
import Reports from "@/components/layout/tools/dashboard/reports"
import SettingsPage from "@/components/layout/tools/dashboard/settings"
import { DataProvider } from "@/components/layout/tools/dashboard/data-provider"

export default function Page() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])
  
    if (!mounted) {
      return null
    }
  
    return (
      <DataProvider>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 container py-6">
            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList className="grid md:grid-cols-5 grid-cols-1 w-full max-w-3xl mx-auto md:h-10 h-30">
                <TabsTrigger value="dashboard">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  <div>Inicio</div>
                </TabsTrigger>
                <TabsTrigger value="transactions">
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  <div>Transacciones</div>
                </TabsTrigger>
                <TabsTrigger value="budgets">
                  <Wallet className="h-4 w-4 mr-2" />
                  <div>Presupuestos</div>
                </TabsTrigger>
                <TabsTrigger value="reports">
                  <PieChart className="h-4 w-4 mr-2" />
                  <div>Graficos</div>
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  <div>Ajustes</div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard" className="space-y-4">
                <Dashboard />
              </TabsContent>
              <TabsContent value="transactions" className="space-y-4">
                <Transactions />
              </TabsContent>
              <TabsContent value="budgets" className="space-y-4">
                <Budgets />
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Reports />
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <SettingsPage />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </DataProvider>
    )  
}