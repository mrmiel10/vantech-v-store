import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import { defineBoards } from "../../../index";
import * as z from "zod";
import prisma from "../../../db";
import { InsertBoard } from "../../../index";
import { AddBoards } from "../../../index";
type Data = {
  boardInsert: defineBoards;
};
const boardFormSchema = z.object({
  title: z
    .string({ required_error: "veuiler referencier le board" })
    .min(5, { message: "minimum 5 caractèes" })
    .max(255, { message: "vous ave dpasser les 50 caractères" }),
});
const boardFormSchemas = z.object({
  id: z.string(),
  title: z
    .string({ required_error: "veuiler referencier le board" })
    .min(5, { message: "minimum 5 caractèes" })
    .max(255, { message: "vous ave dpasser les 50 caractères" }),
  createdAt: z.date(),
});
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  //queries  prisma

  const body = boardFormSchema.parse(JSON.parse(req.body));
  const boardInsert = boardFormSchemas.parse(await InsertBoard(body));

  res.status(201).json({ boardInsert });
};

export default handler;
