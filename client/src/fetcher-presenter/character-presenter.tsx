import { Card, CardHeader } from "@/components/ui/card";
import { Mars, Venus } from "lucide-react";

export default function CharacterPresenter({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) {
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="grid grid-cols-3 gap-3 p-4">
          {data.map((character) => {
            return (
              <Card
                key={character.id}
                className={`cursor-pointer ${
                  character.gender === "Male"
                    ? "border-blue-500 bg-blue-100"
                    : "border-pink-500 bg-pink-100"
                }`}>
                <CardHeader className="flex gap-3">
                  <div>
                    {character.gender == "Male" ? (
                      <div className="text-blue-500">
                        <Mars />
                      </div>
                    ) : (
                      <div className="text-pink-500">
                        <Venus />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <h3>{character.firstName}</h3>
                    <h3>{character.lastName}</h3>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </section>
      )}
    </>
  );
}
