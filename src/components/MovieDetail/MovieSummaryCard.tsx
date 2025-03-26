import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface MovieSummaryCardProps {
  description: string;
}

const MovieSummaryCard = ({ description }: MovieSummaryCardProps) => {
  return (
    <Card className="bg-secondary text-white">
      <CardHeader>
        <CardTitle className="text-left">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row">{description}</div>
      </CardContent>
    </Card>
  );
};
export default MovieSummaryCard;
