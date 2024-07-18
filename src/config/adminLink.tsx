import { LayoutDashboard,SquareUser,Wallet,PackageCheck, Users } from "lucide-react";

type LinkType = {
    id: number;
    path: string;
    icon: JSX.Element;
    label: string;
  };

export const ADMIN_LINKS:LinkType[] = [
    {
        id:1,
        path:'/',
        label: "Home",
        icon:<LayoutDashboard width='20' />,
    },
    {
        id:2,
        path:'/admin/accounts',
        label: "Accounts",
        icon:<SquareUser width='20'/>,
    },
    {
        id:3,
        path:'/',
        label: "Payments",
        icon:<Wallet width='20'/>,
    },
    {
        id:4,
        path:'/admin/products',
        label: "Products",
        icon:<PackageCheck width='20'/>,
    },
    {
        id:5,
        path:'/',
        label: "Costometers",
        icon:<Users width='20'/>,
    },

  ];