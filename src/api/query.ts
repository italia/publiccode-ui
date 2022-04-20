interface QueryProps {
  type?: string;
  searchValue: string;
  filters: string[];
  sortBy: string;
  from: number;
  size: number;
}
export const querySoftware = async ({
  type,
  searchValue,
  filters,
  sortBy,
  from,
  size,
}: QueryProps) => {};

export const queryAllSite = async ({
  searchValue,
  filters,
  sortBy,
  from,
  size,
}: QueryProps) => {};

export const queryAdministration = async ({
  searchValue,
  filters,
  sortBy,
  from,
  size,
}: QueryProps) => {};

export const queryPlatform = async ({
  searchValue,
  filters,
  sortBy,
  from,
  size,
}: QueryProps) => {};

export const queryApi = async ({
  searchValue,
  filters,
  sortBy,
  from,
  size,
}: QueryProps) => {};
