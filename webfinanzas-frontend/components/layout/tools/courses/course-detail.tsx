"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  Download,
  FileText,
  Star,
  Users,
  Calendar,
  Award,
  MessageSquare,
  Linkedin,
  X,
  Globe,
  BarChart,
  BookMarked,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const coursesData = [
  {
    id: "1",
    title: "Curso de Presupuesto Personal",
    shortDescription: "Aprende a administrar tu dinero",
    category: "presupuesto",
    lessons: [{ id: "1", title: "Introducción" }],
    duration: 60,
    rating: 4.5,
  },
  {
    id: "2",
    title: "Curso de Ahorro Inteligente",
    shortDescription: "Maximiza tus ahorros",
    category: "ahorro",
    lessons: [{ id: "1", title: "Introducción" }],
    duration: 90,
    rating: 4.2,
  },
  {
    id: "3",
    title: "Curso de Inversión Inicial",
    shortDescription: "Invierte con poco capital",
    category: "inversion",
    lessons: [{ id: "1", title: "Introducción" }],
    duration: 120,
    rating: 4.8,
  },
]

interface Course {
  id: string
  title: string
  shortDescription: string
  description: string
  category: string
  categoryName: string
  difficulty: string
  lessons: { id: string; title: string; duration?: number; completed?: boolean; description?: string; hasQuiz?: boolean; content?: string; interactive?: string; calculatorType?: string }[]
  duration: number
  rating: number
  studentsCount: number
  lastUpdate: string
  instructor: {
    name: string
    avatar?: string
    role: string
    bio: string
    socialMedia: { linkedin?: string; twitter?: string; website?: string }
  }
  community: { membersCount: number; activeDiscussions: number }
  certification?: boolean
  resources: { type: string; title: string; description: string; downloadCount: number }[]
  successStories?: { name: string; avatar?: string; story: string }[]
  relatedCourses?: string[]
  tags?: string[]
}

export default function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("contenido")
  const [activeLesson, setActiveLesson] = useState<Course["lessons"][number] | null>(null)
  const [completedLessons, setCompletedLessons] = useState(
    course.lessons.filter((lesson) => lesson.completed).map((lesson) => lesson.id),
  )

  const handleLessonClick = (lesson: any) => {
    setActiveLesson(lesson)
  }

  const handleLessonComplete = (lessonId: any) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId))
    } else {
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

  const calculateProgress = () => {
    return Math.round((completedLessons.length / course.lessons.length) * 100)
  }

  const categoryColors = {
    presupuesto: "bg-blue-100 text-blue-800",
    ahorro: "bg-green-100 text-green-800",
    inversion: "bg-purple-100 text-purple-800",
  }

  const difficultyColors = {
    Principiante: "bg-emerald-100 text-emerald-800",
    Intermedio: "bg-amber-100 text-amber-800",
    Avanzado: "bg-rose-100 text-rose-800",
  }

  const resourceTypeIcons = {
    pdf: <FileText className="h-4 w-4" />,
    excel: <BarChart className="h-4 w-4" />,
    video: <BookMarked className="h-4 w-4" />,
  }

  const totalDuration = course.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0)

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 -ml-2"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a cursos
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${categoryColors[course.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}`}>
              {course.categoryName}
            </Badge>
            <Badge className={`${difficultyColors[course.difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"}`}>
              {course.difficulty}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">{course.title}</h1>
          <p className="text-muted-foreground mb-4">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{totalDuration} minutos</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.lessons.length} lecciones</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.studentsCount.toLocaleString()} estudiantes</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Actualizado: {course.lastUpdate}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-4">
            <span className="font-medium text-lg">{course.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({course.studentsCount} valoraciones)</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 mr-4">
              <Progress value={calculateProgress()} className="h-2 bg-emerald-100" />
              <p className="text-sm mt-1 text-muted-foreground">{calculateProgress()}% completado</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              {calculateProgress() === 100 ? "Curso Completado" : "Continuar Curso"}
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                  <AvatarFallback>
                    {course.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{course.instructor.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor.role}</p>
                  <div className="flex gap-2 mt-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={`https://linkedin.com/in/${course.instructor.socialMedia.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>LinkedIn</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={`https://x.com/${course.instructor.socialMedia.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600"
                          >
                            <X className="h-4 w-4" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Twitter</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={`https://${course.instructor.socialMedia.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-800"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Sitio Web</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <p className="text-sm mb-4">{course.instructor.bio}</p>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                  <Users className="h-5 w-5 mb-1 text-emerald-600" />
                  <span className="font-medium">{course.community.membersCount}</span>
                  <span className="text-xs text-muted-foreground">Estudiantes</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                  <MessageSquare className="h-5 w-5 mb-1 text-emerald-600" />
                  <span className="font-medium">{course.community.activeDiscussions}</span>
                  <span className="text-xs text-muted-foreground">Discusiones</span>
                </div>
              </div>

              {course.certification && (
                <div className="flex items-center gap-2 mt-4 p-2 bg-amber-50 text-amber-800 rounded-lg">
                  <Award className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Este curso incluye certificado de finalización</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="contenido" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="contenido" onClick={() => setActiveTab("contenido")}>
            Contenido
          </TabsTrigger>
          <TabsTrigger value="recursos" onClick={() => setActiveTab("recursos")}>
            Recursos
          </TabsTrigger>
          <TabsTrigger value="comunidad" onClick={() => setActiveTab("comunidad")}>
            Comunidad
          </TabsTrigger>
          <TabsTrigger value="relacionados" onClick={() => setActiveTab("relacionados")}>
            Relacionados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contenido" className="mt-0">
          {activeLesson ? (
            <Card>
              <CardContent className="pt-6">
                <Button
                  variant="ghost"
                  className="mb-4 -ml-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                  onClick={() => setActiveLesson(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al índice
                </Button>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-800">{activeLesson.title}</h2>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{activeLesson.duration} minutos</span>
                      {activeLesson.hasQuiz && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Incluye quiz
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={completedLessons.includes(activeLesson.id) ? "text-emerald-600" : ""}
                    onClick={() => handleLessonComplete(activeLesson.id)}
                  >
                    {completedLessons.includes(activeLesson.id) ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completado
                      </>
                    ) : (
                      <>
                        <Circle className="mr-2 h-4 w-4" />
                        Marcar como completado
                      </>
                    )}
                  </Button>
                </div>

                <div className="prose max-w-none">
                  <p>{activeLesson.content}</p>

                  {activeLesson.interactive && (
                    <div className="mt-6 p-4 border rounded-lg bg-emerald-50">
                      <h3 className="text-lg font-medium text-emerald-800 mb-2">Actividad Interactiva</h3>
                      <p>{activeLesson.interactive}</p>

                      {activeLesson.calculatorType && (
                        <div className="mt-4 p-4 bg-white rounded-lg border">
                          <h4 className="font-medium mb-2">Calculadora de {activeLesson.calculatorType}</h4>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="text-sm font-medium">Ingreso Mensual</label>
                              <input
                                type="number"
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Gastos Fijos</label>
                              <input
                                type="number"
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Calcular</Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-emerald-800">Contenido del curso</h2>
                <div className="text-sm text-muted-foreground">
                  {course.lessons.length} lecciones • {totalDuration} minutos en total
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-100 text-emerald-800 p-2 rounded-full">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Progreso del curso</h3>
                      <p className="text-sm text-muted-foreground">
                        Has completado {completedLessons.length} de {course.lessons.length} lecciones
                      </p>
                    </div>
                  </div>

                  <Progress value={calculateProgress()} className="h-2 bg-emerald-100 mb-2" />

                  <div className="flex justify-between text-sm">
                    <span>{calculateProgress()}% completado</span>
                    <span>
                      {completedLessons.length}/{course.lessons.length} lecciones
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full">
                {course.lessons.map((lesson: any, index: any) => (
                  <AccordionItem key={lesson.id} value={`lesson-${lesson.id}`}>
                    <AccordionTrigger className="hover:bg-emerald-50 px-4 rounded-lg">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">{lesson.title}</span>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{lesson.duration} min</span>
                            {lesson.hasQuiz && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Quiz
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="mb-3 text-muted-foreground">{lesson.description}</p>
                      <Button onClick={() => handleLessonClick(lesson)} className="bg-emerald-600 hover:bg-emerald-700">
                        <BookOpen className="mr-2 h-4 w-4" />
                        {completedLessons.includes(lesson.id) ? "Repasar Lección" : "Comenzar Lección"}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recursos" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-emerald-800 mb-4">Recursos Adicionales</h2>

              <div className="grid gap-4">
                {course.resources.map((resource: any, index: any) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-emerald-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                        {resourceTypeIcons[resource.type as keyof typeof resourceTypeIcons] || <FileText className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-emerald-800">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {resource.type?.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{resource.downloadCount} descargas</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-emerald-600">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comunidad" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-emerald-800">Comunidad del Curso</h2>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                  {course.community.membersCount} miembros
                </Badge>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Historias de Éxito</h3>
                <div className="grid gap-4">
                  {course.successStories?.map((story: any, index: any) => (
                    <div key={index} className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                          <AvatarFallback>
                            {story.name
                              .split(" ")
                              .map((n: any) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{story.name}</h4>
                          <p className="text-sm text-muted-foreground">{story.story}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Discusiones Activas</h3>
                <div className="p-4 border rounded-lg bg-muted/30 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">
                    Hay {course.community.activeDiscussions} discusiones activas en este curso
                  </p>
                  <Button variant="outline">Ver Discusiones</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relacionados" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-emerald-800 mb-4">Cursos Relacionados</h2>

              <div className="grid gap-4">
                {course.relatedCourses?.map((relatedId: any) => {
                  const relatedCourse = coursesData.find((c) => c.id === relatedId)
                  if (!relatedCourse) return null

                  return (
                    <div key={relatedId} className="p-4 border rounded-lg hover:bg-emerald-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${categoryColors[relatedCourse.category as keyof typeof categoryColors] || "bg-gray-100"}`}>
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{relatedCourse.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{relatedCourse.shortDescription}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{relatedCourse.lessons.length} lecciones</span>
                            <span className="mx-2">•</span>
                            <span>{relatedCourse.duration} min</span>
                            <div className="flex items-center ml-2">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{relatedCourse.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-emerald-600">
                          Ver Curso
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Etiquetas del Curso</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags?.map((tag: any, index: any) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
