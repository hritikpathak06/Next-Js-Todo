import { Input } from "@/components/ui/input";
import React from "react";

const SearchForm = ({ searchText, inputText, setInputText }: any) => {
  return (
    <>
      <form onSubmit={searchText} className="mb-4">
        <Input
          type="text"
          name="search"
          value={inputText}
          placeholder="Search tasks"
          className="mr-2 lg:w-[60%] w-[100%]"
          onChange={(e: any) => {
            setInputText(e.target.value);
            searchText();
          }}
        />
      </form>
    </>
  );
};

export default SearchForm;
