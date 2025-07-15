import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MovieArchiveFilterPillProps {
  label: string;
  value: string;
  handleRemove?: () => void;
}

const MovieArchiveFilterPill = ({
  label,
  value,
  handleRemove,
}: MovieArchiveFilterPillProps) => {
  return (
    <Badge className="bg-slate-200 hover:bg-slate-200 rounded-xl w-fit px-2 flex gap-1 items-center text-black">
      {/* label */}
      <p className="font-bold"> {label} </p>
      {/* //value */}
      <div className="flex flex-row min-w-fit">{value}</div>
      <Button
        variant="ghost"
        className="h-4 w-4 [&_svg]:size-3 px-0 hover:bg-slate-200"
        onClick={handleRemove}
      >
        <X />
      </Button>
    </Badge>
  );
};

export default MovieArchiveFilterPill;
