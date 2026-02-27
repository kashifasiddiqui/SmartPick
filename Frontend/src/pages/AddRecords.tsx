// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const formSchema = z.object({
//   parent_name: z.string().min(4, {
//     message: "Parent name must be at least 4 characters.",
//   }),
//   parent_email: z.string().email({
//     message: "Parent email must be a valid email address.",
//   }),
//   parent_phone_number: z.string().regex(/^\d{10}$/, {
//     message: "Parent phone number must be a 10-digit number.",
//   }),
//   parent_pickup_code: z.string().min(4, {
//     message: "Parent pickup code is required.",
//   }),
//   child_name: z.string().min(4, {
//     message: "Child name must be at least 4 characters.",
//   }),
//   parent_img_url: z.any().optional(),
//   child_img_url: z.any().optional(),
// });

// export default function AddRecords() {
//   const navigate = useNavigate();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       parent_name: "",
//       parent_email: "",
//       parent_phone_number: "",
//       parent_pickup_code: "",
//       child_name: "",
//       parent_img_url: [],
//       child_img_url: [],
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(value: FieldValues) {
//     const formData1 = new FormData();
//     const formData2 = new FormData();
//     formData1.append("Child", value.child_img_url);
//     formData1.append("name", value.child_name);
//     formData2.append("Parent", value.parent_img_url);
//     formData2.append("name", value.parent_name);

//     (async () => {
//       const data = await axios.post("/api/records/uploadChild", formData1, {
//         headers: {
//           "Content-type":
//             "multipart/form-data; boundary=--------------------------585591568098780255545610",
//         },
//       });
//       const data1 = await axios.post("/api/records/uploadParent", formData2, {
//         headers: {
//           "Content-type":
//             "multipart/form-data; boundary=--------------------------585591568098780255545610",
//         },
//       });

//       if (!data.data.fileName && !data1.data.fileName) {
//         return 
//       } else {
//         const str1 = location.host + "/img/Child/" + data.data.fileName;
//         const str2 = location.host + "/img/Parent/" + data1.data.fileName;

//         form.setValue("parent_img_url", str1 as unknown as never[]);
//         form.setValue("child_img_url", str2 as unknown as never[]);

//         console.log(formData1.get("name"));

//         axios
//           .post("/api/records", form.getValues())
//           .then(() => {
//             navigate(-1);
//           })
//           .catch((err) => {
//             alert(err)
//           });
//       }
//     })();
//   }
//   return (
//     <div className=" w-full flex justify-center items-center">
//       <div className=" w-[30rem] ">
//         <div className=" pb-9 pt-9">
//           <h1 className=" text-2xl font-semibold"> Add New Records</h1>
//           <p className=" text-sm">
//             This will add new data to the Records Table
//           </p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="parent_name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Parent Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter parent name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="parent_email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Parent Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Enter parent email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="parent_phone_number"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Parent Phone Number</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="tel"
//                       placeholder="Enter parent phone number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="parent_pickup_code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Parent Pickup Code</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter pickup code" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="child_name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Child Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter child name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="parent_img_url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Parent Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) =>
//                         field.onChange(e.target.files?.[0] || null)
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="child_img_url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Child Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) =>
//                         field.onChange(e.target.files?.[0] || null)
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

type FormData = {
  parent_name: string;
  parent_email: string;
  parent_phone_number: string;
  parent_pickup_code: string;
  child_name: string;
  parent_img_url: File | null;
  child_img_url: File | null;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export default function AddRecords() {
  const [formData, setFormData] = useState<FormData>({
    parent_name: "",
    parent_email: "",
    parent_phone_number: "",
    parent_pickup_code: "",
    child_name: "",
    parent_img_url: null,
    child_img_url: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parentImgPreview, setParentImgPreview] = useState<string | null>(null);
  const [childImgPreview, setChildImgPreview] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.parent_name.length < 4) {
      newErrors.parent_name = "Parent name must be at least 4 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.parent_email)) {
      newErrors.parent_email = "Please enter a valid email address.";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.parent_phone_number)) {
      newErrors.parent_phone_number = "Phone number must be 10 digits.";
    }

    if (formData.parent_pickup_code.length < 4) {
      newErrors.parent_pickup_code = "Pickup code must be at least 4 characters.";
    }

    if (formData.child_name.length < 4) {
      newErrors.child_name = "Child name must be at least 4 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (field: "parent_img_url" | "child_img_url", file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "parent_img_url") {
          setParentImgPreview(reader.result as string);
        } else {
          setChildImgPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (field === "parent_img_url") {
        setParentImgPreview(null);
      } else {
        setChildImgPreview(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData1 = new FormData();
      const formData2 = new FormData();
      
      if (formData.child_img_url) {
        formData1.append("Child", formData.child_img_url);
        formData1.append("name", formData.child_name);
      }
      
      if (formData.parent_img_url) {
        formData2.append("Parent", formData.parent_img_url);
        formData2.append("name", formData.parent_name);
      }

      const uploadChild = await fetch("/api/records/uploadChild", {
        method: "POST",
        body: formData1,
      });
      const childData = await uploadChild.json();

      const uploadParent = await fetch("/api/records/uploadParent", {
        method: "POST",
        body: formData2,
      });
      const parentData = await uploadParent.json();

      if (!childData.fileName && !parentData.fileName) {
        alert("Failed to upload images");
        setIsSubmitting(false);
        return;
      }

      const str1 = location.host + "/img/Child/" + childData.fileName;
      const str2 = location.host + "/img/Parent/" + parentData.fileName;

      const recordData = {
        parent_name: formData.parent_name,
        parent_email: formData.parent_email,
        parent_phone_number: formData.parent_phone_number,
        parent_pickup_code: formData.parent_pickup_code,
        child_name: formData.child_name,
        parent_img_url: str2,
        child_img_url: str1,
      };

      await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });

      window.history.back();
    } catch (err) {
      alert("Error submitting form: " + err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <button
              onClick={() => window.history.back()}
              className="text-white hover:text-blue-100 mb-4 inline-flex items-center text-sm transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl font-bold text-white">Add New Record</h1>
            <p className="text-blue-100 mt-2">
              Fill in the details to add a new parent and child record
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Name
              </label>
              <input
                type="text"
                value={formData.parent_name}
                onChange={(e) => handleInputChange("parent_name", e.target.value)}
                placeholder="Enter parent name"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.parent_name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.parent_name && (
                <p className="mt-1 text-sm text-red-600">{errors.parent_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Email
              </label>
              <input
                type="email"
                value={formData.parent_email}
                onChange={(e) => handleInputChange("parent_email", e.target.value)}
                placeholder="Enter parent email"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.parent_email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.parent_email && (
                <p className="mt-1 text-sm text-red-600">{errors.parent_email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Phone Number
              </label>
              <input
                type="tel"
                value={formData.parent_phone_number}
                onChange={(e) => handleInputChange("parent_phone_number", e.target.value)}
                placeholder="Enter 10-digit phone number"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.parent_phone_number
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.parent_phone_number && (
                <p className="mt-1 text-sm text-red-600">{errors.parent_phone_number}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Pickup Code
              </label>
              <input
                type="text"
                value={formData.parent_pickup_code}
                onChange={(e) => handleInputChange("parent_pickup_code", e.target.value)}
                placeholder="Enter pickup code"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.parent_pickup_code
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.parent_pickup_code && (
                <p className="mt-1 text-sm text-red-600">{errors.parent_pickup_code}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Child Name
              </label>
              <input
                type="text"
                value={formData.child_name}
                onChange={(e) => handleInputChange("child_name", e.target.value)}
                placeholder="Enter child name"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.child_name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors.child_name && (
                <p className="mt-1 text-sm text-red-600">{errors.child_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Parent Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg px-4 py-3 hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-center gap-2 text-slate-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">
                        {formData.parent_img_url ? formData.parent_img_url.name : "Choose file"}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("parent_img_url", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {parentImgPreview && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200">
                    <img src={parentImgPreview} alt="Parent preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Child Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg px-4 py-3 hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-center gap-2 text-slate-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">
                        {formData.child_img_url ? formData.child_img_url.name : "Choose file"}
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("child_img_url", e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {childImgPreview && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200">
                    <img src={childImgPreview} alt="Child preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Record
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}