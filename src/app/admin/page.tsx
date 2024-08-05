import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { formatNumber, formatCurrency } from "@/lib/formatters";
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
            <DashboardCard 
            title="Sales" 
            subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} 
            body={formatCurrency(salesData.amount)} />
            <DashboardCard 
            title="Customers" 
            subtitle={`${formatCurrency()} Average Value`} 
            body={formatNumber()} />
        </div>
    );
}

type DashboardCardProps = {
    title: string,
    subtitle: string,
    body: string,
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
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
