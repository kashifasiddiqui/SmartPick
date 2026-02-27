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
// import { useEffect, useState } from "react";




// export default function Dropped() {
//     return (
//         <div className=" w-full h-full ">
//             <TopBox />
//             <DataTables />
//         </div>
//     )
// }


// function TopBox() {
//     return <div className=" w-full h-12 flex justify-between pl-3 pr-3">
//         Records of Picked Childrens
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
//                 const response = await axios.get("/api/records/status/1"); // Fetch data from API
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

export default function Dropped() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100">
      <TopBox />
      <DataTables />
    </div>
  );
}

function TopBox() {
  return (
    <div className="w-full px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Picked Up Records</h1>
          <p className="text-sm text-slate-500 mt-1">
            History of successfully picked up children
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-green-700">Completed</span>
        </div>
      </div>
    </div>
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
        const response = await fetch("/api/records/status/1");
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
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return timestamp;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium">No picked up records yet</p>
                      <p className="text-sm">Records will appear here once children are picked up</p>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedRow(row)}
                      className="border-b border-slate-100 hover:bg-green-50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-700 font-medium">{row.id}</td>
                      <td className="py-4 px-6 text-slate-800 font-medium">{row.parent_name}</td>
                      <td className="py-4 px-6 text-slate-600">{row.parent_email}</td>
                      <td className="py-4 px-6 text-slate-600">{row.parent_phone_number}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-sm text-slate-600 flex items-center justify-between">
              <span>Showing {data.length} completed pickup{data.length !== 1 ? "s" : ""}</span>
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">All picked up</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
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
              <div>
                <h3 className="text-xl font-bold text-slate-800">Pickup Details</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </span>
                </div>
              </div>
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
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Record ID</p>
                  <p className="text-slate-800 font-medium">{selectedRow.id}</p>
                </div>

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

                <div className="bg-slate-50 p-4 rounded-lg md:col-span-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Pickup Time</p>
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