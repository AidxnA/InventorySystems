import { BadgeDollarSign, ShoppingCart, Box, TrendingUp } from 'lucide-react';
export const navigationlink = [
    { Link: "/dashboard", name: "Dashboard" },
    { Link: "/products", name: "Products" },
    { Link: "/sales", name: "Sales" },
    { Link: "/restock", name: "Restock" },
    { Link: "/customers", name: "Customers" },
    { Link: "/invoice", name: "Invoice" },
    
]


type StatusCardProps = {
    id:string;
    description:string;
    icon: React.ReactNode;
    title:string;
}
type StatusCard = {
    status: StatusCardProps[]
}
export const dashboardstatuscard: StatusCard = {
    status: [
        {id:"1", title: "Today's Sales", description: "Cash and digital channels", icon: <BadgeDollarSign/>},
        {id:"2", title: "Goods Traded (Month)", description: "Inclusive of wholesales", icon: <ShoppingCart/>},
        {id:"3", title: "Current Stock Value", description: "Based on inventory records", icon: <Box/>},
        {id:"4", title: "Monthly Profit", description: "Your monthly profit", icon: <TrendingUp/>},
    ]
}