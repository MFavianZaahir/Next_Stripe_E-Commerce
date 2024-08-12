"use client"

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct, toggleProductAvailability } from "@/app/admin/_actions/product";

export function ActiveToggleDropdownItem({id, isAvailableForPurchase} : {id: string, isAvailableForPurchase: boolean}) {
    const [isPending, startTransition] = useTransition() 
    return (
    <DropdownMenuItem
    disabled={isPending} onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !isAvailableForPurchase)
            })
        }}>
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({ id, disabled } : { id: string, disabled: boolean }){
    const [isPending, startTransition] = useTransition() 
    return (
    <DropdownMenuItem
    disabled={disabled || isPending} onClick={() => {
            startTransition(async () => {
                await deleteProduct(id)
            })
        }}>
            Delete
    </DropdownMenuItem>
    )
}