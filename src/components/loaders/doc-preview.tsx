import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DocPreviewLoaderProps{
     className?: string
}
const DocPreviewLoader = ({className}: DocPreviewLoaderProps) => (
     <Skeleton className={cn("w-full aspect-210/297",className)}/>
)
export default DocPreviewLoader