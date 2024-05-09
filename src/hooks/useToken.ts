'use client';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createToken } from '@/queries/tokens';

export const useToken = () => {
	const [tokenLocalStorage, setTokenLocalStorage] = useLocalStorage<string | null>('token', null);

	const { data: token, isLoading } = useQuery({
		queryKey: ['token'],
		queryFn: createToken,
		enabled: !tokenLocalStorage,
	});

	useEffect(() => {
		// If a new token is fetched, update local storage
		if (token && !tokenLocalStorage) {
			setTokenLocalStorage(token.token);
		}
	}, [token, tokenLocalStorage, setTokenLocalStorage]);

	return { token: tokenLocalStorage || token?.token, loading: isLoading };
};
