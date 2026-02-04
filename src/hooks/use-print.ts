import { useReactToPrint, UseReactToPrintOptions} from "react-to-print";
import { useIsMobile } from "./use-mobile";
import printJS from "print-js";
import { absoluteUrl } from "@/lib/utils";

export default function usePrint({contentRef,documentTitle,...options}: Omit<UseReactToPrintOptions,"contentRef"> & {
     contentRef?: React.RefObject<HTMLDivElement | null>
}) {
     const printDesktop = useReactToPrint({
          contentRef,
          documentTitle,
          ...options
     })
     const isMobile = useIsMobile();
     const handlePrint = () => {
          const el = contentRef?.current;
          if (!el) return;
          if(isMobile){
               el.scrollIntoView({ behavior: "auto", block: "start" });
               printJS({
                    printable: el,
                    documentTitle,
                    type: "html",
                    scanStyles: false,
                    css: [
                         absoluteUrl("/print.css")
                    ],
                    style: `
                    #resumePreviewContent,
                    #coverLetterPreviewContent {
                         zoom: 1 !important;
                         -webkit-print-color-adjust: exact; !important;
                         print-color-adjust: exact; !important;
                         transform: none !important;
                         visibility: visible !important;
                         display: block !important;
                         position: absolute !important;
                         width: 210mm !important;
                         height: 297mm !important;
                         top: 0 !important;
                         left: 0 !important;
                    }
                    @page {
                         size: a4 portrait;
                         margin: 0.6cm;
                    }
                    `
               })
          } else {
               printDesktop()
          }
     }
     return handlePrint
}