<script lang="ts">
	export let data;

	$: session = data.session;
</script>

<header>
	<h1>ribbon</h1>
	<p>web design is my passion</p>
	<button class="server_selector" type="button">
		{data.server?.name}
	</button>
	{#if session}
		<button class="user" type="button">
			User
		</button>
	{/if}
</header>

<slot/>

<style lang="scss">
	header {
		align-items: center;
		background: hsl(315 60% 80%);
		border-radius: 16px;
		box-shadow: 0 4px 16px 0 #00000040;
		color: #fff;
		display: flex;
		height: 64px;
		margin: 16px auto;
		max-width: 1200px;
		padding: 16px;
		h1 {
			margin: 0 16px 0 8px;
		}
		.server_selector {
			margin-left: 16px;
		}
		.user {
			margin-left: auto;
		}
	}
</style>