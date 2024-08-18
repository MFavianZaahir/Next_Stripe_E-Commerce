import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function PurchasePage({ params: { id } }: { params: { id: string } }) {
    const product = await db.product.findUnique({where: {id} });
    if (!product || product == null) {
        return notFound()
    }
    return <div>PurchasePage</div>;
}