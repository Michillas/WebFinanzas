"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User } from "lucide-react"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [country] = useState("Spain") // Hardcoded
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"error" | "success" | "">("")

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden")
      setMessageType("error")
      return
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, country }),
    })

    if (response.ok) {
      setMessage("Cuenta creada correctamente, ahora puedes iniciar sesión")
      setMessageType("success")
    } else {
      const data = await response.json()
      setMessage(`Error: ${data.message || "No se pudo registrar la cuenta"}`)
      setMessageType("error")
    }
  }

  return (
    <div className="flex mt-12 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Crear una cuenta</CardTitle>
          <CardDescription>Introduce tu información para crear tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de usuario</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <User className="h-4 w-4" />
              </div>
              <Input id="name" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Lock className="h-4 w-4" />
              </div>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="terms" className="text-sm font-medium">
              Estoy de acuerdo con los{" "}
              <a href="#" className="text-primary hover:underline">términos y condiciones</a>
            </label>
          </div>
          {message && (
          <p className={`text-sm mt-1 ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleRegister}>Registrarse</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
