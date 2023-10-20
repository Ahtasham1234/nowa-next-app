import Checkbox from '@mui/icons-material/CheckBox';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faMoneyBill  } from '@fortawesome/free-solid-svg-icons';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ImCreditCard } from 'react-icons/im';
import { RiKeyboardBoxFill } from 'react-icons/ri';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

export const MENUITEMS = [
    {
      menutitle: "Main",
      Items: [
        {
          title: "Dashboards",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
            </svg>
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/components/dashboards/dashboard1`,
              type: "link",
              active:false,
              selected:false,
              title: "Dashboard-1",
            },
          ],
        },
      ],
    },
    {
      menutitle: "COMPONENTS",
      Items: [
        {
          path: `/components/widgets`,
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
            </svg>
          ),
          type: "link",
          selected:false,
          active:false,
          title: "Widgets",
        },
      
      ],  
      
    }, 

    {
      menutitle: "MODULOS",
      Items: [
        {
          title: "Ventas",
          icon: (
            <FontAwesomeIcon icon={faMoneyBill}  width="24"
            height="24"  className="side-menu__icon"/> 
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/xy`,
              type: "link",
              active:false,
              selected:false,
              title: "Cotizacion",
            },
            {
              path: `/components/Ventas/Venta`,
              type: "link",
              active:false,
              selected:false,
              title: "Venta",
            },
            {
              path: `/c`,
              type: "link",
              active:false,
              selected:false,
              title: "Devolucion",
            },
            {
              path: `/d`,
              type: "link",
              active:false,
              selected:false,
              title: "Despacho",
            },
            {
              path: `/e`,
              type: "link",
              active:false,
              selected:false,
              title: "Emitidos",
            },
            {
              path: `/f`,
              type: "link",
              active:false,
              selected:false,
              title: "Registro de ventas",
            },
            {
              path: `/g`,
              type: "link",
              active:false,
              selected:false,
              title: "Despachos",
            },
            {
              path: `/h`,
              type: "link",
              active:false,
              selected:false,
              title: "Inteligencia de negocios",
            },
            {
              path: `/i`,
              type: "link",
              active:false,
              selected:false,
              title: "Configuracion",
            }

          ],
        },
        {
          title: "Inventario",
          icon: (
            <InventoryIcon icon={faMoneyBill}  width="24"
            height="24"  className="side-menu__icon"/> 
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/j`,
              type: "link",
              active:false,
              selected:false,
              title: "Ingreso de mercaderia",
            },
            {
              path: `/k`,
              type: "link",
              active:false,
              selected:false,
              title: "Otros movimientos",
            },
            {
              path: `/l`,
              type: "link",
              active:false,
              selected:false,
              title: "Stock",
            },
            {
              path: `/`,
              type: "link",
              active:false,
              selected:false,
              title: "Kardex",
            }
          ],
        },
        {
          title: "Proveedor ",
          icon: (
            <ImCreditCard icon={faMoneyBill}  width="24"
            height="24"  className="side-menu__icon"/>  
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/j`,
              type: "link",
              active:false,
              selected:false,
              title: "Compras",
            },
            {
              path: `/k`,
              type: "link",
              active:false,
              selected:false,
              title: "Otros gastos",
            },
            {
              path: `/l`,
              type: "link",
              active:false,
              selected:false,
              title: "Compras y gastos",
            },
            {
              path: `/`,
              type: "link",
              active:false,
              selected:false,
              title: "Registro de compras",
            }
          ],
        },
        {
          title: "Presemtacion",
          icon: (
            <RiKeyboardBoxFill  icon={faMoneyBill}  width="24"
            height="24"  className="side-menu__icon"/>  
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/j`,
              type: "link",
              active:false,
              selected:false,
              title: "Facturacion electronica",
            },
            {
              path: `/k`,
              type: "link",
              active:false,
              selected:false,
              title: "PLE",
            },
            {
              path: `/l`,
              type: "link",
              active:false,
              selected:false,
              title: "Cierre de mes",
            },
            {
              path: `/`,
              type: "link",
              active:false,
              selected:false,
              title: "Estado financiero",
            },
            {
              path: `/`,
              type: "link",
              active:false,
              selected:false,
              title: "Resultados",
            },
            {
              path: `/`,
              type: "link",
              active:false,
              selected:false,
              title: "Movimientos caja",
            }

          ],
        },
      
      ], 
    },
    {
      menutitle: "CONFIGURACION",
      Items: [
        {
          title: "DatosMaestros",
          icon: (
            <FontAwesomeIcon icon={faFolder}  width="24"
            height="24"  className="side-menu__icon"/> 
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/components/MasterData/Clientes`,
              type: "link",
              active:false,
              selected:false,
              title: "Clientes",
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Proveedores",
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Articulos",
            },
            {
              path: `/components/MasterData/MeasurementUnits`,
              type: "link",
              active:false,
              selected:false,
              title: "Unidades de medida", 
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Almacenes",
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Presentaciones",
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Listas de precio",
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Sucursales",
            },
          ],
        },
        {
          title: "Seguridad",
          icon: (
            <Checkbox icon={faFolder}  width="24"
            height="24"  className="side-menu__icon"/> 
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Usuarios",  
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Perfiles",
            },
            {
              path: `/xa`,
              type: "link",
              active:false,
              selected:false,
              title: "Alta a usuarios",
            }
          ],
        },
      ],
    },



  ];
  