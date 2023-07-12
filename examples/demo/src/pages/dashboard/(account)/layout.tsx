import { Outlet } from 'react-router';

export function Component() {
    return (
        <div>
            <div>group Layout</div>
            <Outlet />
        </div>
    )
}
