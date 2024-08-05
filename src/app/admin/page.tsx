import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import db from "@/db/db";

async function getSalesData() {
    const data = await db?.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true
    })
    return {
        amount: (data._sum.pricePaidInCents ||0) / 100,
        numberOfSales: data._count
    }
}

export default async function AdminDashboard() {
    const salesData = await getSalesData()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashBoardCard title="Sales" subtitle={salesData.numberOfSales} body={salesData.amount} />
        </div>
    );
}

type DashBoardCardProps = {
    title: string,
    subtitle: string,
    body: string,
}

function DashBoardCard({ title, subtitle, body }: DashBoardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    );
}
