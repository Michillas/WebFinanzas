import Link from "next/link"
import { ArrowRight, Clock, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FeaturedCourseProps {
  title: string
  description: string
  image: string
  modules: number
  duration: string
  level: string
  slug: string
}

export function FeaturedCourse({ title, description, image, modules, duration, level, slug }: FeaturedCourseProps) {
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
    <Card className="flex flex-col overflow-hidden border-2 border-green-600 h-full">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="aspect-video w-full object-cover"
        />
        <Badge className="absolute right-2 top-2 bg-green-600">Destacado</Badge>
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
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Comenzar a Aprender
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
