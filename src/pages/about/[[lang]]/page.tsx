import { useParams } from 'react-router'

export function Component() {
    const { lang } = useParams()
    return (
        <div>About {lang}</div>
    )
}