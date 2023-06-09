import { z } from "zod";

export const createCapsuleSchema = z
  .object({
    senderName: z.string().optional(),
    dateTime: z.date(),
    message: z.string().min(5, "Message must be at least 5 characters"),
    recipientName: z.string().optional(),
    sendingMethod: z
      .array(z.object({ id: z.string(), name: z.string() }))
      .optional(),
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
  })
  .refine(
    (data) => {
      console.log("ZOD:::: ", data);
      if (!data?.call) return { message: "Call >>><<< required " };
      if (data.sendingMethod?.some((v) => v.name === "email")) {
        return data.email !== undefined;
      }
      if (data.sendingMethod?.some((v) => v.name === "sms")) {
        return data.sms !== undefined;
      }
      if (data.sendingMethod?.some((v) => v.name === "whatsapp")) {
        return data.whatsapp !== undefined;
      }
      return true;
    },
    { message: "Phone field is required" }
  );

export type Capsule = z.infer<typeof createCapsuleSchema>;
