"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AssetTabs({ onTabChange }: { onTabChange: (value: string) => void }) {
  return (
    <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3 md:w-auto">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="stocks">Acciones</TabsTrigger>
        <TabsTrigger value="etfs">ETFs</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
