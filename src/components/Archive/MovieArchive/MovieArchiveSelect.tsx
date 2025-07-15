import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MovieArchiveSelectProps {
  onValueChange: (value: string) => void;
  placeholder: string;
  itemSelectionArray: { label: string; value: string }[];
}

const MovieArchiveSelect = ({
  onValueChange,
  placeholder,
  itemSelectionArray,
}: MovieArchiveSelectProps) => {
  // TODO maybe add border coloring
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {itemSelectionArray.map(({ label, value }) => (
            <SelectItem key={label} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default MovieArchiveSelect;
