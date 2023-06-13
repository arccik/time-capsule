import { z } from "zod";

export const createCapsuleSchema = z.object({
  dateTime: z.date(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  sendingMethod: z.array(z.string()),
  public: z.boolean().optional(),
  email: z.string().email().optional(),
  post: z.string().optional(),
  phone: z.string().optional(),
  sms: z.string().optional(),
  whatsapp: z.string().optional(),
  call: z.string().optional(),
  address: z.string().optional(),
  openIn: z.number().optional(),
  likes: z
    .array(
      z.object({ id: z.string(), userId: z.string(), capsuleId: z.string() })
    )
    .optional()
    .default([]),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .default(`A time Capsule from ${new Date().toLocaleDateString()}`),
});
  // .refine(
  //   (data) => {
  //     console.log("ZOD:::: ", data);
  //     return false;
  //   },
  //   { message: "Phone field is required", path: ["phone"] }
  // );

export type Capsule = z.infer<typeof createCapsuleSchema>;
