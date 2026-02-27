// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import axios from "axios";

// import { useEffect, useState } from "react";

// export default function LiveStatus() {
//   const [on, setOn] = useState(false);
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const detected = await axios.get("/api/getrowstatus");
//       let detectedfinaldata = []
//       for (const i of detected.data) {
//         try {
//           detectedfinaldata.push(await axios.get(`/api/names?childName=${i.Child_Name}&parentName=${i.Parent_Name}&status=0`))
//         } catch(e) {
//           console.log(e)
//         }
//       }
//       console.log(detectedfinaldata)
//       setData(detectedfinaldata)
//     };
    


//     fetchData();
//   }, []);

//   return (
//     <div className=" w-full h-full ">
//       <div className=" w-full h-12 flex justify-between pl-3 pr-3">
//         Records of Un Picked Childrens
//       </div>
//       <Table>
//         <TableCaption>A list of parent and child information</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Parent Name</TableHead>
//             <TableHead>Child Name</TableHead>
//             <TableHead>Timestamp</TableHead>
//             <TableHead>status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index} className=" cursor-pointer">
//               <TableCell>{row.data[0].parent_name}</TableCell>
//               <TableCell>{row.data[0].child_name}</TableCell>
//               <TableCell>{row.data[0].timestamp}</TableCell>
//               <TableCell><Button onClick={(e) => {
//                 row.data[0].id
//                 axios.put(`/api/records/${row.data[0].id}?status=1`)
//               }}>ok</Button></TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

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

export default function LiveStatus() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getrowstatus");
        const detected = await response.json();
        const detectedfinaldata = [];
        
        for (const i of detected) {
          try {
            const res = await fetch(
              `/api/names?childName=${i.Child_Name}&parentName=${i.Parent_Name}&status=0`
            );
            const rowData = await res.json();
            // Only add if we have valid data with required fields
            if (rowData && rowData[0] && rowData[0].parent_name && rowData[0].child_name) {
              detectedfinaldata.push({ data: rowData });
            }
          } catch (e) {
            console.log(e);
          }
        }
        
        setData(detectedfinaldata);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConfirmPickup = async (row: any, index: number) => {
    const recordId = row.data[0]?.id;
    if (!recordId) return;
    
    setProcessingId(recordId);
    try {
      await fetch(`/api/records/${recordId}?status=1`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setData((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'N/A';
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full bg-white rounded-lg shadow-lg border border-slate-200">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Pending Pickups
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Children waiting to be picked up
              </p>
            </div>
            <div className="px-4 py-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-full font-semibold">
              {data.length} Pending
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
              <span className="ml-3 text-slate-600">Loading records...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <svg className="w-16 h-16 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">All children have been picked up!</p>
              <p className="text-sm">No pending pickups at the moment.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Parent Name
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Child Name
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Waiting Since
                      </div>
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-slate-700 text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => {
                    const record = row.data && row.data[0] ? row.data[0] : null;
                    
                    // Skip this row if record is invalid or missing required data
                    if (!record || !record.parent_name || !record.child_name) {
                      return null;
                    }
                    
                    return (
                      <tr 
                        key={record.id || index} 
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-6 font-medium text-slate-800">
                          {record.parent_name}
                        </td>
                        <td className="py-4 px-6 text-slate-700">
                          {record.child_name}
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-sm">
                          {formatTimestamp(record.timestamp)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleConfirmPickup(row, index)}
                            disabled={processingId === record.id}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors inline-flex items-center gap-2"
                          >
                            {processingId === record.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Confirm Pickup
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}