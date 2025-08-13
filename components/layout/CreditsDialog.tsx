"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

function CreditsDialog() {
  const { dictionary } = useLanguage();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          {dictionary["Credits 💖"]}
        </DialogTitle>
        <DialogDescription className="py-2">
          {dictionary.creditsDescription}
        </DialogDescription>
      </DialogHeader>

      <DialogClose className="ml-auto" asChild>
        <Button>{dictionary["Cheers to them!"]}</Button>
      </DialogClose>
    </DialogContent>
  );
}

export default CreditsDialog;
