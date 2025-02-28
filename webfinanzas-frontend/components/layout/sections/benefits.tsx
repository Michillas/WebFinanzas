import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Blocks",
    title: "Construir confianza en la marca",
    description:
      "Aumenta la credibilidad de tu marca con estrategias financieras sólidas y efectivas.",
  },
  {
    icon: "LineChart",
    title: "Más clientes potenciales",
    description:
      "Atrae a más clientes potenciales con nuestras herramientas de análisis financiero.",
  },
  {
    icon: "Wallet",
    title: "Mayores conversiones",
    description:
      "Convierte más visitantes en clientes con nuestras soluciones de conversión optimizadas.",
  },
  {
    icon: "Sparkle",
    title: "Probar ideas de marketing",
    description:
      "Experimenta con nuevas estrategias de marketing y mide su impacto financiero.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Beneficios</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu atajo al éxito financiero
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            En FireNances, te ayudamos a alcanzar tus metas financieras con herramientas y estrategias efectivas. Descubre cómo podemos transformar tu futuro financiero.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
