import { ArrowDownToLineIcon, CheckCircle, Leaf } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
const parks = [
    {
      name: "Instant Devlivery",
      Icon: ArrowDownToLineIcon,
      description:
        "Saepe ut veritatis necessitatibus amet voluptates commodi ducimus. Eos quibusdam vitae maxime quas placeat!",
    },
    {
      name: "Guaranteed Quality",
      Icon: CheckCircle,
      description:
        "Every asset on our platform is verified by our team. Eos quibusdam vitae maxime quas placeat!",
    },
    {
      name: "For the Planet",
      Icon: Leaf,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora nisi sapiente laboriosam officia est aliquam, quaerat.",
    },
  ];

export default function Perks() {
  return (
    <MaxWidthWrapper className="py-20">
    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
      {parks.map((park) => (
        <div
          key={park.name}
          className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
        >
          <div className="md:flex-shrink-0 flex justify-center">
            <div className="h-16 w-16 flex justify-center items-center bg-blue-100 text-blue-900 rounded-full">
              {<park.Icon className="h-1/3 w-1/3" />}
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-200">
              {park.name}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {park.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </MaxWidthWrapper>
  )
}