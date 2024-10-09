import { browser } from '$app/environment';

import { get_server } from '$lib/client/api/server';
export async function load({ params: { server_id }}) {
	return {
		server: browser ? await get_server(server_id) : null
	};
}