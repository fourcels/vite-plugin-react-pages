import { useParams } from 'react-router'

export function Component() {
    const { id } = useParams()
    return (
        <div>Post {id}</div>
    )
}