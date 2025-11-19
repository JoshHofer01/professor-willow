import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
}

export function CardWithButton(props: CardProps) {
  return (
    <Card className="w-full max-w-sm m-2">
      <CardHeader>
        <CardTitle className="text-xl">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button variant="default" className="w-40 float-right">
          {props.buttonText}
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
