import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useTransaction } from "wagmi";
import { useEffect } from "react";

interface Props {
  tx: `0x${string}`;
}
export function Success({ tx }: Props) {
  const { data, isError, isLoading } = useTransaction({
    hash: "0x3d18584c07934717616ca071027cd24be928bb345f01280f5201e375f3527a62",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data, isError, isLoading]);

  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">Success</p>
        </div>

        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            {isLoading && <div>Fetching transaction…</div>}
            {isError && <div>Failed to fetch transaction</div>}

            {/* {data && <div>Transaction: {data}</div>} */}
            <a
              target="_blank"
              href={`https://goerli-optimism.etherscan.io/tx/${tx}`}
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
            >
              <span className="sr-only">View</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
