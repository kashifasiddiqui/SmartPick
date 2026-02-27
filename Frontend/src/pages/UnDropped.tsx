// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// import axios from "axios";

// import {
//     PlusSquare
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { useEffect, useState } from "react";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
// import { Link } from "react-router-dom";



// export default function UnDropped() {
//     return (
//         <div className=" w-full h-full ">
//             <TopBox />
//             <DataTables />
//         </div>
//     )
// }


// function TopBox() {
//     return <div className=" w-full h-12 flex justify-between pl-3 pr-3">
//         Records of Un Picked Childrens
//     </div>

// }

// type TableRowData = {
//     id: string;
//     parent_name: string;
//     parent_email: string;
//     parent_phone_number: string;
//     parent_pickup_code: string;
//     child_name: string;
//     timestamp: string;
//     parent_img_url: string;
//     child_img_url: string;
// };

// function DataTables() {


//     const [data, setData] = useState<TableRowData[]>([]); // State for table data
//     const [loading, setLoading] = useState<boolean>(true); // State for loading
//     const [error, setError] = useState<string | null>(null); // State for error

//     // Fetch data on component mount
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("/api/records/status/0"); // Fetch data from API
//                 setData(response.data); // Update state with fetched data
//                 setLoading(false); // Set loading to false
//             } catch (err) {
//                 setError("Failed to fetch data. Please try again later."); // Handle errors
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>; // Show loading message
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>; // Show error message
//     }


//     return (
//         <Table>
//             <TableCaption>A list of parent and child information</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>ID</TableHead>
//                     <TableHead>Parent Name</TableHead>
//                     <TableHead>Parent Email</TableHead>
//                     <TableHead>Parent Phone Number</TableHead>
//                     <TableHead>Parent Pickup Code</TableHead>
//                     <TableHead>Child Name</TableHead>
//                     <TableHead>Timestamp</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {data.map((row, index) => (
//                     <TableRow key={index} className=" cursor-pointer">
//                         <TableCell>{row.id}</TableCell>
//                         <TableCell>{row.parent_name}</TableCell>
//                         <TableCell>{row.parent_email}</TableCell>
//                         <TableCell>{row.parent_phone_number}</TableCell>
//                         <TableCell>{row.parent_pickup_code}</TableCell>
//                         <TableCell>{row.child_name}</TableCell>
//                         <TableCell>{row.timestamp}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     );
// }



import { useEffect, useState } from "react";

export default function UnDropped() {
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <TopBox />
            <DataTables />
        </div>
    );
}

function TopBox() {
    return (
        <div className="w-full bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Undropped Records</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage parent and child information
                    </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg shadow-sm font-medium transition-colors">
                    <span className="mr-2">+</span> New Record
                </button>
            </div>
        </div>
    );
}

type TableRowData = {
    id: string;
    parent_name: string;
    parent_email: string;
    parent_phone_number: string;
    parent_pickup_code: string;
    child_name: string;
    timestamp: string;
    parent_img_url?: string;
    child_img_url?: string;
};

function DataTables() {
    const [data, setData] = useState<TableRowData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/records/status/0");
                if (!response.ok) throw new Error("Failed to fetch");
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="px-8 py-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Parent Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Parent Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pickup Code</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Child Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {row.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {row.parent_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {row.parent_email}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {row.parent_phone_number}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                                        {row.parent_pickup_code}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {row.child_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(row.timestamp).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-600">
                        Showing {data.length} records
                    </p>
                </div>
            </div>
        </div>
    );
}
