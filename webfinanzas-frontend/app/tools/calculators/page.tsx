import { CalculadoraInteresCompuesto } from "@/components/layout/tools/calculators/calculators";

export default function CalculatorsPage() {
    return(
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Calculadora de Interés Compuesto</h1>
            <CalculadoraInteresCompuesto />
        </main>
    )
}