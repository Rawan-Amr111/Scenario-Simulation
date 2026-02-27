import CompareClient from "../../components/CompareClient";

type Props = {
  searchParams: Promise<{ ids?: string }>;
};

const ComparePage = async ({ searchParams }: Props) => {
  const { ids } = await searchParams;

  const idsArray = ids ? ids.split(",") : [];

  return <CompareClient ids={idsArray} />;
};

export default ComparePage;
