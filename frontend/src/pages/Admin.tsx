import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getPendingApprovalRecipes,
  approveRecipe,
  rejectRecipe,
} from "../utils/RecipeAPIHandler";

export default function Admin() {
  interface Recipe {
    _id: string;
    title: string;
    ingredients: Array<{ ingredient: string; amount: string }>;
    instructions: string[];
    status: "pending" | "approved" | "rejected";
    rejectReason?: string;
    reapprovalMessage?: string;
    imageUrl: string;
    createdBy: string;
    createdAt: string;
  }

  return <div></div>;
}
