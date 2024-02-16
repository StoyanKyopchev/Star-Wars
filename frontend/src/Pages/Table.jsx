import { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import backgroundImg from "../Assets/Images/Star_Wars_Logo.png";

function Table() {
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTableData() {
    try {
      setError("");
      setLoading(true);

      const response = await fetch("https://swapi.dev/api/people");
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      setTableData(data.results);
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "404":
            setError("The data that you are looking for was not found");
            break;
          case "500":
            setError("An unexpected server error occurred");
            break;
          default:
            setError("An unexpected error occurred");
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col md:items-center md:gap-10">
      <div className="flex justify-center md:h-80">
        <img
          src={backgroundImg}
          alt="Background image of the star wars logo"
          className="2xl:w-2/3 lg:w-1/2 md:w-3/4 w-full"
        />
      </div>
      {error && (
        <div className="w-fit rounded p-2 text-white font-bold bg-red-500 text-center">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center">
          <ScaleLoader
            loading={loading}
            aria-label="Scale Loader Animation"
            color="yellow"
            height={100}
            width={8}
            margin={5}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="text-left text-sm text-yellow-300">
            <thead className="border-b font-medium dark:border-neutral-500 text-black bg-yellow-300">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Mass
                </th>
                <th scope="col" className="px-6 py-4">
                  Height
                </th>
                <th scope="col" className="px-6 py-4">
                  Hair Color
                </th>
                <th scope="col" className="px-6 py-4">
                  Skin Color
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((character) => {
                return (
                  <tr
                    key={character.height}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {character.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {character.mass} kg
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {character.height}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {character.hair_color}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {character.skin_color}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Table;
