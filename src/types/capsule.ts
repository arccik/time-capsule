import { z } from "zod";


export const createCapsuleSchema = z
  .object({
    dateTime: z
      .date()
      .min(
        new Date(new Date().setMonth(new Date().getMonth() + 5)),
        "Date must be in the future"
      )
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() + 11)),
        "Date cannot be more then 10 years"
      ),
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
    image: z.string().optional(),
    voiceMessage: z.string().optional(),
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
      const path = ["sms", "email", "call", "whatsapp"];
      if (path.some((p) => data.sendingMethod.includes(p))) {
        return true;
      }
    },
    { message: "Required", path: ["sms", "email", "call", "whatsapp"] }
  );

export type Capsule = z.infer<typeof createCapsuleSchema>;
