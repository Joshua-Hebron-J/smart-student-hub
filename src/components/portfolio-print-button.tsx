'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortfolioPrintButton({ studentName }: { studentName: string }) {
  const handlePrint = () => {
    const printContent = document.getElementById('portfolio-content');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const portfolioHtml = printContent.innerHTML;
    const tailwindCssUrl = "https://cdn.tailwindcss.com"; // For simplicity
    
    printWindow.document.write(`
        <html>
        <head>
            <title>${studentName}'s Portfolio</title>
            <script src="${tailwindCssUrl}"></script>
            <style>
              body { font-family: Inter, sans-serif; -webkit-print-color-adjust: exact; }
              .print-container { padding: 2rem; background-color: white; }
              .section-card { border: 1px solid #e5e7eb; border-radius: 0.75rem; overflow: hidden; page-break-inside: avoid; }
              .section-header { background-color: #f9fafb; padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;}
            </style>
        </head>
        <body class="bg-gray-100">
            <div class="print-container">
                ${portfolioHtml}
            </div>
            <script>
                setTimeout(() => { window.print(); window.close(); }, 500);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
  };

  return (
    <Button onClick={handlePrint}>
        <Printer className="mr-2 h-4 w-4" />
        Export to PDF
    </Button>
  );
}
