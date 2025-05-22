"use client";
import React, { useContext,useState, useEffect } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [userType, setUserType] = useState<number | null>(null);

    useEffect(() => {
        const type = sessionStorage.getItem('userType');
        if (type) setUserType(Number(type));
    }, []);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
        },
        {
            label: 'Sacco Records',
            items: [
                { label: 'Financial Statements', icon: 'pi pi-fw pi-id-card', to: '/statements' },
                
            ]
        },
         ...(userType === 1
            ? [
                  {
                      label: 'Management',
                      items: [
                          { label: 'Uploads', icon: 'pi pi-fw pi-id-card', to: '/management' }
                      ]
                  }
              ]
            : [])
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;