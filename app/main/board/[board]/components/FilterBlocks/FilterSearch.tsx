import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import LowOpacityText from "@/components/core/LowOpacityText";
import { Input } from "@/components/ui/input";
import { useConfig } from "@/store/configStore";
import { ChangeEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useBoardContext from "@/hooks/useBoardContext";

const BoardSearch = () => {
  const { board } = useBoardContext();
  const {
    filters: { [board._id]: filterPerBoard },
    setSearch,
  } = useConfig();

  const { search = "" } = filterPerBoard || {};

  const [inp, setinp] = useState(search);
  const [isSearching, setIsSearching] = useState(!!search);

  const dbRef = useRef<any>();

  const handleOnchange = (e: ChangeEvent<HTMLInputElement> | string) => {
    const val = typeof e === "string" ? e : e.target.value;
    setinp(val);

    clearTimeout(dbRef.current);
    dbRef.current = setTimeout(() => {
      setSearch(val, board._id);
    }, 500);
  };

  return isSearching === true ? (
    <div className="search relative">
      <div className="absolute left-2 top-1/4">
        <Search size={18} />
      </div>
      <Input
        onBlur={(e) => {
          if (inp.length === 0) {
            setIsSearching(false);
          }
        }}
        ref={(e) => e?.focus()}
        value={inp}
        placeholder="Search"
        className={cn(
          "pl-8 pr-10 animate-fadeIn",
          "bg-transparent border-highlighter-dark border-2"
        )}
        onChange={handleOnchange}
      />
      {inp.length > 0 && (
        <Button
          variant={"ghost"}
          onClick={() => handleOnchange("")}
          className={cn("p-0 m-0", "absolute top-0 right-2")}
        >
          <X size={18} />
        </Button>
      )}
    </div>
  ) : (
    <Button
      variant={"ghost"}
      onClick={() => setIsSearching(true)}
      className={cn(
        "border-2 border-highlighter-dark",
        "rounded-sm",
        "gap-2 flex flex-row items-center"
      )}
    >
      <Search size={18} />
      <LowOpacityText>Search</LowOpacityText>
    </Button>
  );
};

export default BoardSearch;
