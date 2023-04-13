/* Data Loading
Because URL segments usually map to your app's persistent data, 
React Router provides conventional data loading hooks to initiate data loading during a navigation. 
Combined with nested routes, all of the data for multiple layouts at a specific URL
 can be loaded in parallel. */

< Route
    path="/"
    loader={async ({ request }) => {
        // loaders can be async functions
        const res = await fetch("/api/user.json", {
            signal: request.signal,
        });
        const user = await res.json();
        return user;
    }}
    element={< Root />}
>
    <Route
        path=":teamId"
        // loaders understand Fetch Responses and will automatically
        // unwrap the res.json(), so you can simply return a fetch
        loader={({ params }) => {
            return fetch(`/api/teams/${params.teamId}`);
        }}
        element={<Team />}
    >
        <Route
            path=":gameId"
            loader={({ params }) => {
                // of course you can use any data store
                return fakeSdk.getTeam(params.gameId);
            }}
            element={<Game />}
        />
    </Route>
</Route >