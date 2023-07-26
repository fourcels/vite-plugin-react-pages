import { Outlet } from 'react-router';

export function Component() {
    return (
        <>
            <div>Root Layout</div>
            <Outlet />
        </>
    )
}