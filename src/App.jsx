import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
{
  /* <IoIosSearch /> */
}
function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputResult, setInputResult] = useState([]);

  const getData = async () => {
    const res = await fetch(`https://api.nationalize.io/?name=${inputValue}`);
    const data = await res.json();

    const countryIds = data.country.map((el) => el.country_id).join(",");
    const result = await getCountryName(countryIds);
    setInputResult(result);
  };

  const getCountryName = async (idString) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${idString}`
    );
    const resJs = await res.json();

    const total = resJs.map((el) => {
      return { id: el.cca2, flag: el.flag, name: el.name.common };
    });
    return total;
  };

  return (
    <div className="bg-[#F5F5F4] py-20 flex  flex-col  gap-10  items-center h-[100vh]">
      <div className="flex justify-center items-center max-w-[500px]">
        <h1 className="font-bold text-4xl font-mono text-center leading-tight">
          Predict the Ethnicity of a Name
        </h1>
      </div>
      <div className="flex gap-4 ">
        <input
          placeholder="enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-80 shadow-2xl py-4 px-4 border-none outline-none"
        ></input>
        <button
          onClick={getData}
          className="bg-emerald-500 py-4 px-4 rounded-md shadow-2xl"
        >
          {<IoIosSearch />}
        </button>
      </div>
      {inputResult.map((el, index) => {
        return (
          <div key={index}>
            {el.id} : {el.flag} : {el.name}
          </div>
        );
      })}
    </div>
  );
}

export default App;
