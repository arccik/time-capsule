import z from "zod";

export const createCapsuleSchema = z
  .object({
    senderName: z.string().optional(),
    dateTime: z.date(),
    message: z.string(),
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
  })
  .refine((data) => {
    if (
      data.senderName &&
      data.sendingMethod?.some(
        (v) => v.name === "phone" || v.name === "email" || v.name === "sms"
      )
    ) {
      return data.phone !== undefined;
    }
  });

export type Capsule = z.infer<typeof createCapsuleSchema>;
