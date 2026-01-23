import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import Image from "next/image";
import { weServTransformURL } from "@/utils/weServTransform";

const PokemonPopout = ({
  children,
  pokemonName,
  regularImage,
  shinyImage,
}: {
  children: React.ReactNode;
  pokemonName: string;
  regularImage?: string;
  shinyImage?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="hover:cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogHeader className="hidden">
        <DialogTitle>{pokemonName}</DialogTitle>
        <DialogDescription>{pokemonName}</DialogDescription>
      </DialogHeader>
      <DialogContent className="max-w-xs sm:max-w-fit">
        <div className="flex flex-col justify-center">
          {/* Image */}
          {regularImage && (
            <Image
              src={
                regularImage
                  ? weServTransformURL(regularImage, "eventCardImage")
                  : "/QuestionMark.png"
              }
              width={300}
              height={300}
              alt={pokemonName}
              className="object-scale-down justify-center max-h-56 max-w-64"
            />
          )}
          {regularImage && shinyImage && (<hr className="my-4" />)}
          {/* Shiny Image */}
          {shinyImage && (
            <Image
              src={
                shinyImage
                  ? weServTransformURL(shinyImage, "eventCardImage")
                  : "/QuestionMark.png"
              }
              width={300}
              height={300}
              alt={pokemonName}
              className="object-scale-down justify-center max-h-56 max-w-64"
            />
          )}

          <h3 className="text-2xl sm:text-xl font-bold text-center mt-2">
            {pokemonName}
          </h3>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonPopout;
