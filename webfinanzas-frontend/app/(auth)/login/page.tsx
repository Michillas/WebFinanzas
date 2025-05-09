"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Github } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
        })

        if (response.ok) {
            const data = await response.json()
            alert("¡Inicio de sesión exitoso!")
            console.log("Token:", data.token) // Save or use the token as needed
        } else {
            const errorData = await response.json()
            alert(`Error: ${errorData.message || "No se pudo iniciar sesión"}`)
        }
    }

    return (
        <div className="flex mt-12 items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                    <CardDescription>Introduce tu correo electrónico y contraseña para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                <Mail className="h-4 w-4" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Contraseña</Label>
                            <a href="#" className="text-sm font-medium text-primary hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleLogin}>
                        Iniciar sesión
                    </Button>
                </CardFooter>
                <div className="px-8 pb-8 pt-4 text-center text-sm">
                    ¿Nuevo por aquí?{" "}
                    <a href="/register" className="font-medium text-primary hover:underline">
                        Crear una cuenta
                    </a>
                </div>
            </Card>
        </div>
    )
}