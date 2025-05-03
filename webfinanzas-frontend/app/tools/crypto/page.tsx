"use client"

import { useState, useEffect } from "react"
import { Search, ArrowUpDown, TrendingUp, TrendingDown, Moon, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

export default function CryptoPage() {
  const [cryptoData, setCryptoData] = useState<Array<{ 
    id: string; 
    name: string; 
    symbol: string; 
    market_cap_rank: number; 
    current_price: number; 
    price_change_percentage_24h: number; 
    market_cap: number; 
    total_volume: number; 
    sparkline_in_7d?: { price: number[] }; 
    image?: string; 
  }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof cryptoData[number], direction: "ascending" | "descending" }>({ key: "market_cap_rank", direction: "ascending" })
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h",
        )

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        setCryptoData(data)
      } catch (error) {
        console.error("Error fetching crypto data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCryptoData()

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const handleSort = (key: any) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...cryptoData].sort((a, b) => {
    if (a[sortConfig.key] === null) return 1
    if (b[sortConfig.key] === null) return -1

    if (sortConfig.key === "price_change_percentage_24h") {
      return sortConfig.direction === "ascending"
        ? (a[sortConfig.key] as number || 0) - (b[sortConfig.key] as number || 0)
        : ((b[sortConfig.key] as number | undefined) ?? 0) - ((a[sortConfig.key] as number | undefined) ?? 0)
    }

    if (typeof a[sortConfig.key] === "string") {
      return sortConfig.direction === "ascending"
        ? (a[sortConfig.key] as string).localeCompare(b[sortConfig.key] as string)
        : (b[sortConfig.key] as string).localeCompare(a[sortConfig.key] as string)
    }

    return sortConfig.direction === "ascending"
      ? (typeof a[sortConfig.key] === "number" && typeof b[sortConfig.key] === "number"
          ? (Number(a[sortConfig.key] ?? 0) - Number(b[sortConfig.key] ?? 0))
          : 0)
      : (Number(b[sortConfig.key] ?? 0) - Number(a[sortConfig.key] ?? 0))
  })

  const filteredData = sortedData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatPrice = (price: any) => {
    if (price >= 1) {
      return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }

  const formatMarketCap = (marketCap: any) => {
    if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`
    } else if (marketCap >= 1_000_000) {
      return `$${(marketCap / 1_000_000).toFixed(2)}M`
    } else {
      return `$${marketCap.toLocaleString()}`
    }
  }

  const formatPercentage = (percentage: any) => {
    return percentage ? percentage.toFixed(2) + "%" : "N/A"
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mercado de Criptomonedas</h1>
          <p className="text-muted-foreground mt-1">Top 50 criptomonedas por capitalización de mercado</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar criptomoneda..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todas las Criptomonedas</TabsTrigger>
          <TabsTrigger value="gainers">Mayores Ganadoras</TabsTrigger>
          <TabsTrigger value="losers">Mayores Perdedoras</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-sm">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 font-medium"
                      onClick={() => handleSort("market_cap_rank")}
                    >
                      #
                      <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium text-sm">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 font-medium"
                      onClick={() => handleSort("name")}
                    >
                      Nombre
                      <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                    </Button>
                  </th>
                  <th className="text-right p-4 font-medium text-sm">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 font-medium"
                      onClick={() => handleSort("current_price")}
                    >
                      Precio
                      <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                    </Button>
                  </th>
                  <th className="text-right p-4 font-medium text-sm">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 font-medium"
                      onClick={() => handleSort("price_change_percentage_24h")}
                    >
                      24h %
                      <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                    </Button>
                  </th>
                  <th className="text-right p-4 font-medium text-sm hidden md:table-cell">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 font-medium"
                      onClick={() => handleSort("market_cap")}
                    >
                      Capitalización de Mercado
                      <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                    </Button>
                  </th>
                  <th className="text-right p-4 font-medium text-sm hidden lg:table-cell">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 font-medium"
                      onClick={() => handleSort("total_volume")}
                    >
                      Volumen (24h)
                      <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                    </Button>
                  </th>
                  <th className="text-right p-4 font-medium text-sm hidden xl:table-cell">Últimos 7 Días</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="border-b">
                        {Array(7)
                          .fill(0)
                          .map((_, cellIndex) => (
                            <td key={cellIndex} className="p-4">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </td>
                          ))}
                      </tr>
                    ))
                ) : filteredData.length > 0 ? (
                  filteredData.map((crypto) => (
                    <tr key={crypto.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4 text-sm">{crypto.market_cap_rank}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={crypto.image || "/placeholder.svg"}
                            alt={crypto.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-xs text-muted-foreground uppercase">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">{formatPrice(crypto.current_price)}</td>
                      <td className="p-4 text-right">
                        <span
                          className={
                            crypto.price_change_percentage_24h > 0
                              ? "text-green-500 flex items-center justify-end"
                              : "text-red-500 flex items-center justify-end"
                          }
                        >
                          {crypto.price_change_percentage_24h > 0 ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          )}
                          {formatPercentage(crypto.price_change_percentage_24h)}
                        </span>
                      </td>
                      <td className="p-4 text-right hidden md:table-cell">{formatMarketCap(crypto.market_cap)}</td>
                      <td className="p-4 text-right hidden lg:table-cell">{formatMarketCap(crypto.total_volume)}</td>
                      <td className="p-4 text-right hidden xl:table-cell">
                        <MiniChart
                          data={crypto.sparkline_in_7d?.price || []}
                          isPositive={crypto.price_change_percentage_24h > 0}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center">
                      No se encontraron criptomonedas que coincidan con tu búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Datos proporcionados por la API de CoinGecko • Actualizado cada minuto
      </div>
    </div>
  )
}

function MiniChart({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  if (!data || data.length === 0) {
    return <div className="h-10 w-full flex items-center justify-center">Sin datos</div>
  }

  // Normalize data for the mini chart
  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue

  // Create points for SVG polyline
  const points = data
    .map((price: any, index: any) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((price - minValue) / range) * 100
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="h-10 w-24 ml-auto">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={isPositive ? "#10b981" : "#ef4444"} strokeWidth="2" />
      </svg>
    </div>
  )
}
