import { Outlet } from 'react-router';

export function Component() {
    return (
        <div>
            <div>Dashboard Layout</div>
            <Outlet />
        </div>
    )
}
