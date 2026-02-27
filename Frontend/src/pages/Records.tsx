// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

// import axios from "axios";

// import { PlusSquare } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { useEffect, useRef, useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
// import { Link } from "react-router-dom";

// export default function Records() {
//   return (
//     <div className=" w-full h-full ">
//       <TopBox />
//       <DataTables />
//     </div>
//   );
// }

// function TopBox() {
//   return (
//     <div className=" w-full h-12 flex justify-between pl-3 pr-3">
//       Records
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button className="">
//             <PlusSquare /> New
//           </Button>
//         </AlertDialogTrigger>

//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Click "Continue" if You'r fine</AlertDialogTitle>
//             <AlertDialogDescription>
//               This will create new entry to the Record Table
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction asChild>
//               <Link to="/Records/AddNew">Continue</Link>
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }

// // // Example usage:
// // const data = [
// //     {
// //         id: "1",
// //         parent_name: "John Doe",
// //         parent_email: "john.doe@example.com",
// //         parent_phone_number: "123-456-7890",
// //         parent_pickup_code: "ABC123",
// //         child_name: "Jane Doe",
// //         timestamp: "2025-01-23 10:00 AM",
// //         parent_img_url: "https://via.placeholder.com/50",
// //         child_img_url: "https://via.placeholder.com/50",
// //     },
// //     {
// //         id: "2",
// //         parent_name: "Sarah Smith",
// //         parent_email: "sarah.smith@example.com",
// //         parent_phone_number: "987-654-3210",
// //         parent_pickup_code: "XYZ456",
// //         child_name: "Tom Smith",
// //         timestamp: "2025-01-23 11:00 AM",
// //         parent_img_url: "https://via.placeholder.com/50",
// //         child_img_url: "https://via.placeholder.com/50",
// //     },
// // ];

// type TableRowData = {
//   id: string;
//   parent_name: string;
//   parent_email: string;
//   parent_phone_number: string;
//   parent_pickup_code: string;
//   child_name: string;
//   timestamp: string;
//   parent_img_url: string;
//   child_img_url: string;
// };

// function DataTables() {
//   const [data, setData] = useState<TableRowData[]>([]); // State for table data
//   const [loading, setLoading] = useState<boolean>(true); // State for loading
//   const [error, setError] = useState<string | null>(null); // State for error
//   const ref0 = useRef(null) as any;

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/records"); // Fetch data from API
//         setData(response.data); // Update state with fetched data
//         setLoading(false); // Set loading to false
//       } catch (err) {
//         setError("Failed to fetch data. Please try again later."); // Handle errors
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>; // Show loading message
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>; // Show error message
//   }

//   return (
//     <Table>
//       <TableCaption>A list of parent and child information</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead>ID</TableHead>
//           <TableHead>Parent Name</TableHead>
//           <TableHead>Parent Email</TableHead>
//           <TableHead>Parent Phone Number</TableHead>
//           <TableHead>Parent Pickup Code</TableHead>
//           <TableHead>Child Name</TableHead>
//           <TableHead>Timestamp</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data.map((row, index) => (
//           <TableRow
//             key={index}
//             className=" cursor-pointer"
//             onClick={() => {
//               ref0.current?.click();
//             }}
//           >
//             <Drawer>
//               <DrawerTrigger
//                 ref={ref0}
//                 className=" hidden w-0 h-0"
//               ></DrawerTrigger>
//               <DrawerContent>
//                 <TableRow>
//                   <TableCell>Child name</TableCell>
//                   <TableCell>{row.child_name}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Parent name</TableCell>
//                   <TableCell>{row.parent_name}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Parent email</TableCell>
//                   <TableCell>{row.parent_email}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Parent name</TableCell>
//                   <TableCell>{row.parent_phone_number}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Parent pickup code</TableCell>
//                   <TableCell>{row.parent_pickup_code}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Parent image</TableCell>
//                   <TableCell>
//                     <div className=" w-10 h-10">
//                       <img src={row.parent_img_url} />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Parent image</TableCell>
//                   <TableCell>
//                     <div className=" w-10 h-10">
//                       <img src={row.parent_img_url} />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               </DrawerContent>
//             </Drawer>

//             <TableCell>{row.id}</TableCell>
//             <TableCell>{row.parent_name}</TableCell>
//             <TableCell>{row.parent_email}</TableCell>
//             <TableCell>{row.parent_phone_number}</TableCell>
//             <TableCell>{row.parent_pickup_code}</TableCell>
//             <TableCell>{row.child_name}</TableCell>
//             <TableCell>{row.timestamp}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }


import { useEffect, useState } from "react";

type TableRowData = {
  id: string;
  parent_name: string;
  parent_email: string;
  parent_phone_number: string;
  parent_pickup_code: string;
  child_name: string;
  timestamp: string;
  parent_img_url: string;
  child_img_url: string;
};

export default function Records() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100">
      <TopBox />
      <DataTables />
    </div>
  );
}

function TopBox() {
  const [showDialog, setShowDialog] = useState(false);

  const handleContinue = () => {
    // Navigate to /Records/AddNew - you can implement this with your router
    window.location.href = "/Records/AddNew";
  };

  return (
    <>
      <div className="w-full px-6 py-4 flex justify-between items-center bg-white border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Records</h1>
          <p className="text-sm text-slate-500 mt-1">Manage parent and child information</p>
        </div>
        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-sm transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Record
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Create New Record
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                This will create a new entry in the Record Table. Click "Continue" to proceed.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContinue}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DataTables() {
  const [data, setData] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<TableRowData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/records");
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

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'N/A';
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return timestamp;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Parent Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Parent Email</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Phone Number</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Pickup Code</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Child Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="font-medium">No records found</p>
                      <p className="text-sm">Create your first record to get started</p>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedRow(row)}
                      className="border-b border-slate-100 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-700 font-medium">{row.id}</td>
                      <td className="py-4 px-6 text-slate-800 font-medium">{row.parent_name}</td>
                      <td className="py-4 px-6 text-slate-600">{row.parent_email}</td>
                      <td className="py-4 px-6 text-slate-600">{row.parent_phone_number}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {row.parent_pickup_code}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-700">{row.child_name}</td>
                      <td className="py-4 px-6 text-slate-600 text-sm">{formatTimestamp(row.timestamp)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {data.length > 0 && (
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-sm text-slate-600">
              Showing {data.length} record{data.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Drawer/Modal for row details */}
      {selectedRow && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50"
          onClick={() => setSelectedRow(null)}
        >
          <div 
            className="bg-white w-full sm:max-w-2xl sm:rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Record Details</h3>
              <button
                onClick={() => setSelectedRow(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Child Name</p>
                  <p className="text-slate-800 font-medium">{selectedRow.child_name}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Parent Name</p>
                  <p className="text-slate-800 font-medium">{selectedRow.parent_name}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Parent Email</p>
                  <p className="text-slate-800">{selectedRow.parent_email}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Phone Number</p>
                  <p className="text-slate-800">{selectedRow.parent_phone_number}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Pickup Code</p>
                  <p className="text-slate-800 font-mono font-semibold">{selectedRow.parent_pickup_code}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Timestamp</p>
                  <p className="text-slate-800">{formatTimestamp(selectedRow.timestamp)}</p>
                </div>
              </div>
              
              {(selectedRow.parent_img_url || selectedRow.child_img_url) && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  {selectedRow.parent_img_url && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Parent Image</p>
                      <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-slate-200">
                        <img 
                          src={selectedRow.parent_img_url} 
                          alt="Parent"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedRow.child_img_url && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Child Image</p>
                      <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-slate-200">
                        <img 
                          src={selectedRow.child_img_url} 
                          alt="Child"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setSelectedRow(null)}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-md font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}