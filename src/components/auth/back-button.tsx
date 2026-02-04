"use client"
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button"

interface BackButtonProps{
     href: string;
     label: string;
}
export const BackButton = ({href,label}: BackButtonProps) => (
     <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={href}>{label}</Link>
     </Button>
)