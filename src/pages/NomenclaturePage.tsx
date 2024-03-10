import { type UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
} from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { useInfiniteQuery } from '@tanstack/react-query';
import { API_URL } from '../config';

type UserApiResponse = {
  data: Nomenclature[];
  meta: {
    totalRowCount: number;
  };
};

type Nomenclature = {
  id: string;
  nmid: number;
  brand: string;
  color: string;
  title: string;
  vendorCode: string;
  category: string;
  createdAt: string;
  deletedAt: null | string;
  supplier: string;
  type: string;
};

const columns: MRT_ColumnDef<Nomenclature>[] = [
  {
    accessorKey: 'nmid',
    header: 'МП ID',
    enableClickToCopy: true,
  },
  // {
  //   accessorKey: 'vendorCode',
  //   header: 'Продавец',
  // },
  {
    accessorKey: 'vendorCode',
    header: 'Производитель',
    enableClickToCopy: true,
  },
  {
    accessorKey: 'title',
    header: 'Название',
  },
  {
    accessorKey: 'color',
    header: 'Цвет',
  },
  {
    accessorKey: 'category',
    header: 'Категория',
  },
  {
    accessorKey: 'brand',
    header: 'Бренд',
  },
  {
    accessorKey: 'supplier',
    header: 'Компания',
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
    enableColumnOrdering: false,
  },
];

const fetchSize = 25;

export default function NomenclaturePage() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>();
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [height, setHeight] = useState<number>(600);

  const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<UserApiResponse>({
    queryKey: ['table-data', columnFilters, globalFilter, sorting],
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${API_URL}/nm/list`);
      url.searchParams.set('start', `${(pageParam as number) * fetchSize}`);
      url.searchParams.set('size', `${fetchSize}`);
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      url.searchParams.set('globalFilter', globalFilter ?? '');
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      const response = await fetch(url.href);
      const json = (await response.json()) as UserApiResponse;
      return json;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
  });

  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < height - 200 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage();
        }
      }
    },
    [height, isFetching, totalFetched, totalDBRowCount, fetchNextPage]
  );

  // Поднимаемяс вверх при сортировке или фильтре
  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting, columnFilters, globalFilter]);

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    const tableContainer = document.querySelector('#table-container') as HTMLElement;
    const tablePaper = document.querySelector('#table-container .MuiPaper-root') as HTMLElement;
    const tableToolbar = tablePaper.firstElementChild as HTMLElement;
    if (tableContainer && tableToolbar) setHeight(tableContainer.offsetHeight - tableToolbar.offsetHeight);
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: flatData,
    enablePagination: false,
    enableRowNumbers: false,
    enableRowVirtualization: true,
    manualFiltering: true,
    manualSorting: true,
    muiTableContainerProps: {
      ref: tableContainerRef,
      sx: {
        maxHeight: height,
        '&::-webkit-scrollbar': {
          right: 0,
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#999',
          borderRadius: '8px',
          width: '6px',
          height: '6px',
        },
      },
      onScroll: (event: UIEvent<HTMLDivElement>) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    // renderBottomToolbarCustomActions: () => (
    //   <Typography>
    //     Fetched {totalFetched} of {totalDBRowCount} total rows.
    //   </Typography>
    // ),
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 4 },
    enableBottomToolbar: false,
    enableRowSelection: true,
    enableColumnPinning: true,
    enableColumnDragging: false,
    enableColumnOrdering: true,
    localization: MRT_Localization_RU,
  });

  return <MaterialReactTable table={table} />;
}
