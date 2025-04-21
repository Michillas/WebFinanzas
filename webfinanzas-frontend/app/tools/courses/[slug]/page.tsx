import Link from "next/link"
import { ArrowLeft, BookOpen, CheckCircle, Clock, Layers, Play, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { coursesData } from "@/data/courses"

type Module = {
  id: number
  title: string
  lessons: number
  duration: string
  completed: boolean
}

type Course = {
  slug: string
  title: string
  longDescription: string
  modules: number
  duration: string
  level: string
  rating: number
  students: number
  image?: string
  modulesList?: Module[]
}

const getCourseData = (slug: string): Course => {
  return coursesData.find((course) => course.slug === slug) || coursesData[0]
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseData(params.slug)
  const progress = 25

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <Link
              href="/tools/courses"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver a Cursos
            </Link>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
                <p className="text-muted-foreground mb-4">{course.longDescription}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.modules} Módulos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{course.rating} Valoración</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.students} Estudiantes</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Instructor"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Planificadora Financiera Certificada</p>
                  </div>
                </div>
                      {course.modulesList?.reduce((acc, module: Module) => acc + module.lessons, 0) || 0} lecciones •{" "}
                  <h3 className="font-semibold">Tu Progreso</h3>
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-sm text-muted-foreground">{progress}% Completado</p>
                  <div className="flex gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">Continuar Aprendiendo</Button>
                    <Button variant="outline">Añadir a Favoritos</Button>
                  </div>
              </div>
              <div>
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full rounded-lg object-cover mb-6"
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Contenido del Curso</CardTitle>
                    <CardDescription>
                      {course.modules} módulos •{" "}
                      {course.modulesList?.reduce((acc, module) => acc + module.lessons, 0) || 0} lecciones •{" "}
                      {course.duration} en total
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      {course.modulesList?.map((module) => (
                        <div key={module.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {module.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                              )}
                              <h4 className="font-medium">
                                Módulo {module.id}: {module.title}
                              </h4>
                            </div>
                            <Badge variant="outline">{module.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground pl-7">{module.lessons} lecciones</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Play className="mr-2 h-4 w-4" />
                      Comenzar a Aprender
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-12">
            <TabsList className="w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="overview">Descripción</TabsTrigger>
              <TabsTrigger value="curriculum">Currículo</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Acerca de Este Curso</h3>
                  <p className="text-muted-foreground">{course.longDescription}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lo Que Aprenderás</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Crear un plan financiero personalizado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Entender conceptos financieros clave</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Construir hábitos financieros saludables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Tomar decisiones financieras informadas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Establecer metas financieras alcanzables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Seguir tu progreso de manera efectiva</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="mt-6">
              <div className="space-y-6">
                {course.modulesList?.map((module) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Módulo {module.id}: {module.title}
                      </CardTitle>
                      <CardDescription>
                        {module.lessons} lecciones • {module.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {Array.from({ length: module.lessons }).map((_, i) => (
                          <li key={i} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                              <Play className="h-4 w-4 text-muted-foreground" />
                              <span>
                                Lección {i + 1}:{" "}
                                {
                                  [
                                    "Introducción",
                                    "Conceptos Clave",
                                    "Ejercicio Práctico",
                                    "Estudio de Caso",
                                    "Cuestionario",
                                  ][i % 5]
                                }
                              </span>
                            </div>
                            <Badge variant="outline">{Math.floor(Math.random() * 15) + 5} min</Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resources" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recursos Descargables</CardTitle>
                    <CardDescription>Accede a estos materiales para mejorar tu aprendizaje</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>Libro de Trabajo del Curso</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Descargar
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>Plantillas de Planificación Financiera</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Descargar
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>Lista de Lecturas Recomendadas</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Descargar
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Herramientas Adicionales</CardTitle>
                    <CardDescription>Herramientas para ayudarte a aplicar lo que has aprendido</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>Calculadora de Presupuesto</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Acceder
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>Hoja de Trabajo para Establecer Metas</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Acceder
                        </Button>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                          <span>Evaluación de Salud Financiera</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Acceder
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
