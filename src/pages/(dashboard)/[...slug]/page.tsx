import { useParams } from 'react-router'

export function Component() {
    const { '*': slug } = useParams()
    return (
        <div>Dashboard {slug} </div>
    )
}