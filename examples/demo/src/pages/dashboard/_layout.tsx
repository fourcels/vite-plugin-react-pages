import { Outlet } from 'react-router';

export function Component() {
    return (
        <div>
            <div>Dashboard</div>
            <Outlet />
        </div>
    )
}
