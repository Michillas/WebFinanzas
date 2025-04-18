import { JobSearch } from "@/components/layout/tools/work/job-search"

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-100 md:text-4xl lg:text-5xl">
                Explorador de Carreras Profesionales
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Descubre información detallada sobre diferentes carreras incluyendo salarios, requisitos de experiencia,
                equilibrio trabajo-vida y potencial de crecimiento para tomar decisiones profesionales informadas.
              </p>
            </div>
            <JobSearch />
          </div>
        </main>
    )
}