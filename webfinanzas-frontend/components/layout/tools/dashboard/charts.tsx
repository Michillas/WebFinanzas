"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useFinanceData } from "@/components/layout/tools/dashboard/data-provider"
import { formatCurrency } from "@/lib/utils"

interface PieChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

export function PieChart({ data }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { data: financeData } = useFinanceData()
  const { theme } = useTheme()
  const [canvasKey, setCanvasKey] = useState(0)

  useEffect(() => {
    setCanvasKey((prev) => prev + 1)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)
    if (total === 0) return // Prevent division by zero

    // Draw pie chart
    let startAngle = 0
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Draw slices
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      // Draw label line and text
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      // Only draw label if slice is big enough
      if (sliceAngle > 0.2) {
        ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(item.name, labelX, labelY)
      }

      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = 10
    let legendY = canvas.height - data.length * 25 - 10

    data.forEach((item) => {
      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 15, 15)

      // Draw text
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(
        `${item.name}: ${formatCurrency(item.value, financeData.settings.currency)}`,
        legendX + 25,
        legendY + 7.5,
      )

      legendY += 25
    })
  }, [data, theme, financeData.settings.currency, canvasKey])

  return <canvas key={canvasKey} ref={canvasRef} width={500} height={300} className="w-full h-full" />
}

interface LineChartProps {
  data: Array<{
    date: string
    income: number
    expense: number
  }>
}

export function LineChart({ data }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [canvasKey, setCanvasKey] = useState(0)

  // Force a re-render of the canvas when theme changes
  useEffect(() => {
    setCanvasKey((prev) => prev + 1)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => Math.max(d.income, d.expense))) * 1.1 // Add 10% padding
    if (maxValue === 0) return // Prevent division by zero

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = theme === "dark" ? "#666666" : "#cccccc"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = theme === "dark" ? "#999999" : "#666666"
    ctx.font = "10px sans-serif"

    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      const value = maxValue - (maxValue / gridLines) * i

      ctx.beginPath()
      ctx.strokeStyle = theme === "dark" ? "#333333" : "#eeeeee"
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()

      ctx.fillText(value.toFixed(0), padding - 5, y)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    const step = Math.max(1, Math.floor(data.length / 5)) // Show at most 5 labels
    for (let i = 0; i < data.length; i += step) {
      const x = padding + (i / (data.length - 1)) * chartWidth
      ctx.fillText(data[i].date, x, canvas.height - padding + 5)
    }

    // Draw income line
    ctx.beginPath()
    ctx.strokeStyle = "#10b981" // emerald-500
    ctx.lineWidth = 2

    data.forEach((point, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = padding + chartHeight - (point.income / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw expense line
    ctx.beginPath()
    ctx.strokeStyle = "#ef4444" // rose-500
    ctx.lineWidth = 2

    data.forEach((point, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const y = padding + chartHeight - (point.expense / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw legend
    const legendX = padding
    const legendY = padding + 10

    // Income legend
    ctx.beginPath()
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.stroke()

    ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("Income", legendX + 25, legendY)

    // Expense legend
    ctx.beginPath()
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.moveTo(legendX + 100, legendY)
    ctx.lineTo(legendX + 120, legendY)
    ctx.stroke()

    ctx.fillText("Expense", legendX + 125, legendY)
  }, [data, theme, canvasKey])

  return <canvas key={canvasKey} ref={canvasRef} width={500} height={300} className="w-full h-full" />
}

interface BarChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
}

export function BarChart({ data }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [canvasKey, setCanvasKey] = useState(0)

  // Force a re-render of the canvas when theme changes
  useEffect(() => {
    setCanvasKey((prev) => prev + 1)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value)) * 1.1 // Add 10% padding
    if (maxValue === 0) return // Prevent division by zero

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = theme === "dark" ? "#666666" : "#cccccc"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.stroke()

    // Draw grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = theme === "dark" ? "#999999" : "#666666"
    ctx.font = "10px sans-serif"

    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      const value = maxValue - (maxValue / gridLines) * i

      ctx.beginPath()
      ctx.strokeStyle = theme === "dark" ? "#333333" : "#eeeeee"
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()

      ctx.fillText(value.toFixed(0), padding - 5, y)
    }

    // Draw bars
    const barWidth = (chartWidth / data.length) * 0.8
    const barSpacing = (chartWidth / data.length) * 0.2

    data.forEach((item, i) => {
      const x = padding + i * (barWidth + barSpacing) + barSpacing / 2
      const barHeight = (item.value / maxValue) * chartHeight
      const y = canvas.height - padding - barHeight

      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = theme === "dark" ? "#ffffff" : "#000000"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(item.label, x + barWidth / 2, canvas.height - padding + 5)
    })
  }, [data, theme, canvasKey])

  return <canvas key={canvasKey} ref={canvasRef} width={500} height={300} className="w-full h-full" />
}
