import mongoose, { Schema, model, Types } from "mongoose";
import { z } from "zod";

export const zPassword = z
  .object({
    service_name: z.string(),
    url: z.optional(z.string()),
    password: z.string(),
    notes: z.optional(z.string()),
    tags: z.enum(["work", "personal"]),
    user_id: z.string(),
  })
  .strict();

export interface IPassword {
  _id: string;
  service_name: string;
  url?: string;
  password: string; //the main thing
  notes?: string;
  tags: "work" | "personal";
  user_id: Types.ObjectId;
}

const passwordSchema = new Schema<IPassword>({
  service_name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    enum: ["work", "personal"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Password =
  mongoose.models?.Password || model<IPassword>("Password", passwordSchema);
