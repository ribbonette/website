import { redirect } from '@sveltejs/kit';
import { BACKEND_URL_URI_ENCODED } from '$lib/shared/constants';
export function GET({ params: { request_id }}) {
	return redirect(302, `https://apis.roblox.com/oauth/v1/authorize?client_id=4271638591494552131&redirect_uri=${BACKEND_URL_URI_ENCODED}%2Fv1%2Froblox_callback&scope=openid%20profile&response_type=code&state=r_${request_id}`);
}