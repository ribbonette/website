<script lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { API } from '$lib/client/types';

	import { create_server_member_link, get_server_member_links } from '$lib/client/api/server';
	export let data;

	$: server_id = $page.params.server_id;

	let member_links: API.Server.MemberLink[] = [];
	onMount(async () => {
		member_links = await get_server_member_links(server_id);
	});

	let dialog_element: HTMLDialogElement;
	let new_display_name = '';
	let new_creating = false;
	const create_new = async () => {
		new_creating = true;
		const new_member_link = await create_server_member_link(server_id, new_display_name);
		console.log(new_member_link);
		if (!new_member_link.id)
			return;

		dialog_element.close();
		goto(`/dashboard/server/${server_id}/member_link/${new_member_link.id}`);

		new_creating = false;
	};
</script>

<div class="geist">
	<h1>{data.server?.name}</h1>
	<h1>Member Links</h1>
	<table>
		<thead>
			<tr>
				<th>display name</th>
				<td>connectors</td>
				<td>criteria items</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			{#each member_links as member_link}
				<tr>
					<th>{member_link.display_name}</th>
					<td>{member_link.connectors.items.length}</td>
					<td>{member_link.criteria.items.length}</td>
					<td>
						<a href={`/dashboard/server/${server_id}/member_link/${member_link.id}`}>
							edit
						</a>
						<button type="button">
							delete
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<button type="button" on:click={() => dialog_element.showModal()}>
		create new member link
	</button>
</div>

<dialog bind:this={dialog_element}>
	<label for="display_name">display name</label>
	<input id="display_name" type="text" bind:value={new_display_name}/>
	<div>
		<button type="button" disabled={new_creating || !new_display_name} on:click={create_new}>
			create
		</button>
		<form method="dialog">
			<button disabled={new_creating}>
				cancel
			</button>
		</form>
	</div>
</dialog>

<style lang="scss">
	a, button {
		all: unset;
		background: #fff;
		border: 1px solid #000;
		cursor: pointer;
		padding: 4px 8px;
		&:not(:disabled):hover {
			color: blue;
		}
		&:disabled {
			cursor: not-allowed;
			opacity: .5;
		}
	}
	dialog {
		div {
			display: flex;
			gap: 8px;
			margin-top: 16px;
		}
	}
	// temporary css i copied from mdn web docsl ol
	table {
		background: white;
	border-collapse: collapse;
	border: 2px solid rgb(140 140 140);
	font-family: sans-serif;
	font-size: 0.8rem;
	letter-spacing: 1px;
	margin-bottom: 64px;
	}

	thead {
	background-color: rgb(228 240 245);
	}

	th,
	td {
	border: 1px solid rgb(160 160 160);
	padding: 8px 10px;
	}

	td:last-of-type {
	text-align: center;
	}

	tbody > tr:nth-of-type(even) {
	background-color: rgb(237 238 242);
	}
</style>