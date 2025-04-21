import Link from "next/link"
import { ArrowRight, Clock, Layers, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CourseCardProps {
  title: string
  description: string
  image: string
  modules: number
  duration: string
  level: string
  slug: string
  isNew?: boolean
  trending?: boolean
}

export function CourseCard({
  title,
  description,
  image,
  modules,
  duration,
  level,
  slug,
  isNew,
  trending,
}: CourseCardProps) {
  // Translate level to Spanish for display
  const getLevelInSpanish = (level: string) => {
    switch (level) {
      case "Beginner":
        return "Principiante"
      case "Intermediate":
        return "Intermedio"
      case "Advanced":
        return "Avanzado"
      case "All Levels":
        return "Todos los niveles"
      default:
        return level
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="aspect-video w-full object-cover"
        />
        {isNew && <Badge className="absolute right-2 top-2 bg-blue-600">Nuevo</Badge>}
        {trending && (
          <Badge className="absolute right-2 top-2 bg-orange-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Tendencia
          </Badge>
        )}
      </div>
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span>{modules} Módulos</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <Badge variant="outline">{getLevelInSpanish(level)}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/tools/courses/${slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Ver Curso
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
