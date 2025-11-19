import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardProps {
  title: string,
  description: string
}

export function TitleTextCard(props: CardProps) {
  return (
    <Card className="w-full max-w-sm m-2">
      <CardHeader>
        <CardTitle className="text-xl">{props.title}</CardTitle>
        <CardDescription>
          {props.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
