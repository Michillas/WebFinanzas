"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import TradingViewWidget from "@/components/layout/tools/investments/tradingview-widget";

export default function AssetPage({ params }: { params: { symbol: string } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Link href="/tools/investments">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Mercado
        </Button>
      </Link>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{params.symbol}</h1>
          </div>
          <p className="text-muted-foreground">
            Visualización del gráfico avanzado para el símbolo: {params.symbol}
          </p>
        </div>

        <div className="h-[500px] w-full">
          <TradingViewWidget symbol={params.symbol} />
        </div>
      </div>
    </div>
  );
}