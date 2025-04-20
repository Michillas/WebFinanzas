"use client";

import {
    BarChart3,
    Calculator,
    BookIcon,
    Cpu,
    Bitcoin,
    Briefcase,
} from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ReactNode } from "react";

const financeTools = [
    {
        id: 1,
        title: "Stocks y ETFs",
        description: "Monitorea y analiza stocks y ETFs en el mercado",
        icon: <BarChart3 className="h-10 w-10" />,
        href: "/tools/investments",
    },
    {
        id: 2,
        title: "Calculadoras",
        description: "Utiliza calculadoras financieras para tus necesidades",
        icon: <Calculator className="h-10 w-10" />,
        href: "/tools/calculators",
    },
    {
        id: 3,
        title: "Cursos",
        description: "Aprende sobre finanzas con cursos open source",
        icon: <BookIcon className="h-10 w-10" />,
        href: "/tools/courses",
    },
    {
        id: 4,
        title: "IA de Finanzas",
        description: "Aprovecha la inteligencia artificial para tus finanzas",
        icon: <Cpu className="h-10 w-10" />,
        href: "/tools/ai",
    },
    {
        id: 5,
        title: "Criptomonedas",
        description: "Sigue las últimas tendencias en criptomonedas",
        icon: <Bitcoin className="h-10 w-10" />,
        href: "/tools/crypto",
    },
    {
        id: 6,
        title: "Trabajo y sectores",
        description: "Explora métricas y análisis de diferentes sectores",
        icon: <Briefcase className="h-10 w-10" />,
        href: "/tools/work",
    },
];

interface FinanceToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

function FinanceToolCard({
  title,
  description,
  icon,
  href,
}: FinanceToolCardProps) {
  return (
    <Link
      href={href}
      className="block transition-all duration-200 hover:scale-[1.02]"
    >
      <Card className="h-full min-h-40 cursor-pointer border-2 transition-colors hover:border-primary/50 hover:bg-muted/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">{title}</CardTitle>
          <div className="text-primary">{icon}</div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="flex mt-32 flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Tus <span className="text-transparent bg-gradient-to-r from-[#c2ff94] to-primary bg-clip-text">FireTools</span> Financieras
        </h1>
        <p className="mt-2 text-muted-foreground">
          Elige una herramienta para empezar
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {financeTools.map((tool) => (
          <FinanceToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            href={tool.href}
          />
        ))}
        <Link className="flex text-center border-2 border-secondary col-span-3 hover:scale-[1.02] transition-all duration-200 hover:border-primary/50 hover:bg-muted/50 p-2 rounded-lg bg-card" href="/dashboard">
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-muted-foreground">-</div><div className=" text-xl font-medium mx-1">Entrar a<span className="text-transparent bg-gradient-to-r from-[#c2ff94] to-primary bg-clip-text mx-1">FireBoard</span></div><div className="text-muted-foreground"> -</div>
          </div>
        </Link>
      </div>
    </main>
  );
}
