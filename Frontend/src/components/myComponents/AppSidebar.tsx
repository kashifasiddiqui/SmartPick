// import {
//   Inbox,
//   Table,
//   Table2,
//   TableCellsMergeIcon,
//   IdCard,
//   IndentIcon,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { Link } from "react-router-dom";

// // Menu items.
// const item = [
//   {
//     title: "Live Console",
//     url: "/Console",
//     icon: Inbox,
//   },
//   {
//     title: "Live Status",
//     url: "/Status",
//     icon: IndentIcon,
//   },
// ];
// const item1 = [
//   {
//     title: "Total Table",
//     url: "/Records",
//     icon: Table,
//   },
//   {
//     title: "Dropped Table",
//     url: "/Records/Dropped",
//     icon: Table2,
//   },
//   {
//     title: "Undropped Table",
//     url: "/Records/UnDropped",
//     icon: TableCellsMergeIcon,
//   },
//   // {
//   //   title: "RFID table",
//   //   url: "/Records/rfid",
//   //   icon: IdCard,
//   // },
// ];

// export default function AppSidebar() {
//   return (
//     <Sidebar collapsible="icon">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {item.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link to={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//           {/* ======================== */}
//           <SidebarGroupLabel>Child Records</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {item1.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link to={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }


import { useState } from "react";

// Simple icon components matching lucide-react
const Inbox = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

const IndentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
  </svg>
);

const Table = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const Table2 = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const TableCellsMerge = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Menu items
const item = [
  {
    title: "Live Console",
    url: "/Console",
    icon: Inbox,
  },
  {
    title: "Live Status",
    url: "/Status",
    icon: IndentIcon,
  },
];

const item1 = [
  {
    title: "Total Table",
    url: "/Records",
    icon: Table,
  },
  {
    title: "Dropped Table",
    url: "/Records/Dropped",
    icon: Table2,
  },
  {
    title: "Undropped Table",
    url: "/Records/UnDropped",
    icon: TableCellsMerge,
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const currentPath = window.location.pathname;

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {!collapsed && (
            <>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <span className="font-bold text-gray-900">SmartPick</span>
            </>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              title="Expand sidebar"
            >
              <span className="text-white font-bold text-sm">SP</span>
            </button>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title="Collapse sidebar"
          >
            <ChevronLeft />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Dashboard Section */}
        <div className="mb-6">
          {!collapsed && (
            <div className="px-4 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Dashboard
              </p>
            </div>
          )}
          {collapsed && <div className="h-px bg-gray-200 mx-4 mb-2"></div>}
          <nav className="space-y-1 px-2">
            {item.map((menuItem) => {
              const Icon = menuItem.icon;
              const isActive = currentPath === menuItem.url;
              return (
                <a
                  key={menuItem.title}
                  href={menuItem.url}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? menuItem.title : ""}
                >
                  <div className={isActive ? "text-blue-600" : "text-gray-500"}>
                    <Icon />
                  </div>
                  {!collapsed && (
                    <span className="font-medium text-sm">{menuItem.title}</span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Child Records Section */}
        <div>
          {!collapsed && (
            <div className="px-4 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Child Records
              </p>
            </div>
          )}
          {collapsed && <div className="h-px bg-gray-200 mx-4 mb-2"></div>}
          <nav className="space-y-1 px-2">
            {item1.map((menuItem) => {
              const Icon = menuItem.icon;
              const isActive = currentPath === menuItem.url;
              return (
                <a
                  key={menuItem.title}
                  href={menuItem.url}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? menuItem.title : ""}
                >
                  <div className={isActive ? "text-blue-600" : "text-gray-500"}>
                    <Icon />
                  </div>
                  {!collapsed && (
                    <span className="font-medium text-sm">{menuItem.title}</span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 font-semibold text-xs">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">admin@school.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}