"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock } from "lucide-react"

interface Course {
  title: string;
  category: string;
  categoryName: string;
  shortDescription: string;
  lessons: { id: string; title: string }[];
  duration: number;
  progress?: number;
}

export default function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  const categoryColors: Record<string, string> = {
    presupuesto: "bg-blue-100 text-blue-800",
    ahorro: "bg-green-100 text-green-800",
    inversion: "bg-purple-100 text-purple-800",
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer" onClick={onClick}>
      <div className="h-40 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <img
            src={`/placeholder.svg?height=160&width=384&text=${course.title}`}
            alt={course.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute top-4 left-4">
            <Badge className={`${categoryColors[course.category] || "bg-gray-100 text-gray-800"}`}>
              {course.categoryName}
            </Badge>
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-gray-100">{course.title}</CardTitle>
        <CardDescription>{course.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{course.lessons.length} lecciones</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration} min</span>
          </div>
        </div>
        <Progress value={course.progress || 0} className="h-2 bg-emerald-100" />
        <p className="text-xs text-right mt-1 text-muted-foreground">{course.progress || 0}% completado</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-lime-400">
          {(course.progress ?? 0) > 0 ? "Continuar Curso" : "Comenzar Curso"}
        </Button>
      </CardFooter>
    </Card>
  )
}
