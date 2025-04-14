"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function CalculadoraInteresCompuesto() {
  const [capitalInicial, setCapitalInicial] = useState<number>(1000)
  const [tasa, setTasa] = useState<number>(5)
  const [plazo, setPlazo] = useState<number>(10)
  const [frecuenciaCapitalizacion, setFrecuenciaCapitalizacion] = useState<number>(1)
  const [aportacionMensual, setAportacionMensual] = useState<number>(0)
  const [montoFinal, setMontoFinal] = useState<number>(0)
  const [interesTotal, setInteresTotal] = useState<number>(0)
  const [datosGrafico, setDatosGrafico] = useState<any[]>([])

  const opcionesFrecuencia = [
    { value: 1, label: "Anual" },
    { value: 2, label: "Semestral" },
    { value: 4, label: "Trimestral" },
    { value: 12, label: "Mensual" },
    { value: 365, label: "Diario" },
  ]

  const calcularInteresCompuesto = () => {
    if (!capitalInicial || !tasa || !plazo || !frecuenciaCapitalizacion) return

    const tasaDecimal = tasa / 100
    const tasaPorPeriodo = tasaDecimal / frecuenciaCapitalizacion

    let valorFuturo = capitalInicial * Math.pow(1 + tasaPorPeriodo, frecuenciaCapitalizacion * plazo)

    if (aportacionMensual > 0) {
      const tasaMensual = tasaDecimal / 12
      const numPagos = plazo * 12
      const valorFuturoAportaciones = aportacionMensual * ((Math.pow(1 + tasaMensual, numPagos) - 1) / tasaMensual)
      valorFuturo += valorFuturoAportaciones
    }

    const aportacionesTotales = capitalInicial + aportacionMensual * plazo * 12
    const interes = valorFuturo - aportacionesTotales

    setMontoFinal(valorFuturo)
    setInteresTotal(interes)

    const datos = []
    for (let i = 0; i <= plazo; i++) {
      let montoAnual = capitalInicial * Math.pow(1 + tasaPorPeriodo, frecuenciaCapitalizacion * i)
      const aportacionesHastaLaFecha = aportacionMensual * i * 12

      if (aportacionMensual > 0 && i > 0) {
        const tasaMensual = tasaDecimal / 12
        const numPagos = i * 12
        const valorFuturoAportaciones = aportacionMensual * ((Math.pow(1 + tasaMensual, numPagos) - 1) / tasaMensual)
        montoAnual += valorFuturoAportaciones
      }

      const capitalTotalHastaLaFecha = capitalInicial + aportacionesHastaLaFecha
      const interesAnual = montoAnual - capitalTotalHastaLaFecha

      datos.push({
        año: i,
        monto: Number.parseFloat(montoAnual.toFixed(2)),
        capital: Number.parseFloat(capitalInicial.toFixed(2)),
        aportaciones: Number.parseFloat(aportacionesHastaLaFecha.toFixed(2)),
        interes: Number.parseFloat(interesAnual.toFixed(2)),
      })
    }
    setDatosGrafico(datos)
  }

  useEffect(() => {
    calcularInteresCompuesto()
  }, [capitalInicial, tasa, plazo, frecuenciaCapitalizacion, aportacionMensual])

  const formatoMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor)
  }

  const reiniciar = () => {
    setCapitalInicial(1000)
    setTasa(5)
    setPlazo(10)
    setFrecuenciaCapitalizacion(1)
    setAportacionMensual(0)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora</CardTitle>
          <CardDescription>Ingrese los detalles de su inversión para calcular el interés compuesto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="mb-6">
            <Label className="mb-2 block">Configuraciones predefinidas</Label>
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(1000)
                  setTasa(7)
                  setPlazo(10)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(0)
                }}
              >
                x2
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(1000)
                  setTasa(8)
                  setPlazo(15)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(0)
                }}
              >
                x3
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(1000)
                  setTasa(8)
                  setPlazo(21)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(0)
                }}
              >
                x5
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(1000)
                  setTasa(10)
                  setPlazo(25)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(0)
                }}
              >
                x10
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(1000)
                  setTasa(5)
                  setPlazo(10)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(100)
                }}
              >
                Ahorro Mensual
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(10000)
                  setTasa(4)
                  setPlazo(30)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(200)
                }}
              >
                Jubilación
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCapitalInicial(20000)
                  setTasa(3)
                  setPlazo(5)
                  setFrecuenciaCapitalizacion(12)
                  setAportacionMensual(0)
                }}
              >
                Conservador
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capitalInicial">Inversión Inicial</Label>
            <div className="flex items-center">
              <span className="mr-2">€</span>
              <Input
                id="capitalInicial"
                type="number"
                min="1"
                value={capitalInicial}
                onChange={(e) => setCapitalInicial(Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aportacionMensual">Aportación Mensual</Label>
            <div className="flex items-center">
              <span className="mr-2">€</span>
              <Input
                id="aportacionMensual"
                type="number"
                min="0"
                value={aportacionMensual}
                onChange={(e) => setAportacionMensual(Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="tasa">Tasa de Interés Anual (%)</Label>
              <span className="text-sm font-medium">{tasa}%</span>
            </div>
            <Slider id="tasa" min={0} max={30} step={0.1} value={[tasa]} onValueChange={(value) => setTasa(value[0])} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="plazo">Plazo (Años)</Label>
              <span className="text-sm font-medium">{plazo} años</span>
            </div>
            <Slider
              id="plazo"
              min={1}
              max={50}
              step={1}
              value={[plazo]}
              onValueChange={(value) => setPlazo(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frecuencia-capitalizacion">Frecuencia de Capitalización</Label>
            <Select
              value={frecuenciaCapitalizacion.toString()}
              onValueChange={(value) => setFrecuenciaCapitalizacion(Number.parseInt(value))}
            >
              <SelectTrigger id="frecuencia-capitalizacion">
                <SelectValue placeholder="Seleccionar frecuencia" />
              </SelectTrigger>
              <SelectContent>
                {opcionesFrecuencia.map((opcion) => (
                  <SelectItem key={opcion.value} value={opcion.value.toString()}>
                    {opcion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={reiniciar} variant="outline" className="w-full">
            Reiniciar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Vea cómo crece su inversión con el tiempo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Inversión Inicial</p>
              <p className="text-2xl font-bold">{formatoMoneda(capitalInicial)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Monto Final</p>
              <p className="text-2xl font-bold">{formatoMoneda(montoFinal)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Aportaciones Totales</p>
              <p className="text-2xl font-bold">{formatoMoneda(capitalInicial + aportacionMensual * plazo * 12)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Interés Total</p>
              <p className="text-2xl font-bold">{formatoMoneda(interesTotal)}</p>
            </div>
          </div>

          {montoFinal > 0 && capitalInicial > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">
                Con esta configuración, tu dinero se multiplicará por{" "}
                <span className="font-bold text-primary">{(montoFinal / capitalInicial).toFixed(2)}x</span> en {plazo}{" "}
                años.
              </p>
            </div>
          )}

          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={datosGrafico}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="año"
                  label={{
                    value: "Años",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />
                <YAxis tickFormatter={(value) => `${value}`} width={80} />
                <Tooltip
                  formatter={(value) => [typeof value === "number" ? formatoMoneda(value) : value, ""]}
                  contentStyle={{
                    backgroundColor: "#292524",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(label) => `Año ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="monto"
                  name="Monto Total"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="capital"
                  name="Capital Inicial"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                {aportacionMensual > 0 && (
                  <Line
                    type="monotone"
                    dataKey="aportaciones"
                    name="Aportaciones"
                    stroke="#ff7300"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
