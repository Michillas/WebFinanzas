"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

import { AssetList } from "@/components/layout/tools/investments/asset-list"
import { AssetTabs } from "@/components/layout/tools/investments/asset-tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InvestmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Monitor de Mercado</h1>
          <p className="text-muted-foreground">Sigue acciones, ETFs y otros activos en tiempo real</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <AssetTabs onTabChange={handleTabChange} />
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar activos..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <AssetList searchTerm={searchTerm} activeTab={activeTab} />

        <div className="flex justify-center">
          <Button variant="outline" className="mt-4">
            Cargar Más
          </Button>
        </div>
      </div>
    </main>
  )
}