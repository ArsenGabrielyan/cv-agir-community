import { Button } from "@/components/ui/button";
import LoadingButton from "./buttons/loading-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface DeleteConfirmationDialogProps{
     open: boolean,
     onOpenChange: (open: boolean) => void
     loading: boolean,
     onAccept: () => void,
     acceptButtonText: string,
     dialogTitle: string,
     t: ReturnType<typeof useTranslations<"deletion-confirmation">>
}
export default function DeleteConfirmationDialog({
     open,
     onOpenChange,
     loading,
     onAccept,
     acceptButtonText,
     dialogTitle,
     t
}: DeleteConfirmationDialogProps){
     const buttonTxt = useTranslations("buttons")
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle className="leading-6">{dialogTitle}</DialogTitle>
                         <DialogDescription>{t("desc")}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                         <LoadingButton
                              variant="destructive"
                              onClick={onAccept}
                              loading={loading}
                         >
                              {acceptButtonText}
                         </LoadingButton>
                         <Button variant="secondary" onClick={()=>onOpenChange(false)}>
                              {buttonTxt("close")}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}