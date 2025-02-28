import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "¿Qué es FireNances?",
    answer: "FireNances es una aplicación innovadora para gestionar tus finanzas personales de manera eficiente y sencilla.",
    value: "item-1",
  },
  {
    question: "¿Cómo puedo empezar a usar FireNances?",
    answer:
      "Comenzar es muy fácil. Solo necesitas registrarte con tu correo electrónico y podrás empezar a organizar tus finanzas.",
    value: "item-2",
  },
  {
    question: "¿FireNances ofrece herramientas de presupuesto?",
    answer:
      "Sí, FireNances te permite crear y seguir presupuestos personalizados para ayudarte a controlar tus gastos.",
    value: "item-3",
  },
  {
    question: "¿Es seguro usar FireNances?",
    answer: "Totalmente. Utilizamos las mejores prácticas de seguridad para proteger tu información financiera.",
    value: "item-4",
  },
  {
    question: "¿Puedo establecer metas financieras en FireNances?",
    answer: "Sí, puedes establecer metas financieras y hacer un seguimiento de tu progreso fácilmente.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Preguntas Frecuentes
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
