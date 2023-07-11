import { Outlet, isRouteErrorResponse, useRouteError } from 'react-router';


export function ErrorBoundary() {
    const error = useRouteError() as Error;

    return isRouteErrorResponse(error) ? (
        <h1>
            {error.status} {error.statusText}
        </h1>
    ) : (
        <h1>{error.message}</h1>
    );
}