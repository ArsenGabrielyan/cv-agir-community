import { DEFAULT_VIDEO_DIMENSION } from "@/lib/constants";
import { useIsMobile } from "./use-mobile";

export default function useDemoVideoSize() : {
     width: string,
     height: string
} {
     const isMobile = useIsMobile();
     const size = isMobile ? 270 : 350;

     const width = size > 0 ? `${size}px` : `${DEFAULT_VIDEO_DIMENSION}px`;
     const height = size > 0 ? `${size}px` : `${DEFAULT_VIDEO_DIMENSION}px`;

     return {width, height}
}