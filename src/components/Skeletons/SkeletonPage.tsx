import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const SkeletonPage = () => {
  return (
    <>
      {
        // Navbar
      }
      <Skeleton className="w-full h-[92px] rounded bg-slate-300" />
      {/* searchbar */}
      <div className="py-4 w-full flex justify-center">
        <Input
          type="text"
          placeholder="Search..."
          className="h-14 border-[#ba8f9b] w-80"
          disabled
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
        <Skeleton className="w-full h-[500px] rounded bg-slate-200" />
        <Skeleton className="w-full h-[500px] rounded bg-slate-200" />
        <Skeleton className="w-full h-[500px] rounded bg-slate-200" />
        <Skeleton className="w-full h-[500px] rounded bg-slate-200" />
      </div>
    </>
  );
};
export default SkeletonPage;
