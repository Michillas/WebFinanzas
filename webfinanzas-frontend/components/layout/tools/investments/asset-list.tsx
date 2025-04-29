"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para los activos
const assets = [
  {
    id: 1,
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 182.52,
    change24h: 1.23,
    marketCap: "2,85B",
    volume24h: "45,2B",
    type: "stocks",
  },
  {
    id: 2,
    name: "Microsoft Corporation",
    symbol: "MSFT",
    price: 415.56,
    change24h: -0.78,
    marketCap: "3,09B",
    volume24h: "32,1B",
    type: "stocks",
  },
  {
    id: 3,
    name: "SPDR S&P 500 ETF Trust",
    symbol: "SPY",
    price: 510.34,
    change24h: 0.45,
    marketCap: "472,8MM",
    volume24h: "78,5B",
    type: "etfs",
  },
  {
    id: 4,
    name: "Tesla, Inc.",
    symbol: "TSLA",
    price: 175.21,
    change24h: -2.34,
    marketCap: "558,2MM",
    volume24h: "28,7B",
    type: "stocks",
  },
  {
    id: 5,
    name: "Vanguard Total Stock Market ETF",
    symbol: "VTI",
    price: 252.87,
    change24h: 0.67,
    marketCap: "358,4MM",
    volume24h: "3,2B",
    type: "etfs",
  },
  {
    id: 6,
    name: "Amazon.com, Inc.",
    symbol: "AMZN",
    price: 178.75,
    change24h: 1.05,
    marketCap: "1,86B",
    volume24h: "25,3B",
    type: "stocks",
  },
  {
    id: 7,
    name: "Invesco QQQ Trust",
    symbol: "QQQ",
    price: 430.12,
    change24h: 0.89,
    marketCap: "201,5MM",
    volume24h: "42,8B",
    type: "etfs",
  },
  {
    id: 8,
    name: "NVIDIA Corporation",
    symbol: "NVDA",
    price: 950.02,
    change24h: 3.21,
    marketCap: "2,34B",
    volume24h: "52,1B",
    type: "stocks",
  },
  {
    id: 9,
    name: "iShares Core S&P 500 ETF",
    symbol: "IVV",
    price: 515.67,
    change24h: 0.52,
    marketCap: "345,7MM",
    volume24h: "5,8B",
    type: "etfs",
  },
  {
    id: 10,
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    price: 165.98,
    change24h: -0.45,
    marketCap: "2,05B",
    volume24h: "18,9B",
    type: "stocks",
  },
]

type SortField = "name" | "price" | "change24h" | "marketCap" | "volume24h"
type SortDirection = "asc" | "desc" | null

interface AssetListProps {
  searchTerm: string
  activeTab: string
}

export function AssetList({ searchTerm, activeTab }: AssetListProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [mounted, setMounted] = useState(false)

  // Solucionar problema de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAssets = assets.filter((asset) => {
    // Filtrar por pestaña
    if (activeTab !== "all" && asset.type !== activeTab) {
      return false
    }

    // Filtrar por término de búsqueda
    if (
      searchTerm &&
      !asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const getSortedAssets = () => {
    if (!sortField || !sortDirection) return filteredAssets

    return [...filteredAssets].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    })
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    if (sortDirection === "asc") return <ArrowUp className="ml-2 h-4 w-4" />
    if (sortDirection === "desc") return <ArrowDown className="ml-2 h-4 w-4" />
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  const sortedAssets = getSortedAssets()

  // Formatear números con comas para decimales (formato español)
  const formatPrice = (price: number) => {
    return price.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="w-12">#</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center font-semibold">
                Nombre {getSortIcon("name")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("price")} className="flex items-center font-semibold">
                Precio {getSortIcon("price")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("change24h")}
                className="flex items-center font-semibold"
              >
                24h % {getSortIcon("change24h")}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("marketCap")}
                className="flex items-center font-semibold"
              >
                Cap. Mercado {getSortIcon("marketCap")}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("volume24h")}
                className="flex items-center font-semibold"
              >
                Volumen (24h) {getSortIcon("volume24h")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.length > 0 ? (
            sortedAssets.map((asset, index) => (
              <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={(e) => toggleFavorite(asset.id, e)} className="h-8 w-8">
                    <Star
                      className={`h-4 w-4 ${
                        favorites.includes(asset.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/tools/investments/asset/${asset.symbol}`} className="block w-full h-full">
                    {index + 1}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/tools/investments/asset/${asset.symbol}`} className="block w-full h-full">
                    <div className="flex flex-col">
                      <span className="font-medium">{asset.name}</span>
                      <span className="text-sm text-muted-foreground">{asset.symbol}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/tools/investments/asset/${asset.symbol}`} className="block w-full h-full">
                    ${formatPrice(asset.price)}
                  </Link>
                </TableCell>
                <TableCell
                  className={asset.change24h > 0 ? "text-green-600" : asset.change24h < 0 ? "text-red-600" : ""}
                >
                  <Link href={`/tools/investments/asset/${asset.symbol}`} className="block w-full h-full">
                    {asset.change24h > 0 ? "+" : ""}
                    {formatPrice(asset.change24h)}%
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link href={`/tools/investments/asset/${asset.symbol}`} className="block w-full h-full">
                    ${asset.marketCap}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link href={`/tools/investments/asset/${asset.symbol}`} className="block w-full h-full">
                    ${asset.volume24h}
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No se encontraron activos que coincidan con tus criterios
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
