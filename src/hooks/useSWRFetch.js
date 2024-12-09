import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useSWRFetch = (url) => {
    const { data, error, isLoading } = useSWR(url, fetcher);

    return { data, error, isLoading };
};

export default useSWRFetch;