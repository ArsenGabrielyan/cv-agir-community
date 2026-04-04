"use server"

import { revalidatePath } from "next/cache"

export async function refreshPath(currPath: string) {
     return revalidatePath(currPath,"page")
}